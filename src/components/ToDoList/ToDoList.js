import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";

const ToDoList = ({ list, handelSubmitItem }) => {
    const items = list.map((item) => {
        return (
            <ToDoItem
                key={item._id}
                item={item}
                handelSubmitItem={handelSubmitItem}
            />
        );
    });

    return <ul className='ToDoList'>{items}</ul>;
};


export default ToDoList;
