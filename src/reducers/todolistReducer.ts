import { USER_LOGIN, USER_REGISTER, GOOGLE_ACCOUNT } from '../actions/types';

import { ToDoAction, ToDoState } from '../Interfaces/interface';

const initialState: ToDoState = {
    list: [],
    status: 'All',
    userId: '',
    isCheck: false,
    isAuth: true,
    isRegistr: true,
    isGoogle: true,
};

const todolistReducer = (state = initialState, action: ToDoAction): ToDoState => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isAuth: action.payload,
            };
        case USER_REGISTER:
            return {
                ...state,
                isRegistr: action.payload,
            };
        case GOOGLE_ACCOUNT:
            return {
                ...state,
                isGoogle: action.payload,
            };
        default:
            return state;
    }
};

export default todolistReducer;
