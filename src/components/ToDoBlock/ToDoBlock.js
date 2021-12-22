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
        fetch('http://localhost:1234/todos')
            .then(response => response.json())
            .then(data => this.setState({ list: data.reverse() }))
            .catch(err => {console.log(err)})
    }

    fetchWrap = (url, method, body) => {
        return fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(body)
        })
    }

    handelSubmitItem = (id, value) => {
        const { list } = this.state;
        if(value) {
            this.fetchWrap(`http://localhost:1234/todos/${id}`, 'PUT', {text: value})
            .then(() => {
                let newList = list.map((item) => {
                    if (item._id === id) {
                        return {...item, text: value};
                    }
                    return item;
                })
                this.setState({list: newList});
            })
            .catch(err => {console.log(err)})
        }

    };

    addItem = (value) => {
        if (value.trim()) {
            this.fetchWrap('http://localhost:1234/todos', 'POST', {text: value})
                .then(response => response.json())
                .then(item => this.setState({list: [item, ...this.state.list]}))
                .catch(err => {console.log(err)})
        }
    };

    deleteItem = (id) => {
        this.fetchWrap(`http://localhost:1234/todos/${id}`, 'DELETE')
            .then(response => response.json())
            .then(itemDelete => this.setState({list: this.state.list.filter((item) => item._id !== itemDelete._id)}))
            .catch(err => {console.log(err)})
    };

    checkItem = (id) => {    
        const { list } = this.state;
        const checkItem = list.find(item => item._id === id);

        this.fetchWrap(`http://localhost:1234/todos/${id}`, 'PUT', {checked: !checkItem.checked})
            .then(() => {
                const checkList = list.map(item => {
                    if (item._id === id) {
                        return {...item, checked: !item.checked}
                    }
                    return item;
                })
                this.setState({
                    list: checkList,
                    isCheck: checkList.every((item) => item.checked)
                });
            })
            .catch(err => {console.log(err)})
    };

    checkAll = () => {
        const { list, isCheck } = this.state;

        this.fetchWrap(`http://localhost:1234/todos`, 'PUT', {checked: !isCheck})
            .then(() => {
                this.setState({
                    list: list.map((item) => ({ ...item, checked: !isCheck })),
                    isCheck: !isCheck,
                });
            })
            .catch(err => {console.log(err)})
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
        this.fetchWrap(`http://localhost:1234/todos`, 'DELETE')
            .then(() => this.setState({
                list: this.state.list.filter((item) => !item.checked),
                isCheck: false,
            }))
            .catch(err => {console.log(err)})
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
