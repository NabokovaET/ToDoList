import React from 'react'
import ToDoItem from '../ToDoItem/ToDoItem'
import "./ToDoList.scss"

const ToDoList = ({list, checked, deleteItem, checkItem}) => {

    const items = list.map((item) => {
        return (
            <ToDoItem
                key={item.id}
                item={item}
                checked={checked}
                deleteItem={deleteItem}
                checkItem={checkItem}
            />
        )
    })
 
    return (
        <ul className='ToDoList'>
            {items}
        </ul>
    )
}

export default ToDoList
