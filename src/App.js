import { Paper, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import './App.css';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import UpgradeOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

function App() {

  const [ todos, setTodos ] = useState(['Todo App with Firebase','Todo App with Firebase 2']);
  const [ text, setText ] = useState('');

  const Add = ()=>{
    setTodos([...todos, text]);
    setText('');
  }

  const Update = (index)=>{
    const newTodos = [...todos];
    const newTodo = prompt('Enter new TODO');
    newTodos[index]= newTodo;
    setTodos(newTodos);
    setText('');
  }

  const Delete =(index)=>{
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }
  
  const DeleteAll = ()=>{
    setTodos([]);
  }

  return (
    <div>
      <h1 className='Todo__Header'>TODO APP</h1>

      <form onSubmit={(e)=>e.preventDefault()}>
        <Paper elevation={5} className="Add__Todo">
          <TextField className="Text__Field" label="Enter Todos" 
          value={text} onChange={(e)=>setText(e.target.value)}></TextField>  <br></br>
          <Button type="submit" variant="contained" color="primary" onClick={Add}  endIcon={<AddOutlinedIcon></AddOutlinedIcon>}>ADD </Button>
          <Button type="submit" variant="contained" color="primary" onClick={DeleteAll} endIcon={<DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>}>DELETE ALL</Button>
        </Paper>  <br></br>
      </form>
      {todos.map((todo,i)=>(
        <Paper elevation={4} className="Todos__Rendering" key={i}>
          <p>{i+1}. {todo}</p>
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={()=>Update(i)} endIcon={<UpgradeOutlinedIcon></UpgradeOutlinedIcon>}>UPDATE</Button>
            <Button type="submit" variant="contained" color="primary" onClick={()=>Delete(i)} endIcon={<RemoveCircleOutlineOutlinedIcon></RemoveCircleOutlineOutlinedIcon>}>DELETE</Button>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default App;
