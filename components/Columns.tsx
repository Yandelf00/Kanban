"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { columnType, boardType } from '@/store'
import { Tasks } from '.'

export default function Columns() {
    const columns = useSelector((state: any) => {
        const activeBoard = state.boards.boards.find((board: boardType) => board.isActive);
        return activeBoard ? activeBoard.columns : [];
      });
    return (
        <div className='flex flex-row'>
            {
                columns.map((column : columnType) => (
                    <div key={column.name} className='mr-[2.5rem] text-[rgba(123,140,162,255)] w-[17rem] h-full flex flex-col'>
                        {column.name}
                        <Tasks columname={column.name} />
                    </div>
                ))
                
            }

        </div>
    )
}
