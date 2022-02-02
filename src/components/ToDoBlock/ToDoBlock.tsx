import React, { useEffect } from "react";
import { connect } from 'react-redux';
import "./ToDoBlock.scss";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";
import ToDoFooter from "../ToDoFooter/ToDoFooter";
import { getData } from '../../actions/actionCreators';
import { useQuery } from '@apollo/client';
import { ALL_TODO } from '../../GraphQL/Queries';
import jwt_decode from 'jwt-decode';

const ToDoBlock = ({list, status, getData} : {list: any[], status: string, getData: Function}) => {

    const access_token: any = localStorage.getItem('token');
    const decode: any = jwt_decode(access_token);
    const userId: string = decode._id;
    console.log(decode._id)

    const { data } = useQuery(ALL_TODO, {variables: { userId, page: 1, size: 5 }});

    useEffect(() => {
        if(data) {
            getData(data, userId)
        }
    }, [data]);

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

const mapStateToProps = ({todolistReducer} : {todolistReducer: any}) => {
    const { list, status } = todolistReducer
    return {
        list: list,
        status: status
    }
}
  
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getData: (data: any[], userId: string) => dispatch(getData(data, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoBlock);
