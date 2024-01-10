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
