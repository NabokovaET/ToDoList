import React, { useState, useEffect } from "react";
import "./ToDoItem.scss";
import { Form } from "react-bootstrap";
import { connect } from 'react-redux'
import { removeTodo, checkTodo, editTodo } from '../../actions/actionCreators';
import { useMutation } from "@apollo/client";
import { DELETE_TODO, COMPLETED_TODO, CHANGE_TODO } from '../../GraphQL/Mutation';

const ToDoItem = ({ item, removeTodo, checkTodo, editTodo } : { item: any, removeTodo: Function, checkTodo: Function, editTodo: Function }) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(item.name);
    const [ deleteTodo, {data} ] = useMutation(DELETE_TODO);
    const [ completedTodo ] = useMutation(COMPLETED_TODO);
    const [ changeTodo ] = useMutation(CHANGE_TODO);

    useEffect(() => {
        if(data) { removeTodo(item.id) };
        // if (errorDelete | errorCompleted | errorChange) return `Error! ${errorDelete.message | errorCompleted.message | errorChange.message}`;
    }, [data]);  

    const handelItem = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>):void  => {
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
                    <input 
                        autoFocus={true} value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                        onBlur={handelItem} 
                    />
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

const mapDispatchToProps = (dispatch: Function) => {
    return {
        removeTodo: (id: number) => dispatch(removeTodo(id)),
        checkTodo: (id: number) => dispatch(checkTodo(id)),
        editTodo: (id: number, name: string) => dispatch(editTodo(id, name))
    }
}

export default connect(null, mapDispatchToProps)(ToDoItem);
