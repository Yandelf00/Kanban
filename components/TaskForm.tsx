"use client"
import React, {useState, useRef} from 'react'
import { Tasks } from '.';
import { useSelector } from 'react-redux';
import { boardType, columnType } from '@/store';
import { title } from 'process';


export default function TaskForm() {
    const [subTasks, setSubTasks] = useState({num : 2, tasks : [{id : 1}, {id : 2}]})
    const boards = useSelector((state:any)=>state.boards.boards)
    const activeBoard = boards.find((board : boardType)=>board.isActive === true)
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const subtaskRefs = useRef<Array<HTMLInputElement|null>>([]);
    const selectRef = useRef<HTMLSelectElement>(null);

    // if (subtaskRefs.current.length !== subTasks.num) {
    //     subtaskRefs.current = Array(subTasks.num).fill(null).map((_, index) => subtaskRefs.current[index] || null);
    // }
    function addSubtasks(){
        const newId = subTasks.num + 1;
        setSubTasks((prevSubTasks) => {
            return{
                num : newId,
                tasks: [...prevSubTasks.tasks, { id: newId }],
            } 
        })
        // subtaskRefs.current.push(null);
    }
    function deleteSubtasks(id : number){
        const updatedSubtasks = subTasks.tasks.filter((subtask)=>subtask.id !== id)
        setSubTasks((prevSubTasks)=>{
            return{
                num : prevSubTasks.num,
                tasks : updatedSubtasks
            }
        })
        // subtaskRefs.current.pop();
    }
    function Essai() {
        const liste:string[] = []
        subtaskRefs.current.forEach((subtaskRef) => {
            subtaskRef ? liste.push(subtaskRef?.value) : '';
        });
        console.log(liste)
    } 
    return (
        <div className='h-[90%] w-[90%] flex flex-col'>
            <h1 className='font-bold text-[1.2rem]'>Add New Task</h1>
            <div className='mt-5 flex flex-col'>
                <label htmlFor="taskName" className="mb-2 text-black dark:text-white">
                    Title
                </label>
                <input
                ref = {title}
                type="text"
                id="taskName"
                placeholder="e.g. Take coffee break"
                className=" p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="longTextInput" className="mb-2 text-black dark:text-white">
                    Description
                </label>
                <textarea ref={description} className='border dark:border-none border-black' 
                id="longTextInput" 
                name="longInput" style={{ width: '100%', height: '100px' }}></textarea>
                <label>
                    Subtasks
                </label>
                <div className='flex flex-col'>
                    {subTasks.tasks.map((subtask, index) => (
                        <div key={subtask.id} className="flex items-center">
                        <input
                          type="text"
                          placeholder=''
                          className="p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
                          ref={(inputRef) => (subtaskRefs.current[index] = inputRef)}
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

                <label htmlFor="mySelect">Status</label>
                <select ref={selectRef} id="mySelect" name="select">
                    {activeBoard.columns.map((column:columnType)=>(
                        <option value={column.name}>{column.name}</option>
                    ))}
                </select>
                
                <button onClick={Essai}>create task</button>
                


            </div>
        </div>
  )
}
