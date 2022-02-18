import { 
  GET_DATA, 
  ADD_TODO, 
  REMOVE_TODO, 
  CHECK_TODO, 
  CHECK_ALL_TODO, 
  SET_FILTER, 
  EDIT_TODO, 
  CLEAR_LIST_TODO, 
  USER_LOGIN,
  USER_REGISTER,
  GOOGLE_ACCOUNT } from '../actions/types'

  export interface ToDo {
    id: string,
    name: string,
    completed: boolean
  }
  
  export interface ToDoState {
    list: ToDo[],
    status: string,
    userId: string,
    isCheck: boolean;
    isAuth: boolean, 
    isRegistr: boolean,
    isGoogle: boolean,
  }

  export interface ToDoItemProps {
    item: any,
    removeTodo: Function,
    editTodo: Function
  }
  
  export interface getData {
    type:  typeof GET_DATA,
    payload: {list: any[], userId: string, isCheck: boolean}
  }
  export interface addTodo {
    type: typeof ADD_TODO,
    payload: ToDo
  }
  export interface removeTodo {
    type: typeof REMOVE_TODO,
    payload: string
  }
  export interface checkTodo {
    type: typeof CHECK_TODO,
    payload: string
  }
  export interface checkAllTodo {
    type: typeof CHECK_ALL_TODO,
  }
  export interface setFilter {
    type: typeof SET_FILTER,
    payload: string
  }
  export interface editTodo {
    type: typeof EDIT_TODO,
    payload: {id: string, name: string}
  }
  export interface clearListTodo {
    type: typeof CLEAR_LIST_TODO,
  }
  export interface userLogin {
    type: typeof USER_LOGIN,
    payload: boolean
  }
  export interface userRegister {
    type: typeof USER_REGISTER,
    payload: boolean
  }
  export interface googleAccount {
    type: typeof GOOGLE_ACCOUNT,
    payload: boolean
  }
  
  export type ToDoAction = getData | addTodo | removeTodo | checkTodo 
  | checkAllTodo | setFilter | editTodo | clearListTodo 
  | userLogin | userRegister | googleAccount;
  
  