import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoCells from './TodoCells'
import {fetchTodos, addNewTodo, deleteTodo} from './axiosRequests/todos'
import {logoutUser} from '../../actions/authActionCreators'
import {isTokenExpired} from '../../utils/validateToken';

  //1) For a better client side performance we set the state twice, before and after
  //   sending actions to DB to get rid of the DB delay between request and response 
  //2) State db todos takes this form [ [todo1_text, todo1_index], [todo2_text, todo2_index]... ] 

class MyTodos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text:"",
      todos : []
    }
    this.onChange                             = this.onChange.bind(this)
    this.onDeleteSubmit                       = this.onDeleteSubmit.bind(this)
    this.onAddSubmit                          = this.onAddSubmit.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onAddSubmit(e){
    e.preventDefault();
    if (this.state.text) {
      // Temporarily set todos state with text only (no id)
      const unValTodo = { text: this.state.text }
      const InputFieldTodo  = [ this.state.text]
      this.setState({ text:"", todos: [...this.state.todos, InputFieldTodo] })
      
      addNewTodo(unValTodo)
        .then( DbValidTodo => 
          {// Find the unval todo index by text
            let allTodos = this.state.todos
            const index = allTodos.findIndex( text => text == DbValidTodo[0] )
            // Replace it then Set state with validated one
            allTodos[index] = DbValidTodo
            this.setState({ todos: [...allTodos] })
          }
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
    deleteTodo(id)
      .then(this.setState( {todos: todos } ))    
  }

  componentWillMount(){
    // Fetch user's todos then set State
    if(this.props.auth.isAuthen && !isTokenExpired(this.props.auth.tokenData)){
      fetchTodos()
        .then( todos => this.setState({ todos: todos }))
    } else {
      this.props.logoutUser()
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.auth.isAuthen){
      this.props.history.push('/')
    }
  }
  
  componentWillUpdate(){
    if (isTokenExpired(this.props.auth.tokenData)){
      this.props.logoutUser()
      this.props.history.push('/')
    }
  }

  render() {
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
              <TodoCells 
                todos={this.state.todos} 
                onDeleteSubmit={this.onDeleteSubmit}
              />
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{logoutUser})(MyTodos);