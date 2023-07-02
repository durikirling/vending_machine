import {
    SET_COIN_FILTER
} from "../constants";

const DEFAULT_FILTER = 'par_min'

const coinSortingOperations = (state = DEFAULT_FILTER, action) => {
    switch (action.type) {
        case SET_COIN_FILTER:
            return action.payload
        default:
            return state;
    }
}

export default coinSortingOperations;