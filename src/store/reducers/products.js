import {
    SET_PRODUCTS,
    // GET_PRODUCT
} from "../constants";

const DEFAULT_PRODUCT = [
    {
        "id": 0,
        "productName": "...",
        "productImg": "/images/default_can.png",
        "productCount": "...",
        "productPrice": "..."
    }
]

const productsOperations = (state = DEFAULT_PRODUCT, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            let result = action.payload
            // result = Array.isArray(result) ? result.sort((a, b) => {
            //     switch (action.sortProperty) {
            //         case 'name_min':
            //             if (a.productName.toLowerCase() > b.productName.toLowerCase()) { return 1 }
            //             else { return -1 }
            //         case 'name_max':
            //             if (a.productName.toLowerCase() < b.productName.toLowerCase()) { return 1 }
            //             else { return -1 }
            //         case 'price_min':
            //             return a.productPrice - b.productPrice;
            //         case 'price_max':
            //             return b.productPrice - a.productPrice;
            //         case 'count_min':
            //             return a.productCount - b.productCount;
            //         case 'count_max':
            //             return b.productCount - a.productCount;
            //         default:
            //             return a.id - b.id;
            //     }
            // }) : []
            return result
        default:
            return state;
    }
}

export default productsOperations;