"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { boardType, columnType, taskType, subtaskType } from '@/store'

type taskProps = {
    column : string,
    title : string
}
export default function Task(props : taskProps) {
    const task = useSelector((state:any)=>{
        const board = state.boards.boards.find((board : boardType)=>board.isActive === true);
        const concernedcol = board ? board.columns.find((column : columnType )=>column.name === props.column) : undefined;
        const thetask = concernedcol ? concernedcol.tasks.find((task:taskType)=> task.title === props.title) : undefined;
        return thetask ? thetask : [];
    })
    const totalSubtaks = task.subtasks.length
    const doneSubtasks = task.subtasks.filter((subtask : subtaskType)=>subtask.isCompleted===true).length;
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div onClick={()=>setIsOpen(!isOpen)} className='flex flex-col'>
            {!isOpen ? 
            (   
                <>
                    <div className='hover:text-[rgba(99,95,199,255)]'>{props.title}</div>
                    <div className='text-[rgba(123,140,162,255)] text-[0.7rem] mt-1'>
                        {doneSubtasks} of {totalSubtaks} subtasks
                    </div>
                </>
            ) 
            : (
                <>
                    {props.title}
                    <div className='text-[rgba(123,140,162,255)] text-[0.7rem] mt-1'>
                        {doneSubtasks} of {totalSubtaks} subtasks
                    </div>
                    <div onClick={()=>{
                        setIsOpen(!isOpen)}} className='fixed z-[900] top-0 left-0 h-full w-full' style={{backgroundColor : 'rgba(0, 0, 0, 0.69)'}}>
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }} className='bg-white flex flex-col justify-start items-start 
                    pt-7 pl-4 pr-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    z-[1100] dark:bg-[rgba(43,44,55,255)] cursor-auto min-h-[25rem] w-[30rem] rounded-md'>
                        <div className='mb-5 w-full flex flex-row justify-between'>
                            <h1 className='text-[black] dark:text-[white]'>{props.title}</h1>
                            <h1 className='text-[black] dark:text-[white]'>svg</h1>
                        </div>
                        <div className='text-[rgba(123,140,162,255)] text-[0.9rem] mb-5'>
                            {task.description}
                        </div>
                        <div className='text-[rgba(123,140,162,255)] mb-2 '>
                            Subtasks ({doneSubtasks} of {totalSubtaks})
                        </div>
                        <div className='flex flex-col'>
                            {task.subtasks.map((subtask : subtaskType)=>(
                                <div className='dark:bg-[rgba(35,36,47,255)] p-1 mb-1 rounded-md h-[2rem] w-[20rem]'>{subtask.title}</div>
                            ))}

                        </div>

                    </div>
                    
                </>
            )}
        </div>
    )
}
