
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
  GOOGLE_ACCOUNT } from './types';
import { ToDoAction } from '../Interfaces/interface';

// const token = localStorage.getItem('token');
const url = 'https://todoapp-nest-backend.herokuapp.com/todos';

// const fetchWrap = (url, method, body) => {
//    return fetch(url, {
//     method: method,
//     headers: {'Content-Type': 'application/json;charset=utf-8', 'Authorization': `Bearer ${token}`},
//     body: JSON.stringify(body)
//   })
//   .then(response => {
//     if (response.status === 401) {
//       localStorage.removeItem('token');
//       window.location = ('/');
//     } else return response.json();
//   })
// }

//-------------ActionsGraphQl-----------------//

export const getData = (data, userId) => {
  return dispatch => {dispatch({type: GET_DATA, payload: {list: data.getTodoList, userId}})}
}

export const addTodo = (data) => {
  return dispatch => {dispatch({type: ADD_TODO, payload: data.addTodo})}
}

export const removeTodo = (id) => {
  return dispatch => {dispatch({type: REMOVE_TODO, payload: id})}
}

export const checkTodo = (id) => {
  return dispatch => {dispatch({type: CHECK_TODO, payload: id})}
}

export const checkAllTodo = () => {
  return dispatch => {dispatch({type: CHECK_ALL_TODO})}
}

export const editTodo = (id, name) => {
  return dispatch => {dispatch({type: EDIT_TODO, payload: {id, name}})}
}

export const clearListTodo = () => {
  return dispatch => {dispatch({type: CLEAR_LIST_TODO})}
}

export const setFilter = (status) => {
  return {
    type: SET_FILTER,
    payload: status
  }
}

//-------------ActionsHeroku-----------------//

export const userLogin = (username, password) => {
  return dispatch => {
    return fetch(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(response => {
      if (response.access_token !== undefined) {
        localStorage.setItem('token', response.access_token)
        window.location = ('/todo');
        dispatch({type: USER_LOGIN, payload: true})
      } else dispatch({type: USER_LOGIN, payload: false})
    })

  }
}

export const userRegister = (username, password) => {
  return dispatch => {
    // return fetchWrap('http://localhost:1234/todos/register', 'POST', {username: username, password: password})
    return fetch(`${url}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(response => {
      if (response.access_token !== undefined) {
        localStorage.setItem('token', response.access_token)
        window.location = ('/todo');
        dispatch({type: USER_REGISTER, payload: true})
      } else dispatch({type: USER_REGISTER, payload: false})
    })
  }
}

export const  googleAccount = () => {
  return dispatch => {
    return fetch(`${url}/google`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    })
    .then(response => response.json())
    .then(response => {
      if (response.access_token !== undefined) {
        localStorage.setItem('token', response.access_token)
        window.location = ('/todo');
        dispatch({type: GOOGLE_ACCOUNT, payload: true})
      } else dispatch({type: GOOGLE_ACCOUNT, payload: false})
    })
  }
}



  

