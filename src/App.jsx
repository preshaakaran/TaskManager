import React, { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";

import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished,setshowFinished] = useState(true)

  useEffect(() =>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    } 
    

  },[])


  const save =(params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }
  

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
      setTodo("");
    }
    save();
  };

  const handleEdit = (id) => {
    let index=todos.findIndex(item=>{
      return item.id===id;
    })

    const todoToEdit = todos[index];

    setTodo(todoToEdit.todo);
    
    
    setTodos(todos.filter(item => item.id !== id));
    save();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
    save();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSave = (e) => {
    save();
  };

  const handleCheckbox = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
    save();
  };

  console.log("todos:", todos); 

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-2 w-full flex justify-center">
        <div className="bg-slate-200 my-1 mx-4 rounded-xl p-5 min-h-[80vh] max-md:w-11/12 md:w-9/12 flex flex-col">
          <div className="add">
            <h2 className="text-lg font-bold">Add a Task</h2>
            <div className="dusra justify-between">
            <input 
              onChange={handleChange} 
              value={todo} 
              className='border-2 border-black rounded-lg px-4 py-1 w-4/6' 
              type="text" 
            />
            <button 
              onClick={handleAdd} 
              className='bg-black text-white rounded-lg px-4 py-1.5 mx-4'
            >
              Add
            </button>
            </div>
          </div>
          <div className="thisra">
          <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[98%] mx-auto my-2'></div>
          </div>
          <h1 className='text-lg font-bold my-4'>Tasks- Manage your tasks at one place</h1>
          <div className="todos">
            {todos.length===0 && <div className='my-5'> Enter a Task  </div>}
            {Array.isArray(todos) && todos.map(item => {
              if (showFinished || !item.isCompleted) {
                return (
              <div key={item.id} className="todo flex m-4 justify-between">
                <div className="flex gap-5 ">
                  
                <input 
                  onChange={() => handleCheckbox(item.id)} 
                  type="checkbox" 
                  checked={item.isCompleted} 
                />
                <div className="py-1">
                  <span className={'${item.isCompleted ? "line-through" : ""} max-w-[60%] break-all'}>
                    <div className="flex w-full">
                    {item.todo}
                    </div>
                  </span>
                </div>
                </div>
                <div className="buttons flex h-full">
                <button 
                  onClick={() => handleEdit(item.id)} 
                  className='bg-black text-white rounded-lg px-4 py-1.5 mx-4'
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className='bg-black text-white rounded-lg px-4 py-1.5 mx-1'
                >
                  <AiFillDelete />
                </button>
                </div>
              </div>
            );
          }
          return null;
        })}
          </div>
          <div onClick={() => handleSave()} className="save bg-black text-white rounded-lg px-2 py-2 mx-4 w-11/12 text-center ">Save Changes</div>
        </div>
      </div>
      
    </>
  );
}

export default App;

