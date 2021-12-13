import React, {Component} from 'react'
import "./ToDoBlock.scss"
import ToDoForm from '../ToDoForm/ToDoForm'
import ToDoList from '../ToDoList/ToDoList'
import ToDoFooter from '../ToDoFooter/ToDoFooter'

class ToDoBlock extends Component {

    state = {
        value: '', 
        list: [],
        filter: [],
        active: false
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
        !incld ? newList = [{text: value}, ...list] : newList = [...list];
        this.setState({list: newList});
    }
    deleteItem = index => {
        const {list} = this.state;
        let deleteList = [...list];
        deleteList.splice(index,1);
        this.setState({list: deleteList});
    }
    checkItem = index => {
        const {list} = this.state;
        let checkList = [...list];
        
        // checkList[index].cheked = false ? checkList[index].cheked = true : checkList[index].cheked;
        this.setState({list: checkList});
        console.log(checkList);
    }
    setFilter = () => {

    }
    clearList = () => {
        this.setState({list: []})
    }

    render() {
        const { value, list, active } = this.state;
        const count = list.length;
        return (
            <div className='ToDoBlock'>
                <ToDoForm 
                    value={value}
                    handelSubmit={this.handelSubmit}
                    handelChange={this.handelChange}
                    handelClick={this.handelClick}/>
                <ToDoList
                    list={list}
                    deleteItem={this.deleteItem}
                    checkItem={this.checkItem}
                />
                <ToDoFooter
                    count={count}
                    active={active}
                    setFilter={this.setFilter}
                    clearList={this.clearList}
                />
            </div>
        )
    }

}

export default ToDoBlock
