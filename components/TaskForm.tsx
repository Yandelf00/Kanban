"use client"
import React, {useState} from 'react'
import { Tasks } from '.';


export default function TaskForm() {
    const [subTasks, setSubTasks] = useState({num : 2, tasks : [{id : 1}, {id : 2}]})
    function addSubtasks(){
        const newId = subTasks.num + 1;
        setSubTasks((prevSubTasks) => {
            return{
                num : newId,
                tasks: [...prevSubTasks.tasks, { id: newId }],
            } 
        })
    }
    function deleteSubtasks(id : number){
        const updatedSubtasks = subTasks.tasks.filter((subtask)=>subtask.id !== id)
        setSubTasks((prevSubTasks)=>{
            return{
                num : prevSubTasks.num,
                tasks : updatedSubtasks
            }
        })
    }
    return (
        <div className='h-[90%] w-[90%] flex flex-col'>
            <h1 className='font-bold text-[1.2rem]'>Add New Task</h1>
            <div className='mt-5 flex flex-col'>
                <label htmlFor="taskName" className="mb-2 text-black dark:text-white">
                    Title
                </label>
                <input
                type="text"
                id="taskName"
                placeholder="e.g. Take coffee break"
                className=" p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="longTextInput" className="mb-2 text-black dark:text-white">
                    Description
                </label>
                <textarea className='border dark:border-none border-black' 
                id="longTextInput" 
                name="longInput" style={{ width: '100%', height: '100px' }}></textarea>
                <label>
                    Subtasks
                </label>
                <div className='flex flex-col'>
                    {subTasks.tasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center">
                        <input
                          type="text"
                          placeholder=''
                          className="p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => deleteSubtasks(subtask.id)}
                          className="ml-2 p-2 bg-red-500 text-white rounded-md cursor-pointer"
                        >
                          X
                        </button>
                      </div>
                    ))}
                </div>
                <button onClick={addSubtasks}>add</button>
                


            </div>
        </div>
  )
}
