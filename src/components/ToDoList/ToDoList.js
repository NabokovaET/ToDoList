import React from 'react'
import { ListGroup } from 'react-bootstrap'
import ToDoItem from '../ToDoItem/ToDoItem'
import "./ToDoList.scss"

const ToDoList = ({list, cheked, itemDelete}) => {

    const items = list.map((item, i) => {
        return (
            <ToDoItem
                key={i}
                list={list}
                item={item}
                cheked={cheked}
                itemDelete={itemDelete}
            />
        )
    })

    return (
        <ListGroup className='ToDoList'>
            {items}
        </ListGroup>
    )
}

export default ToDoList
