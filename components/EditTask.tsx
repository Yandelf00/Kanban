"use client"
import React, {useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardType, columnType, subtaskType, taskType, actions } from '@/store'

type editTaskProps = {
  title : string,
  column : string
}

export default function EditTask(props : editTaskProps) {
  const dispatch = useDispatch()
  const [taskTitle, setTaskTitle] = useState(props.title)
  const titre = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLTextAreaElement>(null)
  const subrefs = useRef<Array<HTMLInputElement|null>>([])
  const task = useSelector((state:any)=>{
    const board = state.boards.boards.find((board : boardType)=>board.isActive===true);
    const col = board ? board.columns.find((column : columnType)=>column.name===props.column) : [];
    const tas = col? col.tasks.find((task : taskType)=>task.title===props.title) : [];
    return tas ? tas : '';
  })
  const [taskDesc, setTaskDesc] = useState(task.description)
  const [tasksubs, setTasksubs] = useState(task.subtasks)
  function delSub(name : string){
    const newsubtasks = tasksubs.filter((sub:subtaskType)=>sub.title!==name)
    setTasksubs(newsubtasks)
  }
  function addSub(){
    const newSub = {title : '', isCompleted : false}
    setTasksubs([...tasksubs, newSub])
  }
  function prin(){
    console.log(tasksubs)
  }
  function editTheTask(){
    dispatch(actions.editTask({
      colname : props.column || '',
      prevTitle : props.title || '',
      newTitle : titre.current?.value || '',
      descrp : desc.current?.value || '',
      subtasks : subrefs.current.map(ref => ref?.value).filter(Boolean)|| []
    }))
    alert('change done')
  }
  return (
    <div className='h-[100%] w-[90%] flex flex-col'>
            <h1 className='font-bold text-[1.2rem]'>Edit Task</h1>
            <div className='mt-4 flex flex-col'>
                <label htmlFor="taskName" className="mb-2 text-black dark:text-white">
                    Title
                </label>
                <input
                onChange={(e)=>setTaskTitle(e.currentTarget.value)}
                ref={titre}
                type="text"
                id="taskName"
                value={taskTitle}
                placeholder="e.g. Take coffee break"
                className="focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                 p-2 border dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] mb-5 rounded-md "
                />
                <label htmlFor="longTextInput" className="mb-2 text-black dark:text-white ">
                    Description
                </label>
                <textarea  className='focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                p-2 border rounded-md dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] mb-5' 
                id="longTextInput"
                onChange={(e)=>setTaskDesc(e.currentTarget.value)}
                ref={desc}
                value={taskDesc} 
                name="longInput" 
                placeholder='e.g It is always good to take a break. This 15 minute break will recharge the batteries a little.' 
                style={{ width: '100%', height: '140px' }}></textarea>
                <label>
                    Subtasks
                </label>
                <div className='flex flex-col mb-5'>
                    {
                      tasksubs.map((sub : subtaskType, index : number) =>(
                        <div key={index} className="flex items-center">
                          <input
                            onChange={(e)=>{
                              const updatedSubtasks = [...tasksubs];
                              updatedSubtasks[index] = { ...sub, title: e.target.value };
                              setTasksubs(updatedSubtasks);
                            }}
                            key={`idk_${index}`}
                            type="text"
                            value={sub.title || ''}
                            ref={(thisref)=>(subrefs.current[index]=thisref)}
                            placeholder=''
                            className="p-2 mt-2 w-[100%] rounded-md focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                            border dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] "
                            
                          />
                          <button
                          key={`button_${index}`}
                          type="button"
                          onClick={()=>delSub(sub.title)}
                          className="ml-2 pt-3 p-2 font-bold text-[1.3rem]   
                            text-[rgba(123,140,162,255)]  cursor-pointer"
                          >
                            x
                          </button>
                        </div>
                      ))
                    }
                    {/* {subTasks.tasks.map((subtask, index) => (
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
                          
                          className="ml-2 pt-3 p-2 font-bold text-[1.3rem]   
                          text-[rgba(123,140,162,255)]  cursor-pointer"
                        >
                          x
                        </button>
                      </div>
                    ))} */}
                </div>
                <button onClick={addSub} className='mb-5 rounded-full dark:text-[rgba(99,95,199,255)] text-white bg-[rgba(99,95,199,255)]
                font-bold h-[2.4rem] w-full dark:bg-white text-[rgba(99,95,199,255)] '>
                    + Add New Subtask
                </button>

                {/* <label htmlFor="mySelect" className='mb-2'>Status</label> */}
                {/* <select ref={selectRef} id="mySelect" name="select" className= 'mb-5 appearance-none focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300 border h-[2.4rem] rounded-md hover:no-underline p-2 dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)]'>
                    {activeBoard.columns.map((column:columnType)=>(
                        <option value={column.name}>{column.name}</option>
                    ))}
                </select> */}
                
                <button onClick={editTheTask} className='h-[2.4rem] font-bold bg-[rgba(99,95,199,255)] text-white rounded-full'>Create Task</button>
                


            </div>
        </div>
  )
}
