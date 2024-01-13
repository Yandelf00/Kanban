"use client"
import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardType, columnType, taskType, subtaskType, actions } from '@/store'
import { Subtask } from '.'

type taskProps = {
    column : string,
    title : string
}
export default function Task(props : taskProps) {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const selectRef = useRef<HTMLSelectElement>(null);
    const activeBoard = useSelector((state:any)=>state.boards.boards.find((board:boardType)=>board.isActive===true))
    const task = useSelector((state:any)=>{
        const board = state.boards.boards.find((board : boardType)=>board.isActive === true);
        const concernedcol = board ? board.columns.find((column : columnType )=>column.name === props.column) : undefined;
        const thetask = concernedcol ? concernedcol.tasks.find((task:taskType)=> task.title === props.title) : undefined;
        return thetask ? thetask : [];
    })
    const totalSubtaks = task.subtasks.length
    const doneSubtasks = task.subtasks.filter((subtask : subtaskType)=>subtask.isCompleted===true).length;
    const [isOpen, setIsOpen] = useState(false)
    function changeCol(){
        setIsOpen(!isOpen)
        if(count>0){
            dispatch(actions.changeColTask({
                currentCol : props.column,
                nextCol :selectRef.current?.value,
                taskName : props.title
            }))
        }
    }
    function addCount(){
        setCount((count)=>count+1)
    }
    return (
        <div onClick={()=>setIsOpen(!isOpen)} className='flex flex-col'>
            {!isOpen ? 
            (   
                <div className='w-full h-full hover:text-[rgba(99,95,199,255)] '>
                    <div className='font-bold'>{props.title}</div>
                    <div className='text-[rgba(123,140,162,255)] text-[0.7rem] mt-1'>
                        {doneSubtasks} of {totalSubtaks} subtasks
                    </div>
                </div>
            ) 
            : (
                <>
                    <div className='font-bold'>{props.title}</div>
                    <div className='text-[rgba(123,140,162,255)] text-[0.7rem] mt-1'>
                        {doneSubtasks} of {totalSubtaks} subtasks
                    </div>
                    <div onClick={changeCol} className='fixed z-[900] top-0 left-0 h-full w-full' style={{backgroundColor : 'rgba(0, 0, 0, 0.69)'}}>
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }} className='bg-white flex flex-col justify-start items-start 
                    pt-7 pl-4 pr-4 pb-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    z-[1100] dark:bg-[rgba(43,44,55,255)] cursor-auto min-h-[17rem] w-[30rem] rounded-md'>
                        <div className='mb-5 w-full flex flex-row items-center justify-between'>
                            <h1 className='text-[black] dark:text-[white] font-semibold text-[1.3rem]'>{props.title}</h1>
                            <h1 className='text-[black] dark:text-[white]'>svg</h1>
                        </div>
                        <div className='text-[rgba(123,140,162,255)] text-[0.9rem] mb-5'>
                            {task.description}
                        </div>
                        <div className='text-[rgba(123,140,162,255)] mb-2 font-bold'>
                            Subtasks ({doneSubtasks} of {totalSubtaks})
                        </div>
                        <div className='flex flex-col'>
                            {task.subtasks.map((subtask : subtaskType)=>(
                                <div key={subtask.title}>
                                    <Subtask column={props.column} title={props.title} subtaskTitle={subtask.title}/>
                                </div>
                            ))}             
                        </div>
                        <div className='text-[rgba(123,140,162,255)] mb-2 font-bold'>
                            current Status
                        </div>
                        <label htmlFor="mySelect" className='mb-2'></label>
                        <select ref={selectRef} onChange={addCount} id="mySelect" name="select" className= 'mb-5 w-[27rem] appearance-none focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300 border h-[2.4rem] rounded-md hover:no-underline p-2 dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)]'>
                            <option value="currcolumn">{props.column}</option>
                            {activeBoard.columns.filter((column:columnType)=>column.name!==props.column).map((column:columnType)=>(
                                <option value={column.name}>{column.name}</option>
                            ))}
                        </select>

                    </div>
                    
                </>
            )}
        </div>
    )
}
