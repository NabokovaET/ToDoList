import { USER_LOGIN, USER_REGISTER, GOOGLE_ACCOUNT } from './types';

const url = 'https://todoapp-nest-backend.herokuapp.com/todos';

export const userLogin = (username, password) => {
    return (dispatch) => {
        return fetch(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.access_token !== undefined) {
                    localStorage.setItem('token', response.access_token);
                    window.location = '/todo';
                    dispatch({ type: USER_LOGIN, payload: true });
                } else dispatch({ type: USER_LOGIN, payload: false });
            });
    };
};

export const userRegister = (username, password) => {
    return (dispatch) => {
        return fetch(`${url}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.access_token !== undefined) {
                    localStorage.setItem('token', response.access_token);
                    window.location = '/todo';
                    dispatch({ type: USER_REGISTER, payload: true });
                } else dispatch({ type: USER_REGISTER, payload: false });
            });
    };
};

export const googleAccount = () => {
    return (dispatch) => {
        return fetch(`${url}/google`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.access_token !== undefined) {
                    localStorage.setItem('token', response.access_token);
                    window.location = '/todo';
                    dispatch({ type: GOOGLE_ACCOUNT, payload: true });
                } else dispatch({ type: GOOGLE_ACCOUNT, payload: false });
            });
    };
};
