import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";



function App(){
  
    const [input,setInput]=useState("");
    const [tasks, setTasks]=useState(()=>{
        const savedTasks = localStorage.getItem("tasks");
        
            return savedTasks ? JSON.parse(savedTasks): [];
        
    });
    const [editId, setEditId]=useState(null);

    //storing to the local storage
    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]);
    
    

      //Add task function
      function handleAddtask(){
        if(input.trim()==="")return;
       setTasks([...tasks,
        {
            text:input,
            completed:false
        },
       ]);
       setInput("");
    }

    //Edit task
    const handleEditTask = (index) =>{
       setEditId(index);
        
    };

    //Delete task function
    function handleDeletetask(index){
        setTasks(tasks.filter((task,taskIndex)=>taskIndex !== index));
    }

    //handle toggle function
    function handleToggleTask(index){
        const updatedTasks = tasks.map((task, taskIndex)=>{
          if(taskIndex===index){
            return {
                ...task,
                completed:!task.completed
            };
          }else{
            return task;
          }
        });
        setTasks(updatedTasks);
    }


    return(
        
        <>
        <div className="min-h-screen flex justify-center items-center bg-zinc-900">
        <div className="w-full max-w-[600px] h-150 bg-zinc-800 text-white p-10 rounded-xl flex flex-col  items-center">
        <h1 className="text-3xl font-bold mb-4">My Todo List</h1>

        <input value={input} onChange={(e)=>setInput(e.target.value)} className="border p-2 rounded-md mb-8 w-full" type="text" placeholder="Enter task" /><br />
        

        <button onClick={handleAddtask} className="w-full h-10 rounded-xl bg-green-500 text-white... mb-5 hover:bg-green-600 font-bold">Add task</button>

        <ol  className="w-full mt-4 px-2">
            {tasks.map((task,index)=>(
                <li key={index} className="flex justify-between items-center  w-full mb-2 gap-2">
               <div className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={task.completed}
    onChange={() => handleToggleTask(index)}
    className="w-5 h-5 accent-green-1000 cursor-pointer"
  />

  {editId === index ? (
    <input
      value={task.text}
      onChange={(e) => {
        setTasks(
          tasks.map((t, i) =>
            i === index
              ? { ...t, text: e.target.value }
              : t
          )
        );
      }}
      // className="bg-zinc-800 border border-gray-500 rounded px-2 py-1"
    />
  ) : (
    <span
      className={
        task.completed
          ? "line-through text-gray-400 opacity-50"
          : ""
      }
    >
      {task.text}
    </span>
  )}
</div>
                  
                <div className="flex gap-3">
                <button onClick={()=>handleEditTask(index)}className="text-yellow-400 hover:text-yellow-300">
                    <FaEdit className="text-lg"/>
                </button>
                <button onClick={()=>handleDeletetask(index)} className="text-red-500 hover:text-red-700">
                    <FaTrash/>
                </button>
                </div>
                </li>
            ))}
        </ol>
        </div>
        </div>
        </>

    );
}
export default App;