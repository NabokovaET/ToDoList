import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";

const ToDoList = ({ list, deleteItem, checkItem, handelSubmitItem }) => {
    const items = list.map((item) => {
        return (
            <ToDoItem
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                checkItem={checkItem}
                handelSubmitItem={handelSubmitItem}
            />
        );
    });

    return <ul className='ToDoList'>{items}</ul>;
};

export default ToDoList;
