import React, { useState } from "react";
import "./ToDoItem.scss";
import { Form } from "react-bootstrap";
import { connect } from 'react-redux'
import { removeTodo, checkTodo, editTodo } from '../../actions/actionCreators';

const ToDoItem = ({ list, item, removeTodo, checkTodo, editTodo }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(item.text);

    const handelItem = (e) => {
        e.preventDefault();
        if(value){editTodo(item._id, value);}
        setEdit(false);
    };

    return (
        <li className='ToDoItem'>
            <input
                className={item.checked ? "ToDoItem__checkbox checked" : "ToDoItem__checkbox"}
                type='checkbox'
                onClick={() => checkTodo(list, item._id)}
            />
            <label />
            {edit ? (
                <Form onSubmit={handelItem} className='ToDoItem__edit'>
                    <input autoFocus={true} value={value} onChange={(e) => setValue(e.target.value)} onBlur={handelItem} />
                </Form>
            ) : (
                <label
                    onDoubleClick={() => setEdit(true)}
                    className={item.checked ? "ToDoItem__text checked" : "ToDoItem__text"}
                >
                    {item.text}
                </label>
            )}
            <button className='ToDoItem__btn' onClick={() => removeTodo(item._id)}></button>
        </li>
    );
};

const mapStateToProps = ({todolistReducer}) => {
    const { list } = todolistReducer
    return {list: list}
}
  
const mapDispatchToProps = dispatch => {
    return {
        removeTodo: (id) => dispatch(removeTodo(id)),
        checkTodo: (list, id) => dispatch(checkTodo(list, id)),
        editTodo: (id, text) => dispatch(editTodo(id, text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItem);
