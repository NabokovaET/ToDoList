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

import { ToDoAction, ToDoState } from '../Interfaces/interface'

const initialState: ToDoState = {
  list: [],
  status: "All",
  userId: "",
  isCheck: false,
  isAuth: true, 
  isRegistr: true,
  isGoogle: true,
}

const todolistReducer = (state = initialState, action: ToDoAction): ToDoState => {
  switch(action.type) {
    case GET_DATA:
      return { 
        ...state,
        list: action.payload.list,
        userId: action.payload.userId,
        isCheck: action.payload.list.every((item) => item.completed)
      };
    case ADD_TODO: 
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    case REMOVE_TODO: 
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload)
      }
    case EDIT_TODO: 
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload.id) {
            return {...item, name: action.payload.name};
          }
          return item;
        })
      }
    case CHECK_TODO: 
      const checkList = state.list.map(item => {
        if (item.id === action.payload) {
          return {...item, completed: !item.completed};
        }
        return item;
      })
      return {
        ...state,
        list: checkList,
        isCheck: checkList.every((item) => item.completed)
      }
    case CHECK_ALL_TODO: 
      return {
        ...state,
        list: state.list.map((item) => ({ ...item, completed: !state.isCheck})),
        isCheck: !state.isCheck

      }
    case CLEAR_LIST_TODO: 
      return {
        ...state,
        list: state.list.filter((item) => !item.completed),
        isCheck: false
      }
    case SET_FILTER: 
      return {
        ...state,
        status: action.payload
      }
    case USER_LOGIN: 
      return {
        ...state,
        isAuth: action.payload,
      }
    case USER_REGISTER: 
      return {
        ...state,
        isRegistr: action.payload,
      }
    case GOOGLE_ACCOUNT: 
      return {
        ...state,
        isGoogle: action.payload,
      }
    default:
      return state;
  }
}

export default todolistReducer;

