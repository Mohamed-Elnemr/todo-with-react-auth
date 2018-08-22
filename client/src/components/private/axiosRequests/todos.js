import axios from "axios"

export const fetchTodos = ()=>{
  return axios
    .get("/api/todos/")
    .then( (res)=>{
        const todos = res.data.map(
          (todo) => [todo.text, todo._id]
        )
        return todos
    })
    .catch( err => console.log(err))
}

export const addNewTodo = (newTodo)=>{
  return axios
    .post("/api/todos/", newTodo)
    .then( (res)=>{
      const todo = [res.data.text, res.data._id]
      return todo
    })
    .catch( err => console.log(err.response.data) )
}

export const deleteTodo = (id)=>{
  return axios
    .delete("/api/todos/" + id).then(
    )
    .catch( err => console.log(err.response.data) )
}