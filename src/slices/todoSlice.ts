import { createSlice } from '@reduxjs/toolkit';
import { ToDoState, ToDo } from '../Interfaces/interface';

const initialState: ToDoState = {
    list: [],
    status: 'All',
    userId: '',
    isCheck: false,
    isAuth: true,
    isRegistr: true,
    isGoogle: true,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getData: (state, action) => {
            state.list = action.payload.data.getTodoList;
            state.userId = action.payload.userId;
            state.isCheck = action.payload.data.getTodoList.every((item: ToDo) => item.completed);
        },
        addTodo: (state, action) => {
            state.list = [action.payload, ...state.list];
        },
        removeTodo: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
        editTodo: (state, action) => {
            state.list = state.list.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, name: action.payload.name };
                }
                return item;
            });
        },
        checkTodo: (state, action) => {
            state.list = state.list.map(item => {
                if (item.id === action.payload) {
                  return {...item, completed: !item.completed};
                }
                return item;
            });
            state.isCheck = state.list.every((item) => item.completed);

        },
        checkAllTodo: (state) => {
            state.list = state.list.map((item) => ({ ...item, completed: !state.isCheck }));
            state.isCheck = !state.isCheck;
        },
        clearListTodo: (state) => {
            state.list = state.list.filter((item) => !item.completed);
            state.isCheck = false;
        },
        setFilter: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { 
    getData, 
    addTodo, 
    removeTodo, 
    editTodo, 
    checkTodo,
    checkAllTodo, 
    clearListTodo,
    setFilter, 
} = todoSlice.actions;

export default todoSlice.reducer;
