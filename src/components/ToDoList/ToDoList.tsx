import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import { ToDo } from '../../Interfaces/interface';

const ToDoList = ({ list } : { list: ToDo[] }) => {

    const items = list.map((item) => {
        return (
            <ToDoItem
                key={item.id}
                item={item}
            />
        );
    });

    return <ul className='ToDoList'>{items}</ul>;
};


export default ToDoList;
