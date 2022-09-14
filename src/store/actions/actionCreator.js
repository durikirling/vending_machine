import {
    SET_COINS,
    SET_PRODUCTS,
    ENTER_COIN,
    SET_SUM,
    ADD_TO_SUM,
    RESET_SUM,
    SET_PURCHASE,
    ADD_TO_PURCHASE,
    REMOVE_FROM_PURCHASE,
    RESET_PURCHASE,
    SET_BASKET,
    ADD_TO_BASKET,
    REMOVE_FROM_BASKET,
    RESET_BASKET
} from "../constants";

// COINS

export const setCoins = (coinsMas) => ({
    type: SET_COINS,
    payload: coinsMas
})

export const enterCoin = (coinID) => ({
    type: ENTER_COIN,
    payload: coinID
})

// PRODUCTS

export const setProducts = (productsMas) => ({
    type: SET_PRODUCTS,
    payload: productsMas
})

// SUM

export const setSum = (val) => ({
    type: SET_SUM,
    payload: val
})

export const addToSum = (val) => ({
    type: ADD_TO_SUM,
    payload: val
})

export const resetSum = (/* val = 0 */) => ({
    type: RESET_SUM,
    // payload: 0
})

// PURCHASE

export const setPurchase = (val) => ({
    type: SET_PURCHASE,
    payload: val
})

export const addToPurchase = (val) => ({
    type: ADD_TO_PURCHASE,
    payload: val
})

export const removeFromPurchase = (val) => ({
    type: REMOVE_FROM_PURCHASE,
    payload: val
})

export const resetPurchase = (/* val */) => ({
    type: RESET_PURCHASE,
    // payload: val
})

// BASKET 

export const setBasket = (val) => ({
    type: SET_BASKET,
    payload: val
})

export const addProductToBasket = (val) => ({
    type: ADD_TO_BASKET,
    payload: val
})

export const removeProductFromBasket = (val) => ({
    type: REMOVE_FROM_BASKET,
    payload: val
})

export const resetBasket = (/* val */) => ({
    type: RESET_BASKET,
    // payload: val
})

// CHANGE

// export default setCoins