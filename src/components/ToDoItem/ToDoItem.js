import React, { useState } from 'react'
import "./ToDoItem.scss"
import { Form } from 'react-bootstrap'

const ToDoItem = ({item, deleteItem, checkItem, handelSubmitItem}) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(item.text);

    const handelItem = e => {
        e.preventDefault();
        handelSubmitItem(item.id, value)
        setEdit(false)
    }

    return (
        <li className='ToDoItem'>
            <input
                className={item.checked ? 'ToDoItem__checkbox checked' : 'ToDoItem__checkbox'}
                type="checkbox" 
                onClick={() => checkItem(item.id)}/>
            <label/>
            {
                edit 
                ? <Form 
                    onSubmit={handelItem}
                    className='ToDoItem__edit'>
                    <input 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}/>
                </Form>
                : <label 
                    onDoubleClick={() => setEdit(true)}
                    className={item.checked ? 'ToDoItem__text checked' : 'ToDoItem__text'}>
                    {item.text}
                </label>
            }
            <button
                className='ToDoItem__btn'
                onClick={() => deleteItem(item.id)}>
            </button>
        </li>
    )
}

export default ToDoItem



