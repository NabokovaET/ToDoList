import React, { useState } from "react";
import { connect } from 'react-redux'
import { Form } from "react-bootstrap";
import "./ToDoForm.scss";
import { addTodo, checkAllTodo } from '../../actions/actionCreators';

const ToDoForm = ({ addTodo, checkAllTodo, isCheck }) => {
    const [value, setValue] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        setValue("");
        if (value.trim()) {
            addTodo(value)
        };
    };

    return (
        <Form className='ToDoForm' onSubmit={handelSubmit}>
            <label className={isCheck ? "ToDoForm__label check" : "ToDoForm__label"} onClick={() => checkAllTodo(isCheck)} />
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

const mapStateToProps = ({todolistReducer}) => {
    const { isCheck } = todolistReducer;
    return { isCheck }
}
  
const mapDispatchToProps = dispatch => {
    return {
        addTodo: (value) => dispatch(addTodo(value)),
        checkAllTodo: (isCheck) => dispatch(checkAllTodo(isCheck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);
