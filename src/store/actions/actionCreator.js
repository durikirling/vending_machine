// import {
//     SET_COINS,
//     SET_PRODUCTS,
//     ENTER_COIN,
//     SET_SUM,
//     ADD_TO_SUM,
//     RESET_SUM,
//     SET_PURCHASE,
//     ADD_TO_PURCHASE,
//     REMOVE_FROM_PURCHASE,
//     RESET_PURCHASE,
//     SET_BASKET,
//     ADD_TO_BASKET,
//     REMOVE_FROM_BASKET,
//     RESET_BASKET,
//     SET_PRODUCT_FILTER,
//     SET_COIN_FILTER
// } from "../constants";

import * as Types from '../constants.js';

// COINS

export const setCoins = (coinsArr) => ({
    type: Types.SET_COINS,
    payload: coinsArr//.sort((a, b) => {
    //     switch (sortProperty) {
    //         case 'par_min':
    //             return a.coinPar - b.coinPar;
    //         case 'par_max':
    //             return b.coinPar - a.coinPar;
    //         case 'count_min':
    //             return a.coinCount - b.coinCount;
    //         case 'count_max':
    //             return b.coinCount - a.coinCount;
    //         default:
    //             return null;
    //     }
    // })
})

export const enterCoin = (coinID) => ({
    type: Types.ENTER_COIN,
    payload: coinID
})

// PRODUCTS

export const setProducts = (productsArr, sortProperty = '') => ({
    type: Types.SET_PRODUCTS,
    payload: productsArr,
    // sortProperty: sortProperty
})

// SUM

export const setSum = (val) => ({
    type: Types.SET_SUM,
    payload: val
})

export const addToSum = (val) => ({
    type: Types.ADD_TO_SUM,
    payload: val
})

export const resetSum = () => ({
    type: Types.RESET_SUM,
})

// PURCHASE

export const setPurchase = (val) => ({
    type: Types.SET_PURCHASE,
    payload: val
})

export const addToPurchase = (val) => ({
    type: Types.ADD_TO_PURCHASE,
    payload: val
})

export const removeFromPurchase = (val) => ({
    type: Types.REMOVE_FROM_PURCHASE,
    payload: val
})

export const resetPurchase = () => ({
    type: Types.RESET_PURCHASE
})

// BASKET 

export const setBasket = (val) => ({
    type: Types.SET_BASKET,
    payload: val
})

export const addProductToBasket = (val) => ({
    type: Types.ADD_TO_BASKET,
    payload: val
})

export const removeProductFromBasket = (val) => ({
    type: Types.REMOVE_FROM_BASKET,
    payload: val
})

export const resetBasket = () => ({
    type: Types.RESET_BASKET
})

// CHANGE

// FILTER

export const setProductSorting = (sortingName) => ({
    type: Types.SET_PRODUCT_FILTER,
    payload: sortingName
})

export const setCoinSorting = (sortingName) => ({
    type: Types.SET_COIN_FILTER,
    payload: sortingName
})