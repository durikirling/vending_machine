import { combineReducers } from 'redux';
import coins from './coins.js'
import products from './products.js'
import sum from './sum.js'
import purchase from './purchase.js'
import basket from './basket.js'
import productFilter from './productFilter.js'
import coinFilter from './coinFilter.js'

const rootReducer = combineReducers({ 
    coins,
    products,
    sum,
    purchase,
    basket,
    productFilter,
    coinFilter
});

export default rootReducer;

// import { createStore } from 'redux';

// const store = createStore(reducer);

// export default store;