import React from 'react'
import { Button, Form } from 'react-bootstrap'
import "./ToDoForm.scss"

const ToDoForm = ({value, handelSubmit, handelChange, handelClick}) => {
    return (
        <Form 
            className='ToDoForm' 
            onSubmit={handelSubmit} >
            <Form.Control 
                className='ToDoForm__input' 
                type='text' 
                placeholder='What needs to be done?'
                value={value}
                onChange={handelChange}/>
            <Button 
                type='submit' 
                className="ToDoForm__button mb-3" 
                onClick={handelClick}>
                Add 
            </Button>
        </Form>
    )
}

export default ToDoForm

