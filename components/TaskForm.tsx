"use client"
import React, {useState, useRef} from 'react'
import { Tasks } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { boardType, columnType, actions } from '@/store';
import { title } from 'process';


export default function TaskForm() {
    const [subTasks, setSubTasks] = useState({num : 2, tasks : [{id : 1}, {id : 2}]})
    const boards = useSelector((state:any)=>state.boards.boards)
    const activeBoard = boards.find((board : boardType)=>board.isActive === true)
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const subtaskRefs = useRef<Array<HTMLInputElement|null>>([]);
    const selectRef = useRef<HTMLSelectElement>(null);
    const dispatch = useDispatch()

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

    function addTask(){
        dispatch(actions.addTask({
            title: title.current?.value || '',
            description: description.current?.value || '',
            status: selectRef.current?.value || '',
            subtasks: subtaskRefs.current.map(ref => ref?.value).filter(Boolean)|| []
          }));
        // console.log(subtaskRefs.current.map(ref => ref?.value).filter(Boolean))
    }
    return (
        <div className='h-[100%] w-[90%] flex flex-col'>
            <h1 className='font-bold text-[1.2rem]'>Add New Task</h1>
            <div className='mt-4 flex flex-col'>
                <label htmlFor="taskName" className="mb-2 text-black dark:text-white">
                    Title
                </label>
                <input
                ref = {title}
                type="text"
                id="taskName"
                placeholder="e.g. Take coffee break"
                className="focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                 p-2 border dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] mb-5 rounded-md "
                />
                <label htmlFor="longTextInput" className="mb-2 text-black dark:text-white ">
                    Description
                </label>
                <textarea ref={description} className='focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                p-2 border rounded-md dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] mb-5' 
                id="longTextInput" 
                name="longInput" 
                placeholder='e.g It is always good to take a break. This 15 minute break will recharge the batteries a little.' 
                style={{ width: '100%', height: '140px' }}></textarea>
                <label>
                    Subtasks
                </label>
                <div className='flex flex-col mb-5'>
                    {subTasks.tasks.map((subtask, index) => (
                        <div key={subtask.id} className="flex items-center">
                        <input
                          key={subtask.id}
                          type="text"
                          placeholder=''
                          className="p-2 mt-2 w-[100%] rounded-md focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                          border dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] "
                          ref={(inputRef) => (subtaskRefs.current[index] = inputRef)}
                        />
                        <button
                          key={subtask.id}
                          type="button"
                          onClick={() => deleteSubtasks(subtask.id)}
                          className="ml-2 pt-3 p-2 font-bold text-[1.3rem]   
                          text-[rgba(123,140,162,255)]  cursor-pointer"
                        >
                          x
                        </button>
                      </div>
                    ))}
                </div>
                <button onClick={addSubtasks} className='mb-5 rounded-full dark:text-[rgba(99,95,199,255)] text-white bg-[rgba(99,95,199,255)]
                font-bold h-[2.4rem] w-full dark:bg-white text-[rgba(99,95,199,255)] '>
                    + Add New Subtask
                </button>

                <label htmlFor="mySelect" className='mb-2'>Status</label>
                <select ref={selectRef} id="mySelect" name="select" className= 'mb-5 appearance-none focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300 border h-[2.4rem] rounded-md hover:no-underline p-2 dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)]'>
                    {activeBoard.columns.map((column:columnType)=>(
                        <option value={column.name}>{column.name}</option>
                    ))}
                </select>
                
                <button onClick={addTask} className='h-[2.4rem] font-bold bg-[rgba(99,95,199,255)] text-white rounded-full'>Create Task</button>
                


            </div>
        </div>
  )
}
