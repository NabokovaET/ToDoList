import React from 'react'
import "./ToDoItem.scss"

const ToDoItem = ({checked, item, deleteItem, checkItem}) => {
    
    return (
        <li className='ToDoItem'>
            <input
                className='ToDoItem__checkbox'
                type="checkbox" 
                onClick={() => checkItem(item.id)}/>
            <label/>
            <label className={checked ? 'ToDoItem__text checked' : 'ToDoItem__text'}>
                {item.text}
            </label>
            <button
                className='ToDoItem__btn'
                onClick={() => deleteItem(item.id)}>
            </button>
        </li>
    )
}

export default ToDoItem



