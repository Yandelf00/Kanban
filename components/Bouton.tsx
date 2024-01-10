"use client"
import React, {useState} from 'react'
import { TaskForm } from '.'

export default function Bouton() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            {isOpen ?
             (
                <>
                    <div>
                        <button className='mr-4 h-[3rem] w-[10rem] border-none text-white font-semibold bg-[rgba(99,95,199,255)] hover:bg-[rgb(146,143,232)] rounded-3xl '>+Add New Task</button>
                    </div>
                    <div onClick={()=>(setIsOpen(!isOpen))} className='fixed flex justify-center items-center z-[1000] top-0 left-0 h-full w-full' style={{backgroundColor : 'rgba(0, 0, 0, 0.69)'}}>
                    </div>
                    <div className='bg-white flex justify-center items-start pt-7 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1100] dark:bg-[rgba(43,44,55,255)] min-h-[45rem] w-[35rem] rounded-md'>
                        <TaskForm/>
                    </div>
                </>
             )
             : (
                <div>
                    <button onClick={()=>(setIsOpen(!isOpen))} className='mr-4 h-[3rem] w-[10rem] border-none text-white font-semibold bg-[rgba(99,95,199,255)] hover:bg-[rgb(146,143,232)] rounded-3xl '>+Add New Task</button>
                </div>
            )}
        </div>
    )
}
