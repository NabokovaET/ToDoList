import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, COMPLETED_TODO, CHANGE_TODO } from '../../GraphQL/Mutation';
import { removeTodo, editTodo } from '../../actions/actionCreators';
import { ToDoItemProps } from '../../Interfaces/interface';
import './ToDoItem.scss';

const ToDoItem = ({ item, removeTodo, editTodo }: ToDoItemProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState<string>(item.name);
    const [deleteTodo, { data }] = useMutation(DELETE_TODO);
    const [completedTodo] = useMutation(COMPLETED_TODO);
    const [changeTodo] = useMutation(CHANGE_TODO);

    useEffect(() => {
        if (data) {
            removeTodo(item.id);
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
            editTodo(item.id, value);
        }
        setEdit(false);
    };

    return (
        <li className='ToDoItem'>
            <input
                className={item.completed ? 'ToDoItem__checkbox checked' : 'ToDoItem__checkbox'}
                type='checkbox'
                onClick={() =>
                    completedTodo({
                        variables: {
                            id: item.id,
                            input: {
                                name: value,
                                completed: !item.completed,
                            },
                        },
                    })
                }
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

const mapDispatchToProps = (dispatch: Function) => {
    return {
        removeTodo: (id: number) => dispatch(removeTodo(id)),
        editTodo: (id: number, name: string) => dispatch(editTodo(id, name)),
    };
};

export default connect(null, mapDispatchToProps)(ToDoItem);
