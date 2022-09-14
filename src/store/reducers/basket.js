import {
    SET_BASKET,
    ADD_TO_BASKET,
    REMOVE_FROM_BASKET,
    RESET_BASKET
} from "../constants";

const DEFAULT_BASKET = {}

const basketOperations = (state = DEFAULT_BASKET, action) => {
    switch (action.type) {
        case SET_BASKET:
            return action.payload
        case ADD_TO_BASKET:
            state[action.payload] = state[action.payload] ? state[action.payload] + 1 : 1
            return state
        case REMOVE_FROM_BASKET:
            state[action.payload] -= 1
            return state
        case RESET_BASKET:
            return {}
        default:
            return state;
    }
}

export default basketOperations;