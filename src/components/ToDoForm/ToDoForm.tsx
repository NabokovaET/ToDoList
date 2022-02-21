import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_TODO, COMPLETED_All_TODO } from '../../GraphQL/Mutation';
import { useAppSelector, useAppDispatch } from '../../hooksRedux';
import { addTodo, checkAllTodo } from '../../slices/todoSlice';
import './ToDoForm.scss';

const ToDoForm = () => {
    const [value, setValue] = useState('');
    const [newTodo, { data }] = useMutation(ADD_TODO);
    const [completedAllTodo] = useMutation(COMPLETED_All_TODO);

    const isCheck = useAppSelector((state) => state.todos.isCheck);
    const userId = useAppSelector((state) => state.todos.userId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(addTodo(data.addTodo));
        }
    }, [data]);

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setValue('');
        if (value.trim()) {
            newTodo({
                variables: {
                    input: { name: value },
                    userId: userId,
                },
            });
        }
    };

    return (
        <Form className='ToDoForm' onSubmit={handelSubmit}>
            <label
                className={isCheck ? 'ToDoForm__label check' : 'ToDoForm__label'}
                onClick={() => {
                    completedAllTodo({
                        variables: {
                            allCompleted: !isCheck,
                            userId: userId,
                        },
                    });
                    dispatch(checkAllTodo());
                }}
            />
            <input
                className='ToDoForm__input'
                type='text'
                placeholder='What needs to be done?'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Form>
    );
};

export default ToDoForm;
