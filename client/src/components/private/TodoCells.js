import React from 'react';

const TodoCells = (props) =>
  props.todos.map( (todo, index) =>{
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
          <button type="button" value={index + "," + todoId}  className="btn btn-danger" onClick={props.onDeleteSubmit} style={{fontSize:"12px",padding:"0" ,height:"20px", width:"20px"}}>
            &#x2718; 
          </button> 
        </td>
      </tr>
    )
  })

export default TodoCells