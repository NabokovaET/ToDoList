import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Form } from "react-bootstrap";
import "./ToDoForm.scss";
import { addTodo, checkAllTodo } from '../../actions/actionCreators';
import { useMutation } from "@apollo/client";
import { ADD_TODO, COMPLETED_All_TODO } from '../../GraphQL/Mutation';


const ToDoForm = ({ addTodo, checkAllTodo, isCheck, userId }) => {

    console.log(userId)
    const [ value, setValue ] = useState("");
    const [ newTodo, {data, errorAdd} ] = useMutation(ADD_TODO);
    const [ completedAllTodo, {error: errorCompleted} ] = useMutation(COMPLETED_All_TODO);

    useEffect(() => {
        if(data) {addTodo(data)};
        if (errorAdd | errorCompleted) return `Error! ${errorAdd.message | errorCompleted.message}`;
    }, [data]);  

    const handelSubmit = (e) => {
        e.preventDefault();
        setValue("");
        if (value.trim()) {
            newTodo({ 
                variables: { 
                    input: { name: value }, 
                    userId: userId 
                }
            });
        };
    };

    return (
        <Form className='ToDoForm' onSubmit={handelSubmit}>
            <label 
                className={isCheck ? "ToDoForm__label check" : "ToDoForm__label"} 
                onClick={() => completedAllTodo({ 
                    variables: { 
                        allCompleted: !isCheck, 
                        userId: userId 
                    }}) 
                }
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

const mapStateToProps = ({todolistReducer}) => {
    const { isCheck, userId } = todolistReducer;
    return { isCheck, userId }
}
  
const mapDispatchToProps = dispatch => {
    return {
        addTodo: (value) => dispatch(addTodo(value)),
        checkAllTodo: (isCheck) => dispatch(checkAllTodo(isCheck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);
