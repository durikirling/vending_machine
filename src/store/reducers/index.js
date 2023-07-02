import { combineReducers } from 'redux';
import coins from './coins.js'
import products from './products.js'
import sum from './sum.js'
import purchase from './purchase.js'
import basket from './basket.js'
import productSorting from './productSorting.js'
import coinSorting from './coinSorting.js'

const rootReducer = combineReducers({ 
    coins,
    products,
    sum,
    purchase,
    basket,
    productSorting,
    coinSorting
});

export default rootReducer;

// import { createStore } from 'redux';

// const store = createStore(reducer);

// export default store;