import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardType, columnType, taskType, subtaskType, actions } from '@/store'

type subtaskProps = {
    column : string,
    title : string,
    subtaskTitle : string
}

export default function Subtask(props : subtaskProps) {
    const dispatch = useDispatch()
    const subtask = useSelector((state:any)=>{
        const activeBoard = state.boards.boards.find((board : boardType)=>board.isActive===true)
        const column = activeBoard ? activeBoard.columns.find((column : columnType)=>column.name === props.column) : undefined;
        const task = column ? column.tasks.find((task : taskType)=>task.title === props.title) : undefined;
        const subtask = task ? task.subtasks.find((subtask : subtaskType)=>subtask.title === props.subtaskTitle) : undefined;
        return subtask ? subtask : '';
    })
    
    function changeCheck(){
        dispatch(actions.changeCheckSubtasks({
            columnTitle: props.column,
            taskTitle: props.title,
            subtaskTitle: props.subtaskTitle,
        }));
    }

    return (
        <div>
            <div className='dark:bg-[rgba(35,36,47,255)] flex items-center p-1 mb-1 text-[0.8rem] rounded-md min-h-[2.5rem] w-[27rem]'>
                <label className='flex flex-row'>
                    <input
                        type="checkbox"
                        id="myCheckbox"
                        name="myCheckbox"
                        checked = {subtask.isCompleted}
                        onChange={changeCheck}
                        className='m-1'
                        />
                     <div className={`${subtask.isCompleted ? 'line-through text-[rgba(123,140,162,255)]' : ''} ml-3`}>{subtask.title}</div>
                </label>
            </div>
        </div>
    )
}
