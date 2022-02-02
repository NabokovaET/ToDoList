import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Form } from "react-bootstrap";
import "./ToDoForm.scss";
import { addTodo, checkAllTodo } from '../../actions/actionCreators';
import { useMutation } from "@apollo/client";
import { ADD_TODO, COMPLETED_All_TODO } from '../../GraphQL/Mutation';


const ToDoForm = ({ addTodo, checkAllTodo, isCheck, userId } : { addTodo: Function, checkAllTodo: Function, isCheck: boolean, userId: string}) => {

    console.log(userId)
    const [ value, setValue ] = useState("");
    const [ newTodo, data ] = useMutation(ADD_TODO);
    const [ completedAllTodo ] = useMutation(COMPLETED_All_TODO);

    useEffect(() => {
        if(data) {addTodo(data)};
    }, [data]);  

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
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

const mapStateToProps = ({todolistReducer} : {todolistReducer: any}) => {
    const { isCheck, userId } = todolistReducer;
    return { isCheck, userId }
}
  
const mapDispatchToProps = (dispatch: Function) => {
    return {
        addTodo: (value: any) => dispatch(addTodo(value)),
        checkAllTodo: (isCheck: boolean) => dispatch(checkAllTodo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);
