import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setCoins, enterCoin, addToSum } from '../store/actions/actionCreator.js'
// import { moveIndicatorCoin } from '../utils/moveIndicatorCoin'
import CoinCard from './CoinCard.jsx';
import { filterCoins } from '../../utils/functions.js';
import './Coin.css'


class Coins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredCoins: []
        };
    };

    componentDidMount = () => {
        this.setState({ filteredCoins: filterCoins(this.props.coins, this.props.coinFilter) })
    }

    componentDidUpdate = (prevState) => {
        if (prevState.coinFilter !== this.props.coinFilter || prevState.coins !== this.props.coins)
            this.setState({ filteredCoins: filterCoins(this.props.coins, this.props.coinFilter) })
    }

    render() {
        return (
            <div
                id="coins"
                className="coins"
            >
                {this.props.children}
                {this.state.filteredCoins.map((item) => {
                    // let coinOneOpacity = item.coinCount >= item.coinMaxCount ? { opacity: 0.2 } : {}
                    return (
                        <CoinCard
                            source={item}
                            key={item.id}
                            onClick={() => this.props.onClick(item)}
                            isAdmin={this.props.isAdmin}
                        />
                        // <div
                        //     key={item.id}
                        //     className="coin"
                        // >
                        //     <div
                        //         className="ruble"
                        //         style={coinOneOpacity}
                        //         onClick={() => { this.props.onClick(item) }}
                        //     >
                        //         {item.coinPar}₽
                        //     </div>
                        //     <div>
                        //         {item.coinCount} из {item.coinMaxCount}
                        //     </div>
                        //     {!this.props.isAdmin &&
                        //     <div className="coinProgress">
                        //         <div
                        //             id={`coinBar_${item.id}`}
                        //             className="coinBar"
                        //         />
                        //         {/* {this.props.coins[index].coinCount/this.props.coins[index].coinMaxCount*100}% */}
                        //     </div>}
                        // </div>
                    )
                })}
            </div>
        )
    };
};

function mapStateToProps(state) {
    return {
        coins: state.coins,
        coinFilter: state.coinFilter
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         setCoins: bindActionCreators(setCoins, dispatch),
//         enterCoin: bindActionCreators(enterCoin, dispatch),
//         addToSum: bindActionCreators(addToSum, dispatch),
//     }
// }

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Coins)