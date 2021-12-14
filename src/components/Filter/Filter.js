import React from 'react'
import "./Filter.scss"

const Filter = ({ active, setFilter }) => {
    return (
        <div className='Filter'>
            <button
                className={active === 'all' ? "Filter__button active" : "Filter__button"}
                onClick={() => setFilter('all')}>
                All
            </button> 
            <button
                className={active === 'active' ? "Filter__button active" : "Filter__button"}
                onClick={() => setFilter('active')}>
                Active
            </button> 
            <button
                className={active === 'completed' ? "Filter__button active" : "Filter__button"}
                onClick={() => setFilter('completed')}>
                Completed
            </button> 
        </div>
    )
}

export default Filter
