import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../src/reducers/rootReducer';

const composedEnhancer = compose(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer);

export default store;