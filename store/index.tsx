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
            let newTask : taskType = {title, description, status, subtasks:[]}
            for(let i=0; i<subtasks.length; i++){
                const subtask = {title : subtasks[i], isCompleted : false}
                newTask.subtasks.push(subtask) 
            }
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
        },
        addBoard : (state, action)=>{
            const {boardName, colNames} = action.payload;
            let colsToPush = []
            for(let i=0; i<colNames.length; i++){
                const colToPush = {name : colNames[i], tasks : []}
                colsToPush.push(colToPush);
            }
            const boardToPush = {name : boardName, isActive : false, columns : colsToPush}
            state.boards.push(boardToPush)
            
        },
        deleteTask : (state, action)=>{
            const {column, title} = action.payload;
            const colname = state.boards.find((board : boardType)=>board.isActive===true)?.columns.findIndex((col:columnType)=>col.name===column)
            
            if(colname!==undefined){
                const taskIndex = state.boards.find((board : boardType)=>board.isActive===true)?.columns[colname].tasks.findIndex((task:taskType)=>task.title===title)
                if(taskIndex !== undefined)
                {
                    state.boards.find((board:boardType)=>board.isActive===true)?.columns[colname].tasks.splice(taskIndex, 1)
                }    
            }            
        },
        editTask : (state, action)=>{
            const { colname, prevTitle, newTitle, descrp, subtasks } = action.payload;

            const activeBoardIndex = state.boards.findIndex((board: boardType) => board.isActive === true);

            if (activeBoardIndex === -1) {
                return;
            }

            const activeBoard = state.boards[activeBoardIndex];

            const colIndex = activeBoard.columns.findIndex((col: columnType) => col.name === colname);

            if (colIndex === -1) {
                return;
            }

            const taskIndex = activeBoard.columns[colIndex].tasks.findIndex((task: taskType) => task.title === prevTitle);

            if (taskIndex === -1 || newTitle === undefined) {
                return;
            }

            const existingSubtaskTitles = activeBoard.columns[colIndex].tasks[taskIndex].subtasks.map(subtask => subtask.title);

            const updatedSubtasks = subtasks
            .filter((subtaskTitle:string) => !existingSubtaskTitles.includes(subtaskTitle))
            .map((subtaskTitle:string) => ({ title: subtaskTitle, isCompleted: false }));

            const updatedSubtaskstwo = subtasks
            .filter((subtaskTitle:string) => existingSubtaskTitles.includes(subtaskTitle))
            .map((subtaskTitle:string) => ({ title: subtaskTitle, isCompleted: activeBoard.columns[colIndex].tasks[taskIndex].subtasks.find((subb:subtaskType)=>subb.title===subtaskTitle)?.isCompleted}));

            const finalSubtask = updatedSubtasks.concat(updatedSubtaskstwo)

            const updatedTasks = [...activeBoard.columns[colIndex].tasks];
            updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], title: newTitle, description: descrp, subtasks : finalSubtask };

            const updatedColumns = [...activeBoard.columns];
            updatedColumns[colIndex] = { ...updatedColumns[colIndex], tasks: updatedTasks };

            const updatedBoards = [...state.boards];
            updatedBoards[activeBoardIndex] = { ...activeBoard, columns: updatedColumns };

            state.boards = updatedBoards;
            
        },
        deleteBoard : (state, action)=>{
            const boardindex = state.boards.findIndex((board:boardType)=>board.isActive===true)
            state.boards.splice(boardindex, 1)
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
