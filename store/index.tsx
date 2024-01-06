import { configureStore, createSlice } from "@reduxjs/toolkit";

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
        counter : counterSlice.reducer
    },
})

export const actions = counterSlice.actions;
export default store;