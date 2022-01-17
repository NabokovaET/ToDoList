import React, {useEffect} from "react";
import { connect } from 'react-redux';
import "./ToDoBlock.scss";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";
import ToDoFooter from "../ToDoFooter/ToDoFooter";
import { getData } from '../../actions/actionCreators';

const ToDoBlock = ({list, status, getData}) => {

    useEffect(() => {
        getData()
    }, []);

    const updateList = () => {
        switch (status) {
            case "Active":
                let activeList = list.filter((item) => !item.completed);
                return activeList;
            case "Completed":
                let completedList = list.filter((item) => item.completed);
                return completedList;
            default:
                return list;
        }
    };

    const count = list.filter((item) => !item.completed).length;
    const completed = list.length > count;

    return (
        <>
            <h1 className='App__title'>todos</h1>
            <div className='ToDoBlock'>
                <ToDoForm />
                <ToDoList list={updateList()}/>
                <ToDoFooter
                    count={count}
                    completed={completed}
                />
            </div>
        </>
    );
}

const mapStateToProps = ({todolistReducer}) => {
    const { list, status } = todolistReducer
    return {
        list: list,
        status: status
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        getData: (data) => dispatch(getData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoBlock);
