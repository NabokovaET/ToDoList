import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COMPLETED_TODO } from '../../GraphQL/Mutation';
import { useAppSelector, useAppDispatch } from '../../hooksRedux';
import { clearListTodo } from '../../slices/todoSlice';
import Filter from '../Filter/Filter';
import './ToDoFooter.scss';

const ToDoFooter = ({ count, completed }: { count: number; completed: boolean }) => {
    const userId = useAppSelector((state) => state.todos.userId);
    const dispatch = useAppDispatch();

    const [deleteComplitedTodo, { data }] = useMutation(DELETE_COMPLETED_TODO);

    useEffect(() => {
        if (data) {
            dispatch(clearListTodo());
        }
    }, [data]);

    return (
        <div className='ToDoFooter'>
            <div className='ToDoFooter__notification'>{count} items left</div>
            <Filter />
            <button
                className={completed ? 'ToDoFooter__button active' : 'ToDoFooter__button'}
                onClick={() => deleteComplitedTodo({ variables: { userId: userId } })}>
                Clear completed
            </button>
        </div>
    );
};

export default ToDoFooter;
