import { 
    SET_COINS,
    ENTER_COIN
} from "../constants";

const DEFAULT_COIN = [{
        "coinPar": "...",
        "coinCount": "...",
        "coinMaxCount": "..."
    }]

const coinsOperations = (state = DEFAULT_COIN, action) => {
    switch (action.type) {
        case SET_COINS:
            return action.payload
        case ENTER_COIN:
            state[action.payload].coinCount += 1
            return [...state]
        default:
            return state;
    }
}

export default coinsOperations;