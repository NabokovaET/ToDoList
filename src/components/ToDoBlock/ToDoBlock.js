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
        filter: [],
        active: 'all',
        completed: false,
        checked: false
    }

    handelSubmit = e => {
        e.preventDefault();
        this.setState({value: ''});
    }
    handelChange = e => {
        this.setState({value: e.target.value});
    }
    handelClick = () => {
        this.addItem();
    }

    addItem = () => {
        const {value, list} = this.state;
        let newList = [...list];
        let incld = newList.includes(value);
        !incld 
            ? newList = [{id: nanoid(7), text: value, checked: false}, ...list] 
            : newList = [...list];
        this.setState({list: newList, filter: newList});
    }
    deleteItem = index => {
        const {list} = this.state;
        let deleteList = list.filter(item => item.id !== index);
        console.log(deleteList)
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
        console.log(checkList)
        this.setState({list: checkList});
        this.activeComleted(checkList);

        // checkList[index].checked = !checkList[index].checked;
        // checkList[index].checked 
        //     ? this.setState({checked: true}) 
        //     : this.setState({checked: false});
        // console.log(checkList[index].checked)
    }
    checkAll = () => {
        const {list} = this.state;
        let checkAll = list.filter(item => {
            if(item.checked === false) {
                return item.checked = true
            } 
            return item
        })
        this.setState({list: checkAll});
    }
    setFilter = status => {
        const {list} = this.state;

        switch (status) {
            case "active":
                let activeList = list.filter(item => item.checked === false);
                this.setState({filter: activeList, active: 'active'})
                break;
            case "completed":
                let completedList = list.filter(item => item.checked === true);
                this.setState({filter: completedList, active: 'completed'})
                break;
            default:
                this.setState({filter: list, active: 'all'})
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
        this.setState({filter: clearList})
        this.activeComleted(clearList);
    }

    render() {
        const { value, list, active, completed, checked, filter } = this.state;
        const count = list.filter(item => item.checked === false).length;

        return (
            <div className='ToDoBlock'>
                <ToDoForm 
                    value={value}
                    handelSubmit={this.handelSubmit}
                    handelChange={this.handelChange}
                    handelClick={this.handelClick}
                    checkAll={this.checkAll}/>
                <ToDoList
                    list={list}
                    checked={checked}
                    deleteItem={this.deleteItem}
                    checkItem={this.checkItem}
                />
                <ToDoFooter
                    count={count}
                    active={active}
                    completed={completed}
                    setFilter={this.setFilter}
                    clearList={this.clearList}
                />
            </div>
        )
    }

}

export default ToDoBlock
