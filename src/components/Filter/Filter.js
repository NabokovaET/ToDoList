import React from 'react'
import "./Filter.scss"

const Filter = ({ active, setFilter }) => {
    return (
        <div className='Filter'>
            <button
                className={active ? "Filter__button" : "Filter__button active"}
                onClick={setFilter}>
                All
            </button> 
            <button
                className={active ? "Filter__button" : "Filter__button active"}
                onClick={setFilter}>
                Active
            </button> 
            <button
                className={active ? "Filter__button" : "Filter__button active"}
                onClick={setFilter}>
                Completed
            </button> 
        </div>
    )
}

export default Filter
