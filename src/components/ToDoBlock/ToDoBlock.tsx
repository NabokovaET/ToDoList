import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import { ALL_TODO } from '../../GraphQL/Queries';
import { useAppSelector, useAppDispatch } from '../../hooksRedux';
import { getData } from '../../slices/todoSlice';
import ToDoForm from '../ToDoForm/ToDoForm';
import ToDoList from '../ToDoList/ToDoList';
import ToDoFooter from '../ToDoFooter/ToDoFooter';
import './ToDoBlock.scss';

const ToDoBlock = () => {
    const list = useAppSelector((state) => state.todos.list);
    const status = useAppSelector((state) => state.todos.status);
    const dispatch = useAppDispatch();

    const access_token: any = localStorage.getItem('token');
    const decode: any = jwt_decode(access_token);
    const userId: string = decode._id;

    const { data } = useQuery(ALL_TODO, { variables: { userId, page: 1, size: 5 } });

    useEffect(() => {
        if (data) {
            dispatch(getData({ data, userId }));
        }
    }, [data]);

    const updateList = () => {
        switch (status) {
            case 'Active':
                let activeList = list.filter((item) => !item.completed);
                return activeList;
            case 'Completed':
                let completedList = list.filter((item) => item.completed);
                return completedList;
            default:
                return list;
        }
    };

    const count = list.filter((item) => !item.completed).length;
    const completed = list.length > count;

    return (
        <>
            <h1 className='App__title'>todos</h1>
            <div className='ToDoBlock'>
                <ToDoForm />
                <ToDoList list={updateList()} />
                <ToDoFooter count={count} completed={completed} />
            </div>
        </>
    );
};

export default ToDoBlock;
