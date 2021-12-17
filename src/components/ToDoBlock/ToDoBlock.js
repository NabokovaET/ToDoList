import React, { Component } from "react";
import "./ToDoBlock.scss";
import { nanoid } from "nanoid";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";
import ToDoFooter from "../ToDoFooter/ToDoFooter";

class ToDoBlock extends Component {
    state = {
        list: [],
        status: "All",
        isCheck: false,
    };

    handelSubmitItem = (id, value) => {
        const { list } = this.state;
        let newList = list.map((item) => {
            if (item.id === id) {
                return { ...item, text: value };
            }
            return item;
        });
        this.setState({ list: newList });
    };

    addItem = (value) => {
        const { list } = this.state;

        if (value.trim()) this.setState({ list: [{ id: nanoid(7), text: value, checked: false }, ...list] });
    };

    deleteItem = (index) => {
        this.setState({
            list: this.state.list.filter((item) => item.id !== index),
        });
    };

    checkItem = (index) => {
        const { list } = this.state;

        let checkList = list.map((item) => {
            if (item.id === index) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });

        this.setState({
            list: checkList,
            isCheck: checkList.every((item) => item.checked),
        });
    };

    checkAll = () => {
        const { list, isCheck } = this.state;

        this.setState({
            list: list.map((item) => ({ ...item, checked: !isCheck })),
            isCheck: !isCheck,
        });
    };

    setFilter = (status) => {
        this.setState({ status });
    };

    updateList = () => {
        const { list, status } = this.state;

        switch (status) {
            case "Active":
                let activeList = list.filter((item) => !item.checked);
                return activeList;
            case "Completed":
                let completedList = list.filter((item) => item.checked);
                return completedList;
            default:
                return list;
        }
    };

    clearList = () => {
        this.setState({
            list: this.state.list.filter((item) => !item.checked),
            isCheck: false,
        });
    };

    render() {
        const { list, status, isCheck } = this.state;
        const count = list.filter((item) => !item.checked).length;
        const completed = list.length > count;

        return (
            <div className='ToDoBlock'>
                <ToDoForm isCheck={isCheck} addItem={this.addItem} checkAll={this.checkAll} />
                <ToDoList
                    list={this.updateList()}
                    deleteItem={this.deleteItem}
                    checkItem={this.checkItem}
                    handelSubmitItem={this.handelSubmitItem}
                />
                <ToDoFooter
                    count={count}
                    status={status}
                    completed={completed}
                    setFilter={this.setFilter}
                    clearList={this.clearList}
                />
            </div>
        );
    }
}

export default ToDoBlock;
