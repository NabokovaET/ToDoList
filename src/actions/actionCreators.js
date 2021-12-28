import { GET_DATA, ADD_TODO, REMOVE_TODO, CHECK_TODO, CHECK_ALL_TODO, SET_FILTER, EDIT_TODO, CLEAR_LIST_TODO } from './types'

const fetchWrap = (url, method, body) => {
  return fetch(url, {
      method: method,
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(body)
  }).then(response => response.json())
}

export const getData = () => {
  return dispatch => {
    return fetchWrap('http://localhost:1234/todos')
    .then(data => dispatch({type: GET_DATA, payload: data.reverse()}))
  }
}

export const addTodo = (text) => {
  return dispatch => {
    return fetchWrap('http://localhost:1234/todos', 'POST', {text: text})
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
    return fetchWrap(`http://localhost:1234/todos/${id}`, 'PUT', {checked: !checkItem.checked})
      .then(() => dispatch({type: CHECK_TODO, payload: id}))
  }
}

export const checkAllTodo = (isCheck) => {
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos`, 'PUT', {checked: !isCheck})
      .then(() => dispatch({type: CHECK_ALL_TODO}))
  }
}

export const editTodo = (id, text) => {
  return dispatch => {
    return fetchWrap(`http://localhost:1234/todos/${id}`, 'PUT', {text: text})
      .then(() => dispatch({type: EDIT_TODO, payload: {id, text}}))
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

  
