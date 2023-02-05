import { 
    SET_COINS,
    ENTER_COIN
} from "../constants";

const DEFAULT_COIN = [{
        "id": 0,
        "coinPar": "...",
        "coinCount": "...",
        "coinMaxCount": "..."
    }]

const coinsOperations = (state = DEFAULT_COIN, action) => {
    switch (action.type) {
        case SET_COINS:
            return action.payload
        case ENTER_COIN:
            state.map(item => {
                if (item.id === action.payload) {
                    item.coinCount += 1
                }
                return item
            })
            // state[action.payload].coinCount += 1
            return state // [...state]
        default:
            return state;
    }
}

export default coinsOperations;