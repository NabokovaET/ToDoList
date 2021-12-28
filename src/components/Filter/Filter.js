import React from "react";
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actionCreators';
import "./Filter.scss";

const Filter = ({ setFilter, status }) => {
    const filterList = [{ name: "All" }, { name: "Active" }, { name: "Completed" }];

    const filterItem = filterList.map((item) => {
        return (
            <button
                key={item.name}
                className={item.name === status ? "Filter__button active" : "Filter__button"}
                onClick={() => setFilter(item.name)}
            >
                {item.name}
            </button>
        );
    });

    return <div className='Filter'>{filterItem}</div>;
};

const mapStateToProps = ({todolistReducer}) => {
    const { status } = todolistReducer
    return { status: status }
}
  
const mapDispatchToProps = dispatch => {
    return {
        setFilter: (status) => dispatch(setFilter(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
