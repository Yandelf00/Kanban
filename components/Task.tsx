"use client"
import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardType, columnType, taskType, subtaskType, actions } from '@/store'
import { Subtask, EditTask } from '.'

type taskProps = {
    column : string,
    title : string
}
export default function Task(props : taskProps) {
    const [count, setCount] = useState(0)
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)
    const [ed, setEd] = useState(false)
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
    function openEdit(){
        setIsOpen(!isOpen)
        setEdit(false)
        setEd(!ed)
    }
    function openDel(){
        setIsOpen(false)
        setEdit(false)
        setDel(true)
    }
    function addCount(){
        setCount((count)=>count+1)
    }
    function delTask(){
        dispatch(actions.deleteTask({
            column : props.column,
            title : props.title
        }))
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
                            {!edit? 
                            (<div onClick={()=>setEdit(!edit)} className='cursor-pointer mr-3'>
                                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                            </div>) : 
                            (<>
                                <div onClick={()=>setEdit(!edit)} className='cursor-pointer mr-3'>
                                    <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                                    
                                </div>
                                <div className='dark:bg-[rgba(32,33,44,255)] bg-white justify-center items-start flex flex-col z-50 h-[5rem] rounded-md shadow-gray-300 dark:shadow-black shadow-lg w-[9rem] fixed top-[4rem] right-5 '>
                                    <div onClick={openEdit} className='text-[rgb(107,107,107)] mb-3 ml-3 cursor-pointer'>Edit Task</div>
                                    <div onClick={openDel} className='text-red-500 ml-3 cursor-pointer'>Delete Task</div>
                                </div>  
                            </>
                            )}
                            {/* <div className='cursor-pointer mr-3'>
                                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                            </div> */}
                        </div>
                        <div className='text-[rgba(123,140,162,255)] text-[0.9rem] mb-5'>
                            {task.description}
                        </div>
                        <div className='text-[rgba(123,140,162,255)] mb-2 font-bold'>
                            Subtasks ({doneSubtasks} of {totalSubtaks})
                        </div>
                        <div className='flex flex-col'>
                            {task.subtasks.map((subtask : subtaskType, index : number)=>(
                                <div key={`${index}___${subtask.title}`}>
                                    <Subtask column={props.column} title={props.title} subtaskTitle={subtask.title}/>
                                </div>
                            ))}             
                        </div>
                        <div className='text-[rgba(123,140,162,255)] mb-2 font-bold'>
                            current Status
                        </div>
                        {/* <label className='mb-2'></label> */}
                        <div className='mb-2'></div>
                        <select ref={selectRef} onChange={addCount} id={`mySelect_${props.title}`} name="select" className= 'mb-5 w-[27rem] appearance-none focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300 border h-[2.4rem] rounded-md hover:no-underline p-2 dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)]'>
                            <option value="currcolumn">{props.column}</option>
                            {activeBoard.columns.filter((column:columnType)=>column.name!==props.column).map((column:columnType, index:number)=>(
                                <option key={`${column.name}_${index}`} value={column.name}>{column.name}</option>
                            ))}
                        </select>

                    </div>
                    
                </>
            )}
            {ed ? 
            ( <div onClick={(e)=>{
                e.stopPropagation()
                setEd(!ed)
                setIsOpen(true)
                }} className='fixed z-[900] top-0 left-0 h-full w-full' style={{backgroundColor : 'rgba(0, 0, 0, 0.69)'}}>
                <div onClick={(e) => {
                        e.stopPropagation();
                    }} className='bg-white flex justify-center items-start pt-7 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1100] dark:bg-[rgba(43,44,55,255)] min-h-[45rem] w-[35rem] rounded-md'>
                        <EditTask title={props.title} column={props.column}/>
                </div>
            </div>) : 
            (
                <></>
            )}
            {del ? 
            ( <div onClick={(e)=>{
                e.stopPropagation()
                }} className='fixed z-[900] top-0 left-0 h-full w-full' style={{backgroundColor : 'rgba(0, 0, 0, 0.69)'}}>
                <div onClick={(e) => {
                        e.stopPropagation();
                    }} className='bg-white flex flex-col justify-start items-start pt-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1100] dark:bg-[rgba(43,44,55,255)] min-h-[16rem] w-[29rem] rounded-md'>
                        <div className='ml-7 font-bold text-red-500 text-[1.2rem]'>Delete this task?</div>
                        <div className='ml-7 mt-7 text-[rgba(123,140,162,255)]'> Are you sure you want to delete the "{props.title}" task and its subtasks? This action cannot be reversed. </div>
                        <div className='flex flex-row justify-center items-center mt-8 w-full pl-2 pr-2'>
                            <button onClick={delTask} className='w-[40%] h-8 mr-4 hover:bg-red-400 font-semibold bg-red-500 text-white rounded-full'>Delete</button>
                            <button onClick={()=>{
                                setDel(false)
                                setIsOpen(true)
                            }} className='w-[40%] h-8 ml-4 dark:bg-white font-semibold bg-[rgb(220,219,248)] text-[rgba(99,95,199,255)] rounded-full '>Cancel</button>
                        </div>
                </div>
            </div>) : 
            (
                <></>
            )}
        </div>
    )
}
