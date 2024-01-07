"use client"
import React, {useState} from 'react'


export default function Sidebar() {
    const [toggle, setToggle] = useState(false)

    return (
        <>
            {toggle ? (
            <>
                <div className='fixed top-0 left-0 h-full w-[20rem] bg-orange-300' onClick={()=>setToggle(!toggle)}> </div>
                <div className='h-full w-[20rem]'></div>
            </>
            )
             : (
            <>
             <div className='fixed bottom-10 left-0 h-[20rem] w-[20rem] bg-orange-300' onClick={()=>setToggle(!toggle)}> </div>
             
             </>
             )}
        </>
    )
}
