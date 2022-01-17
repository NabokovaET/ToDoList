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
  USER_REGISTER } from './types'

const token = localStorage.getItem('token');



const fetchWrap = (url, method, body) => {
   return fetch(url, {
    method: method,
    headers: {'Content-Type': 'application/json;charset=utf-8', 'Authorization': `Bearer ${token}`},
    body: JSON.stringify(body)
  })
  // .then(response => response.json())
  .then(response => {
    if(response.status === 401){
      localStorage.removeItem('token')
      window.location = ('/');
      // return response.json()
    } 
    else return response.json()
  })
}

export const getData = () => {
  const page = 1
  const size = 5
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos?page=${page}&size=${size}`)
    .then(data => {
      const length = data.length
      dispatch({type: GET_DATA, payload: data.reverse().splice(1, length)})
    })
  }
}

export const addTodo = (name) => {
  return dispatch => {
    return fetchWrap('http://localhost:1234/todos', 'POST', {name: name})
      .then(item => dispatch({type: ADD_TODO, payload: item}))
  }
}

export const removeTodo = (id) => {
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos/${id}`, 'DELETE')
      .then(() => dispatch({type: REMOVE_TODO, payload: id}))
  }
}

export const checkTodo = (list, id) => {
  const checkItem = list.find(item => item._id === id);
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos/${id}`, 'PUT', {completed: !checkItem.completed})
      .then(() => dispatch({type: CHECK_TODO, payload: id}))
  }
}

export const checkAllTodo = (isCheck) => {
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos`, 'PUT', {allCompleted: !isCheck})
      .then(() => dispatch({type: CHECK_ALL_TODO}))
  }
}

export const editTodo = (id, name) => {
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos/${id}`, 'PUT', {name: name})
      .then(() => dispatch({type: EDIT_TODO, payload: {id, name}}))
  }
}

export const clearListTodo = () => {
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos`, 'DELETE')
      .then(() => dispatch({type: CLEAR_LIST_TODO}))
  }
}
export const setFilter = (status) => {
  return {
    type: SET_FILTER,
    payload: status
  }
}

export const userLogin = (username, password) => {
  return dispatch => {
    // return fetchWrap('http://localhost:1234/todos/login', 'POST', {username: username, password: password})
    return fetch('http://localhost:1234/todos/login', {
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
    return fetch('http://localhost:1234/todos/register', {
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

  

