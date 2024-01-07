"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { boardType } from '@/store'; // Assuming you have exported boardType from your store

export default function Board() {
    const boards = useSelector((state: any) => state.boards.boards); // Access state.board.boards

    return (
        <div className='flex flex-col mt-5 hover justify-center items-start '>
            <h2 className='font-semibold ml-5 mb-5'>ALL BOARDS ({boards.length})</h2>
            {boards.map((board : boardType)=>(
                <div className='pl-10 mb-5 h-12 flex font-semibold items-center w-[90%] rounded-r-full hover:text-[rgb(146,143,232)] hover:bg-[rgb(214,212,247)] dark:hover:bg-[rgb(255,255,255)]
                dark:hover:text-[rgba(99,95,199,255)] transition-bg ease-in-out duration-200' key={board.name}>
                    <h3>{board.name}</h3>
                </div>
            ))}
        </div>
    );
}
