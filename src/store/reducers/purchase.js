import {
    SET_PURCHASE,
    ADD_TO_PURCHASE,
    REMOVE_FROM_PURCHASE,
    RESET_PURCHASE
} from "../constants";

const DEFAULT_PURCHASE = 0

const sumOperations = (state = DEFAULT_PURCHASE, action) => {
    switch (action.type) {
        case SET_PURCHASE:
            return action.payload
        case ADD_TO_PURCHASE:
            return state + action.payload
        case REMOVE_FROM_PURCHASE:
            return state - action.payload
        case RESET_PURCHASE:
            return 0
        default:
            return state;
    }
}

export default sumOperations;