import { Paper, TextField, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import firebase from 'firebase/compat/app';


import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import UpgradeOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';

function App() {


  async function getTodos(db) {
    const todosSnapshot = await getDocs(db);
    const todosList = todosSnapshot.docs.map(doc => {return {...doc.data(), key: doc.id }});
    console.log(todosList);
    setTodos(todosList);
    return todosList;
  }
  useEffect(()=>{
    getTodos(dbRef);
  },[]);

  const dbRef = collection(db, "TodoApp");
  const [ todos, setTodos ] = useState([]);
  const [ text, setText ] = useState('');
  
  const today = new Date();
  const dateTime = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;
  
  const Add = ()=>{
    const newTodo = {
      TODO: text,
      TIME: dateTime,
      SERVERTIMESTAMP: serverTimestamp()
    };
   
    addDoc(dbRef, newTodo)
      .then(docRef => {
          console.log("Document has been added successfully");
          setTodos([...todos, newTodo]);
          setText('');
      })
      .catch(error => {
          console.log(error);
      })
  }

  const Update = (index)=>{
    const newTodos = [...todos];
    const newTodo = prompt('Enter new TODO');
    const updatedTodo = {
      TODO: newTodo,
      TIME: dateTime,
      SERVERTIMESTAMP: serverTimestamp()
    };
    setDoc(doc(db, "TodoApp",newTodos[index]['key']),updatedTodo).then((data)=>{
      newTodos[index] = updatedTodo;
      setTodos(newTodos);
      setText('');
    })
  }

  const Delete =(index)=>{
    const newTodos = [...todos];
    deleteDoc(doc(db, "TodoApp",newTodos[index]['key']))
    .then((e)=>{
      newTodos.splice(index,1);
      setTodos(newTodos);
    })
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
          value={text} onChange={(e)=>setText(e.target.value)}
          inputProps={{maxLength:55}}
          ></TextField>  <br></br>
          <Button type="submit" variant="contained" color="primary" disabled={!text} onClick={Add}  endIcon={<AddOutlinedIcon></AddOutlinedIcon>}>ADD </Button>
          <Button type="submit" variant="contained" color="primary" onClick={DeleteAll} endIcon={<DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>}>DELETE ALL</Button>
        </Paper>  <br></br>
      </form>
      {todos.map((todo,i)=>(
        <Paper elevation={4} className="Todos__Rendering" key={i}>
          <p>{i+1}. {todo.TODO}</p>
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={()=>Update(i)} endIcon={<UpgradeOutlinedIcon></UpgradeOutlinedIcon>}>UPDATE</Button>
            <Button type="submit" variant="contained" color="primary" onClick={()=>Delete(i)} endIcon={<RemoveCircleOutlineOutlinedIcon></RemoveCircleOutlineOutlinedIcon>}>DELETE</Button>
          </div>
          <span>{todo.TIME}</span>
        </Paper>
      ))}
    </div>
  );
}

export default App;
