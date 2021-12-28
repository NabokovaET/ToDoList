import React from "react";
import { connect } from 'react-redux';
import Filter from "../Filter/Filter";
import { clearListTodo } from '../../actions/actionCreators';
import "./ToDoFooter.scss";

const ToDoFooter = ({ count, completed, clearListTodo }) => {

    return (
        <div className='ToDoFooter'>
            <div className='ToDoFooter__notification'>{count} items left</div>
            <Filter/>
            <button className={completed ? "ToDoFooter__button active" : "ToDoFooter__button"} onClick={() => clearListTodo()}>
                Clear completed
            </button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        clearListTodo: () => dispatch(clearListTodo()),
    }
}

export default connect(null, mapDispatchToProps)(ToDoFooter);
