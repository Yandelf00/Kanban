"use client"
import React, {useState} from 'react'

export default function CreateBoard() {
    const [create, setCreate] = useState(false)

    return (
        <>
            {!create ? 
            (<div onClick={()=>setCreate(!create)} className={` cursor-pointer pl-10 mb-5 h-12 flex font-semibold items-center w-[90%] rounded-r-full hover:text-[rgb(146,143,232)] hover:bg-[rgb(214,212,247)] dark:hover:bg-[rgb(255,255,255)]
            dark:hover:text-[rgba(99,95,199,255)] text-[rgba(99,95,199,255)] transition-bg ease-in-out duration-200`}>
                <h3 className={``} >+ Create New Board</h3>
            </div>) 
            : (
            <>
                <div className={` cursor-pointer pl-10 mb-5 h-12 flex font-semibold items-center w-[90%] rounded-r-full hover:text-[rgb(146,143,232)] hover:bg-[rgb(214,212,247)] dark:hover:bg-[rgb(255,255,255)]
                    dark:hover:text-[rgba(99,95,199,255)] text-[rgba(99,95,199,255)] transition-bg ease-in-out duration-200`}>
                    <h3 className={``} >+ Create New Board</h3>
                </div>  
                <div className='fixed z-[1000000] top-0 left-0 h-full w-full' style={{backgroundColor : 'rgba(0, 0, 0, 0.69)'}}>
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                }} className='bg-white flex flex-col justify-start items-start 
                pt-7 pl-4 pr-4 pb-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                z-[1100] dark:bg-[rgba(43,44,55,255)] cursor-auto min-h-[17rem] w-[30rem] rounded-md'>
                </div>
            </>)}
            
        </>
    )
}
