import React from 'react'
import Filter from '../Filter/Filter'
import "./ToDoFooter.scss"

const ToDoFooter = ({count, active, completed, setFilter, clearList}) => {
    return (
        <div className='ToDoFooter'>
            <div className='ToDoFooter__notification'>
                {count} items left
            </div>
            <Filter 
                setFilter={setFilter}
                active={active}/>
            <button
                className={completed ? "ToDoFooter__button active" : "ToDoFooter__button"}
                onClick={clearList}>
                Clear completed
            </button>
        </div>
    )
}

export default ToDoFooter
