import React from 'react'
import { Form } from 'react-bootstrap'
import "./ToDoForm.scss"

const ToDoForm = ({value, handelSubmit, handelChange, handelClick, checkAll}) => {
    return (
        <Form 
            className='ToDoForm' 
            onSubmit={handelSubmit} >
            <label 
                className='ToDoForm__label'
                onClick={checkAll}/>
            <input
                className='ToDoForm__input' 
                type='text' 
                placeholder='What needs to be done?'
                value={value}
                onChange={handelChange}/>
            <button
                type='submit' 
                className="ToDoForm__button" 
                onClick={handelClick}>
                Add 
            </button>
        </Form>
    )
}

export default ToDoForm

