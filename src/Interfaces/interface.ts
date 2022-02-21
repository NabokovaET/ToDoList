import { USER_LOGIN, USER_REGISTER, GOOGLE_ACCOUNT } from '../actions/types';

export interface ToDo {
    id: string;
    name: string;
    completed: boolean;
}

export interface ToDoState {
    list: ToDo[];
    status: string;
    userId: string;
    isCheck: boolean;
    isAuth: boolean;
    isRegistr: boolean;
    isGoogle: boolean;
}

export interface userLogin {
    type: typeof USER_LOGIN;
    payload: boolean;
}

export interface userRegister {
    type: typeof USER_REGISTER;
    payload: boolean;
}

export interface googleAccount {
    type: typeof GOOGLE_ACCOUNT;
    payload: boolean;
}

export type ToDoAction = userLogin | userRegister | googleAccount;
