import React, { Component } from "react";
import "./ToDoBlock.scss";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";
import ToDoFooter from "../ToDoFooter/ToDoFooter";

class ToDoBlock extends Component {
    state = {
        list: [],
        status: "All",
        isCheck: false,
    };

    componentDidMount() {
        fetch('http://localhost:1234/items')
            .then(response => response.json())
            .then(data => this.setState({ list: data }))
            .catch(err => {console.log(err)})
    }

    handelSubmitItem = (id, value) => {
        const { list } = this.state;
        let newList = list.map((item) => {
            if (item.id === id) {
                return {...item, text: value};
            }
            return item;
        });
        this.setState({ list: newList });
    };

    addItem = (value) => {
        if (value.trim()) {
            fetch('http://localhost:1234/items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({text: value})
            })
                .then(response => response.json())
                .then(item => this.setState({list: [item, ...this.state.list]}))
                .catch(err => {console.log(err)})
        }
    };

    deleteItem = (index) => {
        fetch(`http://localhost:1234/items/${index}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(itemDelete => this.setState({list: this.state.list.filter((item) => item._id !== itemDelete._id)}))
            .catch(err => {console.log(err)})
    };

    checkItem = (index) => {
        const { list } = this.state;

        let checkList = list.map((item) => {
            if (item._id === index) {
                fetch(`http://localhost:1234/items/${index}`, {
                    method: 'PUT',
                    body: JSON.stringify({checked: !item.checked})
                })
                    .then(response => response.json())
                    .then(itemUpdate => this.setState({list: [itemUpdate, ...list]}))
                    .catch(err => {console.log(err)})
                    return {...item, checked: !item.checked}
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
