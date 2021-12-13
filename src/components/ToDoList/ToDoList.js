import React from 'react'
import ToDoItem from '../ToDoItem/ToDoItem'
import "./ToDoList.scss"

const ToDoList = ({list, deleteItem, checkItem}) => {

    const items = list.map((item, index) => {
        return (
            <ToDoItem
                key={index}
                index={index}
                item={item.text}
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
