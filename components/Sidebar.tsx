"use client"
import React, { useState, useEffect} from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Answitch } from '.';

export default function Sidebar() {
    const [mounted, setMounted] = useState(false)
    const [toggle, setToggle] = useState(false)
    const { theme, setTheme } = useTheme()
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
                (<div className='h-full w-[17rem] bg-white dark:bg-[rgba(43,44,55,255)]'>
                    <div className='w-full h-[85%] flex flex-col justify-between'>
                        <div className='w-full h-[5rem] bg-red-400'></div>
                        {/* <Answitch toggleTheme={hide} /> */}
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
