import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Filter from "../Filter/Filter";
import { clearListTodo } from '../../actions/actionCreators';
import "./ToDoFooter.scss";
import { useMutation } from "@apollo/client";
import { DELETE_COMPLITED_TODO } from '../../GraphQL/Mutation';

const ToDoFooter = ({ userId, count, completed, clearListTodo }) => {

    const [ deleteComplitedTodo, {data, error} ] = useMutation(DELETE_COMPLITED_TODO);

    useEffect(() => {
        if(data){clearListTodo()};
        if (error) return `Error! ${error.message}`;
    }, [data]);  

    return (
        <div className='ToDoFooter'>
            <div className='ToDoFooter__notification'>{count} items left</div>
            <Filter/>
            <button className={completed ? "ToDoFooter__button active" : "ToDoFooter__button"} onClick={() => deleteComplitedTodo({ variables: { userId: userId }})}>
                Clear completed
            </button>
        </div>
    );
};

const mapStateToProps = ({todolistReducer}) => {
    return {userId: todolistReducer.userId}
}
  
const mapDispatchToProps = dispatch => {
    return {
        clearListTodo: () => dispatch(clearListTodo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFooter);
