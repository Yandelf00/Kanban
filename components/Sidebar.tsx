"use client"
import React, { useState } from 'react'

export default function Sidebar() {
    const [hide, setHide] = useState(true);
    function show(){
        setHide(prevHide => !prevHide);
    }
    return (
        <>
            {hide === true ? 
                ( <div onClick={show} className='w-[3rem] h-[3rem] z-[100] absolute bottom-5 left-0 
                cursor-pointer hover:text-[rgba(99,95,199,255)] 
                flex items-center justify-center rounded-r-3xl
                hover:bg-[rgb(146,143,232)]'>
                    ..
                </div> ) : 
                (<div className='h-full w-[17rem] dark:bg-[rgba(43,44,55,255)]'>
                    <div className='w-full h-[85%] flex flex-col'>
                        <div className='w-full h-[5rem]'></div>
                    </div>
                    <div onClick={show} className='w-[16rem] h-[3rem] z-[100] absolute bottom-5 left-0 
                    cursor-pointer hover:bg-white hover:text-[rgba(99,95,199,255)] 
                    flex items-center justify-center transition-bg ease-in-out duration-100 rounded-r-3xl'>
                        Hide Sidebar
                    </div>
                </div>)
            }
        </>
    )
}
