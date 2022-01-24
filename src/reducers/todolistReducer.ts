import { ToDoAction, ToDoActionTypes, ToDoState } from '../types/types'

const initialState: ToDoState = {
  list: [],
  status: "All",
  isCheck: false,
  isAuth: true, 
  isRegistr: true,
  isGoogle: true,
}

const todolistReducer = (state = initialState, action: ToDoAction): ToDoState => {
  switch(action.type) {
    case ToDoActionTypes.GET_DATA:
      return { 
        ...state,
        list: action.payload,
        isCheck: action.payload.every((item) => item.completed)
      };
    case ToDoActionTypes.ADD_TODO: 
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    case ToDoActionTypes.REMOVE_TODO: 
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      }
    case ToDoActionTypes.EDIT_TODO: 
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload.id) {
            return {...item, name: action.payload.name};
          }
          return item;
        })
      }
    case ToDoActionTypes.CHECK_TODO: 
      const checkList = state.list.map(item => {
        if (item._id === action.payload) {
          return {...item, completed: !item.completed};
        }
        return item;
      })
      return {
        ...state,
        list: checkList,
        isCheck: checkList.every((item) => item.completed)
      }
    case ToDoActionTypes.CHECK_ALL_TODO: 
      return {
        ...state,
        list: state.list.map((item) => ({ ...item, completed: !state.isCheck})),
        isCheck: !state.isCheck
      }
    case ToDoActionTypes.CLEAR_LIST_TODO: 
      return {
        ...state,
        list: state.list.filter((item) => !item.completed),
        isCheck: false
      }
    case ToDoActionTypes.SET_FILTER: 
      return {
        ...state,
        status: action.payload
      }
    case ToDoActionTypes.USER_LOGIN: 
      return {
        ...state,
        isAuth: action.payload
      }
    case ToDoActionTypes.USER_REGISTER: 
      return {
        ...state,
        isRegistr: action.payload,
      }
    case ToDoActionTypes.GOOGLE_ACCOUNT: 
      return {
        ...state,
        isGoogle: action.payload,
      }
    default:
      return state;
  }
}

export default todolistReducer;

