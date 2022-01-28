import React, { useState, useEffect } from "react";
import "./ToDoItem.scss";
import { Form } from "react-bootstrap";
import { connect } from 'react-redux'
import { removeTodo, checkTodo, editTodo } from '../../actions/actionCreators';
import { useMutation } from "@apollo/client";
import { DELETE_TODO, COMPLITED_TODO, CHANGE_TODO } from '../../GraphQL/Mutation';

const ToDoItem = ({ item, removeTodo, checkTodo, editTodo }) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(item.name);
    const [ deleteTodo, {data, error: errorDelete} ] = useMutation(DELETE_TODO);
    const [ completedTodo, {error: errorCompleted} ] = useMutation(COMPLITED_TODO);
    const [ changeTodo, {error: errorChange} ] = useMutation(CHANGE_TODO);

    useEffect(() => {
        if(data) { removeTodo(item.id) };
        if (errorDelete | errorCompleted | errorChange) return `Error! ${errorDelete.message | errorCompleted.message | errorChange.message}`;
    }, [data]);  

    const handelItem = (e) => {
        e.preventDefault();
        if (value) { 
            changeTodo({ variables: { 
                id: item.id, 
                input: {name: value}} 
            });
            editTodo(item.id, value); 
        };
        setEdit(false);
    };

    return (
        <li className='ToDoItem'>
            <input
                className={item.completed ? "ToDoItem__checkbox checked" : "ToDoItem__checkbox"}
                type='checkbox'
                onClick={() =>    
                    completedTodo({ variables: { 
                        id: item.id, 
                        input: { 
                            name: value, 
                            completed: !item.completed 
                        }} 
                    })
                }
            />
            <label />
            {edit ? (
                <Form onSubmit={handelItem} className='ToDoItem__edit'>
                    <input autoFocus={true} value={value} onChange={(e) => setValue(e.target.value)} onBlur={handelItem} />
                </Form>
            ) : (
                <label
                    onDoubleClick={() => setEdit(true)}
                    className={item.completed ? "ToDoItem__text checked" : "ToDoItem__text"}
                >
                    {item.name}
                </label>
            )}
            <button className='ToDoItem__btn' onClick={() => deleteTodo({variables: { id: item.id }})}></button>
        </li>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        removeTodo: (id) => dispatch(removeTodo(id)),
        checkTodo: (id) => dispatch(checkTodo(id)),
        editTodo: (id, name) => dispatch(editTodo(id, name))
    }
}

export default connect(null, mapDispatchToProps)(ToDoItem);
