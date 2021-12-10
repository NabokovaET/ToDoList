import React, {Component} from 'react'
import ToDoForm from '../ToDoForm/ToDoForm'
import ToDoList from '../ToDoList/ToDoList'
import "./ToDoBlock.scss"

class ToDoBlock extends Component {

    state = {
        value: '', 
        list: [],
        cheked: false
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
        let newList = [];
        // let newList = list.filter(item => item !== value);
        let chek = list.includes(value);

        if(!chek) {
            newList.push(value);
        } else {
          return newList
        }
        newList = [...newList, ...list];
        this.setState({list: newList});
    }

    // itemDelete = (e) => {
    //     const {list} = this.state;
    //     console.log(list)
    //     console.log(e.target.value)
    //     // let deleteList = list.filter(item => item === );
    //     // console.log(deleteList)
    // }

    render() {
        const { value, list, cheked } = this.state;

        return (
            <div className='ToDoBlock'>
                <h1>todos</h1>
                <ToDoForm 
                    value={value}
                    handelSubmit={this.handelSubmit}
                    handelChange={this.handelChange}
                    handelClick={this.handelClick}/>
                <ToDoList
                    list={list}
                    cheked={cheked}
                    itemDelete={this.itemDelete}
                />
            </div>
        )
    }

}

export default ToDoBlock
