import {
    SET_PRODUCTS,
    // GET_PRODUCT
} from "../constants";

const DEFAULT_PRODUCT = [
    {
        "productName": "...",
        "productImg": "/images/default_can.png",
        "productCount": "...",
        "productPrice": "..."
    }
]

const productsOperations = (state = DEFAULT_PRODUCT, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.payload
        // case GET_PRODUCT:
        //     return action.payload
        default:
            return state;
    }
}

export default productsOperations;