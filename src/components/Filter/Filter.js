import React from "react";
import "./Filter.scss";

const Filter = ({ setFilter, status }) => {
    const filterList = [{ name: "All" }, { name: "Active" }, { name: "Completed" }];

    const filterItem = filterList.map((item) => {
        return (
            <button
                key={item.name}
                className={item.name === status ? "Filter__button active" : "Filter__button"}
                onClick={() => setFilter(item.name)}
            >
                {item.name}
            </button>
        );
    });

    return <div className='Filter'>{filterItem}</div>;
};

export default Filter;
