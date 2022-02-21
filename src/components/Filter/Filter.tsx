import { useAppSelector, useAppDispatch } from '../../hooksRedux';
import { setFilter } from '../../slices/todoSlice';
import './Filter.scss';

const Filter = () => {
    const filterList = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
    const status = useAppSelector((state) => state.todos.status);
    const dispatch = useAppDispatch();

    const filterItem = filterList.map((item) => {
        return (
            <button
                key={item.name}
                className={item.name === status ? 'Filter__button active' : 'Filter__button'}
                onClick={() => dispatch(setFilter(item.name))}>
                {item.name}
            </button>
        );
    });

    return <div className='Filter'>{filterItem}</div>;
};

export default Filter;
