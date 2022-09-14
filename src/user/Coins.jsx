import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCoins, enterCoin, addToSum } from '../store/actions/actionCreator.js'
import { moveIndicatorCoin } from './moveIndicatorCoin'


class Coins extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    enterCoin = (coin, index) => { // вносим монету
        if (coin.coinPar === '...') {
            console.log('Что-то пошло не так при загрузке монет, Вы не можете оплатить образцом.')
            return null
        }
        if (coin.coinCount >= coin.coinMaxCount) {
            console.log(`Внесено максимально возможное количество монет данного номинала (${coin.coinPar}₽).`)
            return null
        }
        this.props.enterCoin(index)
        this.props.addToSum(coin.coinPar)
        moveIndicatorCoin(index)
    }

    render() {
        return (
            <div
                id="coins"
                className="coins"
            >
                {this.props.coins.map((item, index) => {
                    let coinOneOpacity = item.coinCount >= item.coinMaxCount ? { opacity: 0.2 } : {}
                    return (
                        <div
                            key={index}
                            className="coin"
                        >
                            <div
                                className="ruble"
                                style={coinOneOpacity}
                                onClick={(e) => { this.enterCoin(item, index) }}
                            >
                                {item.coinPar}₽
                            </div>
                            <div>
                                {item.coinCount} из {item.coinMaxCount}
                            </div>
                            <div className="coinProgress">
                                <div
                                    id="coinBar"
                                    className="coinBar"
                                />
                                {/* {this.props.coins[index].coinCount/this.props.coins[index].coinMaxCount*100}% */}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    };
};

// export default Coins;

// export default connect(state => ({
//     coins: state.coins,
// }))(Coins);

// store.dispatch({ type: ACTION_1, value_1: "Some text" });

// store.subscribe(() => {
//     console.log("STATE", store.getState().coins)
//     mapStateToProps(store.getState().coins)
// })

function mapStateToProps(state) {
    return {
        coins: state.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCoins: bindActionCreators(setCoins, dispatch),
        enterCoin: bindActionCreators(enterCoin, dispatch),
        addToSum: bindActionCreators(addToSum, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Coins)