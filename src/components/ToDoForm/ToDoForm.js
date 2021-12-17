import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./ToDoForm.scss";

const ToDoForm = ({ addItem, checkAll, isCheck }) => {
    const [value, setValue] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        setValue("");
        addItem(value);
    };

    return (
        <Form className='ToDoForm' onSubmit={handelSubmit}>
            <label className={isCheck ? "ToDoForm__label check" : "ToDoForm__label"} onClick={checkAll} />
            <input
                className='ToDoForm__input'
                type='text'
                placeholder='What needs to be done?'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Form>
    );
};

export default ToDoForm;
