import {
    SET_SUM,
    ADD_TO_SUM,
    RESET_SUM
} from "../constants";

const DEFAULT_SUM = 0

const sumOperations = (state = DEFAULT_SUM, action) => {
    switch (action.type) {
        case SET_SUM:
            return action.payload
        case ADD_TO_SUM:
            return state + action.payload
        case RESET_SUM:
            return 0
        default:
            return state;
    }
}

export default sumOperations;