export enum ToDoActionTypes {
    GET_DATA = 'GET_DATA',
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    CHECK_TODO = 'CHECK_TODO',
    CHECK_ALL_TODO = 'CHECK_ALL_TODO',
    SET_FILTER = 'SET_FILTER',
    EDIT_TODO = 'EDIT_TODO',
    CLEAR_LIST_TODO = 'CLEAR_LIST_TODO',
    USER_LOGIN = 'USER_LOGIN',
    USER_REGISTER = 'USER_REGISTER',
    GOOGLE_ACCOUNT = 'GOOGLE_ACCOUNT',
  }

//   export interface ToDo {
//     id: number,
//     name: string,
//     completed: boolean
//   }
  
  export interface ToDoState {
    list: any[];
    status: string;
    isCheck: boolean;
    isAuth: boolean, 
    isRegistr: boolean,
    isGoogle: boolean,
  }
  
  export interface getData {
    type: ToDoActionTypes.GET_DATA
    payload: any[]
  }
  export interface addTodo {
    type: ToDoActionTypes.ADD_TODO,
    payload: any[]
  }
  export interface removeTodo {
    type: ToDoActionTypes.REMOVE_TODO
    payload: number
  }
  export interface checkTodo {
    type: ToDoActionTypes.CHECK_TODO,
    payload: number
  }
  export interface checkAllTodo {
    type: ToDoActionTypes.CHECK_ALL_TODO
  }
  export interface setFilter {
    type: ToDoActionTypes.SET_FILTER
    payload: string
  }
  export interface editTodo {
    type: ToDoActionTypes.EDIT_TODO,
    payload: {id: number, name: string}
  }
  export interface clearListTodo {
    type: ToDoActionTypes.CLEAR_LIST_TODO
  }
  export interface userLogin {
    type: ToDoActionTypes.USER_LOGIN,
    payload: boolean
  }
  export interface userRegister {
    type: ToDoActionTypes.USER_REGISTER
    payload: boolean
  }
  export interface googleAccount {
    type: ToDoActionTypes.GOOGLE_ACCOUNT,
    payload: boolean
  }
  
  export type ToDoAction = getData | addTodo | removeTodo | checkTodo 
  | checkAllTodo | setFilter | editTodo | clearListTodo 
  | userLogin | userRegister | googleAccount;
  
  