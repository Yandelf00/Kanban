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
    reducers : {}
})


const counterSlice = createSlice({
    name : 'counter',
    initialState : {counter : 0 },
    reducers : {
        increment(state) {
            if (state.counter!==null)
            {
                state.counter++;
            }
        },
        decrement(state) {
            if (state.counter!==null)
            {
                state.counter--;
            }
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
