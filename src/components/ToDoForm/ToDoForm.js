import React from 'react'
import { Form } from 'react-bootstrap'
import "./ToDoForm.scss"

const ToDoForm = ({value, handelSubmit, handelChange, checkAll}) => {
    return (
        <Form 
            className='ToDoForm' 
            onSubmit={handelSubmit}>
            <label 
                className='ToDoForm__label'
                onClick={() => checkAll(true)}/>
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

