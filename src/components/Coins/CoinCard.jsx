import React, { Component } from 'react';

class CoinCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        const source = this.props.source
        const defaultProduct = source.coinPar === '...'
        let coinBarWidth = 0, coinBarBC = '', coinOpacity = 1
        if (source.coinCount > 0 && source.coinMaxCount > 0) {
            const indicator = source.coinCount / source.coinMaxCount * 100
                coinBarWidth = indicator + "%"
                if (indicator === 100) {
                    coinOpacity = !this.props.isAdmin ? 0.2 : 1
                    coinBarBC = 'red'
                } else if (indicator >= 80) {
                    coinBarBC = 'orange'
                }
                else { coinBarBC = 'yellowgreen' }
        }

        return (
            <div
                className="coin"
            >
                <div
                    className={defaultProduct ? 'ruble hint' : 'ruble'}
                    style={{ opacity: coinOpacity }}
                    onClick={() => this.props.onClick()}
                    data-title={defaultProduct ? 'При загрузке монет произошла ошибка. :(' : ''}
                >
                    {source.coinPar}₽
                </div>
                <div>
                    {source.coinCount} из {source.coinMaxCount}
                </div>
                {/* {!this.props.isAdmin && */}
                <div className="coinProgress">
                    <div
                        id={`coinBar_${source.id}`}
                        className="coinBar"
                        style={{ width: coinBarWidth, backgroundColor: coinBarBC }}
                    />
                    {/* {source.coinCount/source.coinMaxCount*100}% */}
                </div>
                {/* } */}
            </div>
        )
    };
};

export default CoinCard