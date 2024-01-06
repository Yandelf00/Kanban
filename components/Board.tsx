"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { boardType } from '@/store'; // Assuming you have exported boardType from your store

export default function Board() {
    const boards = useSelector((state: any) => state.boards.boards); // Access state.board.boards

    return (
        <div>
            {boards.map((board : boardType)=>(
                <div key={board.name}>
                    <h3>{board.name}</h3>
                </div>
            ))}
        </div>
    );
}
