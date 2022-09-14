import { createStore/* , compose */ } from 'redux';
import rootReducer from './reducers/index.js';

const configureStore = preloadedState => (
    createStore(
        rootReducer,
        preloadedState,
        // compose
    )
);

const store = configureStore({});

export default store;