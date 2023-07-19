import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setCoins, enterCoin, addToSum } from '../store/actions/actionCreator.js'
// import { moveIndicatorCoin } from '../utils/moveIndicatorCoin'
import CoinCard from './CoinCard.jsx';
import { sortingCoins } from '../../utils/functions.js';
import './Coin.css'


class CoinsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortedCoins: []
        };
    };

    componentDidMount = () => {
        this.setState({ sortedCoins: sortingCoins(this.props.coins, this.props.coinSorting) })
    }

    componentDidUpdate = (prevState) => {
        if (prevState.coinSorting !== this.props.coinSorting || prevState.coins !== this.props.coins)
            this.setState({ sortedCoins: sortingCoins(this.props.coins, this.props.coinSorting) })
    }

    render() {
        return (
            <div
                // id="coins"
                className="coins-container"
            >
                {this.props.children}
                {this.state.sortedCoins.map((item) => {
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
        coinSorting: state.coinSorting
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
)(CoinsContainer)