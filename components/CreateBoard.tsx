"use client"
import React, {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@/store'

export default function CreateBoard() {
    const boardNameRef = useRef<HTMLInputElement>(null)
    const [cols, setCols] = useState(['Todo', 'Doing'])
    const colsRef = useRef<Array<HTMLInputElement|null>>([])
    const handleRemoveColumn = (index: number) => {
        const updatedCols = cols.filter((_, i) => i !== index);
        setCols(updatedCols);
    };
    const handleColumnChange = (index: number, value: string) => {
        const updatedCols = [...cols];
        updatedCols[index] = value;
        setCols(updatedCols);
    };
    return (
        <div className='h-full w-full flex justify-center '>
            <div className='h-[18rem] w-[90%] flex flex-col'>
                <h1 className='font-bold text-[1.2rem] mb-5'>Add new board</h1>
                <label htmlFor="taskName" className="mb-2 text-black dark:text-white">
                    Board Name
                </label>
                <input
                ref={boardNameRef}
                type="text"
                id="taskName"
                placeholder="e.g. Web Design"
                className="focus:border-[rgba(99,95,199,255)] focus:outline-none transition-border ease-in-out duration-300
                 p-2 border dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] mb-5 rounded-md "
                />
                <label htmlFor="taskName" className="mb-2 text-black dark:text-white">
                    Board Columns
                </label>
                <div className='flex flex-col'>
                    {cols.map((col:string, index:number)=>
                    (   
                        <div className='flex flex-row items-center' key={`col_${index}`}>
                            <input
                                type="text"
                                id={`${index}_col`}
                                onChange={(e) => handleColumnChange(index, e.target.value)}
                                value={col}
                                ref={(colref)=>(colsRef.current[index]=colref)}
                                className="focus:border-[rgba(99,95,199,255)] h-[2.5rem] w-[23rem] focus:outline-none transition-border ease-in-out duration-300
                                p-2 border dark:border-[rgba(123,140,162,255)] dark:bg-[rgba(43,44,55,255)] rounded-md "
                            />
                            <button
                            onClick={()=>handleRemoveColumn(index)}
                            type="button"
                            className="ml-2 pt-3 p-2 font-bold text-[1.3rem]   
                            text-[rgba(123,140,162,255)]  cursor-pointer"
                            >
                            x
                        </button>
                        </div>

                    )
                    )}
                    <button className='h-[2.4rem] mb-5 mt-5 font-bold bg-[rgba(99,95,199,255)] text-white rounded-full'>+ Add New Column</button>
                    <button className='h-[2.4rem] font-bold bg-[rgba(99,95,199,255)] text-white rounded-full'>Create New Board</button>
                </div>
                

            </div>

        </div>
    )
}
