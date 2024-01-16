"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { boardType, actions } from '@/store'; 
import { CreateBoard } from '.';

export default function Board() {
    const boards = useSelector((state: any) => state.boards.boards); 
    const dispatch = useDispatch()
    function changeActive(toactiveName : string){
        dispatch(actions.makeActive({
            boardName : toactiveName
        }))
    }

    return (
        <div className='flex flex-col mt-5 hover justify-center items-start '>
            <h2 className='font-semibold ml-5 mb-5 text-[rgba(123,140,162,255)]'>ALL BOARDS ({boards.length})</h2>
            {boards.map((board : boardType)=>(
                <div onClick={()=>changeActive(board.name)} className={` ${board.isActive ? 'bg-[rgba(99,95,199,255)] text-[white]' : ''} cursor-pointer pl-10 mb-5 h-12 flex font-semibold items-center w-[90%] rounded-r-full hover:text-[rgb(146,143,232)] hover:bg-[rgb(214,212,247)] dark:hover:bg-[rgb(255,255,255)]
                dark:hover:text-[rgba(99,95,199,255)] text-[rgba(123,140,162,255)] transition-bg ease-in-out duration-200`} key={board.name}>
                    <h3 className={``} >{board.name}</h3>
                </div>
            ))}
        </div>
    );
}
