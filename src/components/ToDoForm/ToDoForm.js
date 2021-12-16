import React from 'react'
import { Form } from 'react-bootstrap'
import "./ToDoForm.scss"

const ToDoForm = ({value, handelSubmit, handelChange, checkAll, isCheck}) => {

    return (
        <Form 
            className='ToDoForm' 
            onSubmit={handelSubmit}>
            <label 
                className={isCheck ? 'ToDoForm__label check' : 'ToDoForm__label'}
                onClick={checkAll}/>
            <input
                className='ToDoForm__input' 
                type='text' 
                placeholder='What needs to be done?'
                value={value}
                onChange={handelChange}/>
        </Form>
    )
}

export default ToDoForm

