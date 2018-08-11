import React, { Component } from 'react';
import {fetchTodos, addNewTodo, deleteTodo} from "./todoActions"

  //1) For a better client side performance we set the state twice, before and after
  //   sending actions to DB to get rid of the DB delay between request and response 
  //2) State todos takes this form [ [todo1_text, todo1_index], [todo2_text, todo2_index]... ] 

class MyTodos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthen: this.props.isAuthen, // passed from the app level state
      text:"",
      todos : []
    }
    this.onChange                             = this.onChange.bind(this)
    this.onDeleteSubmit                       = this.onDeleteSubmit.bind(this)
    this.onAddSubmit                          = this.onAddSubmit.bind(this)
    this.setStateWithTodosFromInputField      = this.setStateWithTodosFromInputField.bind(this)
    this.replaceStateUnValidatedTodoWithDbOne = this.replaceStateUnValidatedTodoWithDbOne.bind(this)
  }

  replaceStateUnValidatedTodoWithDbOne(DbTodo){
    // Find the unval todo by text then remove it
    let allTodos = this.state.todos
    allTodos.splice(
      allTodos.findIndex(
        text => text == DbTodo[0]
      ), 1
    )
    // Set state with the validated one
    this.setState({ 
      todos: [...allTodos, DbTodo] 
    })
  }

  setStateWithTodosFromInputField(){
    const InputFieldTodo  = [ this.state.text]
    this.setState({ 
      text:"",
      todos: [...this.state.todos, InputFieldTodo] 
    })
  }
  
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onAddSubmit(e){
    e.preventDefault();
    // If text field is not empty
    if(this.state.text){
      const unValTodo = { text: this.state.text }
      this.setStateWithTodosFromInputField()
        addNewTodo(unValTodo)
        .then( TodoFromDb => this.replaceStateUnValidatedTodoWithDbOne(TodoFromDb)
        )
    }
  }

  onDeleteSubmit(e){
    e.preventDefault();
    // Extract todo index and id from button value
    const todo  = e.target.value.split(",")
    const index = todo[0]
    const id    = todo[1]
    const todos = this.state.todos
    // New todos array without the todo we removed
    todos.splice(index,1)
    deleteTodo(id).then(
      this.setState( {todos: todos } )
    )    
  }
  
  componentWillMount(){
    // Fetch user's todos then set State if valid
    this.props.isAuthen && !this.props.isTokenExpired() ?
      fetchTodos()
        .then( todos => 
          this.setState({ todos: todos })
      ):this.props.logoutUser()
  }

  componentWillUpdate(){
    if (this.props.isTokenExpired()){
      this.props.logoutUser()
    }
  }

  render() {
    console.log(this.state.todos)
    const renderTodoCells = (
      this.state.todos.map((todo, index)=>{
        let todoText = todo[0]
        let todoId   = todo[1]
        return (
          <tr key={ Math.ceil(Math.random()*10000000) } >
            <td> 
              { index + 1 } 
            </td>
            <td> 
              { todoText } 
            </td>
            <td>
              <button type="button" value={index + "," + todoId}  className="btn btn-danger" onClick={this.onDeleteSubmit} style={{fontSize:"12px",padding:"0" ,height:"20px", width:"20px"}}>
                &#x2718; 
              </button> 
            </td>
          </tr>
        )
      })
    )
  
    return (
      <div>
        <form onSubmit={this.onAddSubmit} >
          <table className="table table-hover">
            <thead>
              <tr className="bg-light">
                <th> # </th>
                <th> Todo </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.props.isAuthen ? renderTodoCells:<h1>sdfsdf</h1>}
              <tr className="bg-info" >
                <td></td>
                <td >
                  <input 
                    type="text" 
                    name="text" 
                    onChange={this.onChange} 
                    value={this.state.text} 
                    className="form-control border-0 text-center " 
                    placeholder="New Todo"
                  />
                </td>
                <td>
                  <button type="submit" className="btn btn-success">Add Todo</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default MyTodos