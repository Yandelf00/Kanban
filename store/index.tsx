import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Data from '@/data/data.json'
 
export type subtaskType = {
    title : string,
    isCompleted : boolean
}
export type taskType = {
    title : string,
    description : string,
    status : string,
    subtasks : subtaskType[]
}
export type columnType = {
    name : string,
    tasks : taskType[]
}
export type boardType = {
    name : string,
    isActive : boolean,
    columns : columnType[]
}


const boardSlice = createSlice({
    name : 'boards',
    initialState : {boards : Data.boards as boardType[]},
    reducers : {
        addTask : (state, action)=>{
            const {title, description, subtasks, status} = action.payload;
            const activeboard = state.boards.findIndex((board)=>board.isActive);
            const newTask : taskType = {title, description, status, subtasks : subtasks||[]}
            const column = state.boards[activeboard].columns.findIndex((column)=>column.name==status)
            state.boards[activeboard].columns[column].tasks.push(newTask)
        },
        changeCheckSubtasks : (state, action: PayloadAction<{ columnTitle: string, taskTitle: string, subtaskTitle: string }>)=>{
            const {columnTitle, taskTitle, subtaskTitle} = action.payload;
            const activeBoard = state.boards.findIndex((board : boardType)=> board.isActive === true);
            const concernedColumn = state.boards[activeBoard].columns.findIndex((column : columnType)=>column.name===columnTitle);
            const concernedTask = state.boards[activeBoard].columns[concernedColumn].tasks.findIndex((task:taskType)=>task.title===taskTitle)
            const concernedSubTask = state.boards[activeBoard].columns[concernedColumn].tasks[concernedTask].subtasks.findIndex((subtask:subtaskType)=>subtask.title===subtaskTitle)
            const check = state.boards[activeBoard].columns[concernedColumn].tasks[concernedTask].subtasks[concernedSubTask].isCompleted
            state.boards[activeBoard].columns[concernedColumn].tasks[concernedTask].subtasks[concernedSubTask].isCompleted = !check;
        },
        changeColTask : (state, action)=>{
            const {currentCol, nextCol, taskName} = action.payload;
            const activeBoard = state.boards.findIndex((board:boardType)=>board.isActive===true);
            const current = state.boards[activeBoard].columns.findIndex((column:columnType)=>column.name===currentCol);
            const next = state.boards[activeBoard].columns.findIndex((column:columnType)=>column.name===nextCol);
            const concernedTaskId = state.boards[activeBoard].columns[current].tasks.findIndex((task:taskType)=>task.title === taskName);
            const concernedTask = state.boards[activeBoard].columns[current].tasks[concernedTaskId]
            if(currentCol !== nextCol){
                state.boards[activeBoard].columns[next]?.tasks.push(concernedTask);
                state.boards[activeBoard].columns[current].tasks = state.boards[activeBoard].columns[current]?.tasks.filter((task:taskType)=>task.title !== taskName);
            } 
        },
        makeActive : (state, action)=>{
            const {boardName} = action.payload;
            state.boards = state.boards.map((board:boardType)=>{
                board.isActive = false
                if (board.name == boardName){
                    board.isActive = true
                }
                return board
            })
        }
    }
})



const store = configureStore({
    reducer: {
        boards : boardSlice.reducer
    },
})

export const actions = boardSlice.actions;
export default store;
