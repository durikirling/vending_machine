import React, { Component } from 'react';

class CoinCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        const {id, coinPar, coinCount, coinMaxCount} = this.props.source
        const defaultProduct = coinPar === '...'
        let coinBarWidth = 0, coinBarBC = '', coinClassName='coin'
        if (defaultProduct) coinClassName += ' hint'
        if (coinCount > 0 && coinMaxCount > 0) {
            const indicator = coinCount / coinMaxCount * 100
                coinBarWidth = indicator + "%"
                if (indicator === 100) {
                    coinClassName+=' cant-give-coin'
                    coinBarBC = 'red'
                } else if (indicator >= 80) {
                    coinBarBC = 'orange'
                }
                else { coinBarBC = 'yellowgreen' }
        }

        return (
            <div
                className="coin-container"
            >
                <div
                    className={coinClassName}
                    // style={{ opacity: coinOpacity }}
                    onClick={() => this.props.onClick()}
                    data-title={defaultProduct ? 'При загрузке монет произошла ошибка. :(' : ''}
                >
                    {coinPar}₽
                </div>
                <div>
                    {coinCount} из {coinMaxCount}
                </div>
                {/* {!this.props.isAdmin && */}
                <div className="coinProgress">
                    <div
                        id={`coinBar_${id}`}
                        className="coinBar"
                        style={{ width: coinBarWidth, backgroundColor: coinBarBC }}
                    />
                    {/* {coinCount/coinMaxCount*100}% */}
                </div>
                {/* } */}
            </div>
        )
    };
};

export default CoinCard