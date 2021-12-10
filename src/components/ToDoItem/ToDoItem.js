import React from 'react'
import { ListGroup, Form} from 'react-bootstrap'
import "./ToDoItem.scss"
import close from "../../img/close.png"

const ToDoItem = ({list, item, cheked}) => {

    const itemDelete = () => {
        let deleteList = list.filter(elem => elem !== item);
        console.log(deleteList)
    }

    return (
        <div className='ToDoItem'>
            <Form.Check 
                type="checkbox" 
                // checked = { cheked ? true : false }
                />
            <ListGroup.Item className='ToDoItem__text'>
                {item}
            </ListGroup.Item>
            <button
                className='ToDoItem__btn'
                onClick={itemDelete}
            >
                <img src={close} alt='delete'/>
            </button>
        </div>
    )
}

export default ToDoItem



