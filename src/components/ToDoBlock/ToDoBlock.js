import React, {Component} from 'react'
import "./ToDoBlock.scss"
import { nanoid } from 'nanoid'
import ToDoForm from '../ToDoForm/ToDoForm'
import ToDoList from '../ToDoList/ToDoList'
import ToDoFooter from '../ToDoFooter/ToDoFooter'

class ToDoBlock extends Component {

    state = {
        value: '', 
        list: [],
        status: 'All',
        completed: false,
        isCheck: false
    }

    handelSubmit = e => {
        e.preventDefault();
        this.setState({value: ''});
        this.addItem();
    }
    handelSubmitItem = (id, value) => {
        const {list} = this.state;
        let updateItem = list.map(item => {
            if(item.id === id) {
                return {...item, text: value}
            }
            return item
        })
        this.setState({list: updateItem});
    }
    handelChange = e => {
        this.setState({value: e.target.value});
    }
    addItem = () => {
        const {value, list} = this.state;
        let newList = [...list];
        let incld = newList.includes(value);
        !incld 
            ? newList = [{id: nanoid(7), text: value, checked: false}, ...list] 
            : newList = [...list];
        this.setState({list: newList});
    }
    deleteItem = index => {
        const {list} = this.state;
        let deleteList = list.filter(item => item.id !== index);
        this.setState({list: deleteList});
    }
    checkItem = index => {
        const {list} = this.state;
        let checkList = list.map(item => {
            if(item.id === index) {
                return {...item, checked: !item.checked}
            }
            return item
        })
        this.setState({list: checkList});
        this.activeComleted(checkList);
    }
    checkAll = (isCheck) => {
        const {list} = this.state;

        let checkAll = list.map(item => {
            if(item.checked !== isCheck) {
                return {...item, checked: !item.checked}
            } return item
        })
        this.setState({list: checkAll});

    }
    setFilter = (status) => {
        this.setState({status: status})
    }
    updateList = () => {
        const {list, status} = this.state;

        switch (status) {
            case "Active":
                let activeList = list.filter(item => item.checked === false);
                return activeList
            case "Completed":
                let completedList = list.filter(item => item.checked === true);
                return completedList
            default:
                return list
        }
    }
    activeComleted = (checkList) => {
        let activeComleted = checkList.filter(item => item.checked === true);
        activeComleted.length !== 0 
            ? this.setState({completed: true}) 
            : this.setState({completed: false});
    }
    clearList = () => {
        const {list} = this.state;
        let clearList = list.filter(item => item.checked === false);
        this.setState({list: clearList})
        this.activeComleted(clearList);
    }

    render() {
        const { value, list, status, completed } = this.state;
        const count = list.filter(item => item.checked === false).length;

        return (
            <div className='ToDoBlock'>
                <ToDoForm 
                    value={value}
                    handelSubmit={this.handelSubmit}
                    handelChange={this.handelChange}
                    checkAll={this.checkAll}/>
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
        )
    }

}

export default ToDoBlock
