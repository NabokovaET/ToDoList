import React from 'react'
import "./ToDoItem.scss"

const ToDoItem = ({index, item, deleteItem, checkItem}) => {

    return (
        <li className='ToDoItem'>
            <input
                className='ToDoItem__checkbox'
                type="checkbox" 
                onClick={() => checkItem(index)}
                />
            <label/>
            <label className='ToDoItem__text'>
                {item}
            </label>
            <button
                className='ToDoItem__btn'
                onClick={() => deleteItem(index)}
            >
            </button>
        </li>
    )
}

export default ToDoItem



