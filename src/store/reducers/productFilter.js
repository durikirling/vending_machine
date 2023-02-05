import {
    SET_PRODUCT_FILTER
} from "../constants";

const DEFAULT_FILTER = 'min_id'

const productFilterOperations = (state = DEFAULT_FILTER, action) => {
    switch (action.type) {
        case SET_PRODUCT_FILTER:
            return action.payload
        default:
            return state;
    }
}

export default productFilterOperations;