import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, COMPLETED_TODO, CHANGE_TODO } from '../../GraphQL/Mutation';
import { useAppDispatch } from '../../hooksRedux';
import { removeTodo, editTodo, checkTodo } from '../../slices/todoSlice';
import { ToDo } from '../../Interfaces/interface';
import './ToDoItem.scss';

const ToDoItem = ({ item }: { item: ToDo }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState<string>(item.name);
    const [deleteTodo, { data }] = useMutation(DELETE_TODO);
    const [completedTodo] = useMutation(COMPLETED_TODO);
    const [changeTodo] = useMutation(CHANGE_TODO);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(removeTodo(item.id));
        }
    }, [data]);

    const handelItem = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>): void => {
        e.preventDefault();
        if (value) {
            changeTodo({
                variables: {
                    id: item.id,
                    input: { name: value },
                },
            });
            dispatch(editTodo({ id: item.id, value: value }));
        }
        setEdit(false);
    };

    return (
        <li className='ToDoItem'>
            <input
                className={item.completed ? 'ToDoItem__checkbox checked' : 'ToDoItem__checkbox'}
                type='checkbox'
                onClick={() => {
                    completedTodo({
                        variables: {
                            id: item.id,
                            input: {
                                name: value,
                                completed: !item.completed,
                            },
                        },
                    });
                    dispatch(checkTodo(item.id));
                }}
            />
            <label />
            {edit ? (
                <Form onSubmit={handelItem} className='ToDoItem__edit'>
                    <input
                        autoFocus={true}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handelItem}
                    />
                </Form>
            ) : (
                <label
                    onDoubleClick={() => setEdit(true)}
                    className={item.completed ? 'ToDoItem__text checked' : 'ToDoItem__text'}>
                    {item.name}
                </label>
            )}
            <button className='ToDoItem__btn' onClick={() => deleteTodo({ variables: { id: item.id } })}></button>
        </li>
    );
};

export default ToDoItem;
