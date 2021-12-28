import { GET_DATA, ADD_TODO, REMOVE_TODO, CHECK_TODO, CHECK_ALL_TODO, SET_FILTER, EDIT_TODO, CLEAR_LIST_TODO } from '../actions/types'

const initialState = {
  list: [],
  status: "All",
  isCheck: false,
}

const editTodo = (list, id, text) => {
  return list.map((item) => {
    if (item._id === id) {
      return {...item, text: text};
    }
    return item;
  })
}

const checkTodo = (state, id) => {
  const checkList = state.list.map(item => {
    if (item._id === id) {
      return {...item, checked: !item.checked};
    }
    return item;
  })
  return {
    list: checkList,
    isCheck: checkList.every((item) => item.checked)
  }
}

const todolistReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_DATA:
      return { 
        ...state,
        list: action.payload,
        isCheck: action.payload.every((item) => item.checked)
      };
    case ADD_TODO: 
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    case REMOVE_TODO: 
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      }
    case EDIT_TODO: 
      return {
        ...state,
        list: editTodo(state.list, action.payload.id, action.payload.text)
      }
    case CHECK_TODO: 
    const {list, isCheck} = checkTodo(state, action.payload);
      return {
        ...state,
        list,
        isCheck
      }
    case CHECK_ALL_TODO: 
      return {
        ...state,
        list: state.list.map((item) => ({ ...item, checked: !state.isCheck})),
        isCheck: !state.isCheck
      }
    case CLEAR_LIST_TODO: 
      return {
        ...state,
        list: state.list.filter((item) => !item.checked),
        isCheck: false
      }
    case SET_FILTER: 
      return {
        ...state,
        status: action.payload
      }
    default:
      return state;
  }
}

export default todolistReducer;

