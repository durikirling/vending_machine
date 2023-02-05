
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDBCoins, editCoin, addCoin, deleteCoin } from '../../utils/server';
import { setCoins } from '../../store/actions/actionCreator';
import { bindActionCreators } from 'redux';
import FormTable from '../generic/FormTable';

class CoinForm extends Component {


    state = {
        coinId: '',
        newCoinPar: '',
        newCoinCount: '',
        newCoinMaxCount: '',
        editingMode: false,
        buttons: <></>,
        tableSource: []
    }

    componentDidMount() {
        const coin = this.props.source
        // if (coin) {
        //     this.setState({
        //         coinId: coin.id,
        //         newCoinPar: coin.coinPar,
        //         newCoinCount: coin.coinCount,
        //         newCoinMaxCount: coin.coinMaxCount,
        //         editingMode: true
        //     })
        // }
        if (coin) {
            const buttons = <div>
                <button onClick={this.submitForm}>Изменить</button>
                <button onClick={this.deleteCoin}>Удалить</button>
            </div>
            this.setState({
                coinId: coin.id,
                newCoinPar: coin.coinPar,
                newCoinCount: coin.coinCount,
                newCoinMaxCount: coin.coinMaxCount,
                editingMode: true,
                buttons: buttons
            }
                , () => { this.setTableSource() }
            )
        } else {
            const buttons = <>
                <button onClick={this.submitForm}>Сохранить</button>
                {/* <button onClick={() => { this.props.closeForm() }}>Отменить</button> */}
            </>
            this.setState({
                buttons: buttons
            }
                , () => { this.setTableSource() }
            )
        }
    }

    setTableSource = () => {
        const tableSource = [
            {
                name: 'Номинал',
                inputComponent: <input
                    name="newCoinPar"
                    placeholder="Номинал"
                    value={this.state.newCoinPar}
                    onChange={this.handleInputChange}
                />
            },
            {
                name: 'Кол-во',
                inputComponent: <input
                    name="newCoinCount"
                    placeholder="Текущее кол-во монет в автомате"
                    value={this.state.newCoinCount}
                    onChange={this.handleInputChange}
                />
            },
            {
                name: 'Макс. кол-во',
                inputComponent: <input
                    name="newCoinMaxCount"
                    placeholder="Максимальное кол-во монет в автомате"
                    value={this.state.newCoinMaxCount}
                    onChange={this.handleInputChange}
                />
            },
        ]
        this.setState({ tableSource: tableSource })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }
            , () => { this.setTableSource() }
        );
    }

    isCoinParUse = (newCoinPar) => {
        return this.props.coins.some(coin => coin.coinPar === newCoinPar)
    }

    isFormValid = (newCoinPar, newCoinCount, newCoinMaxCount) => {
        if (newCoinPar > 0 && newCoinCount >= 0 && newCoinMaxCount >= 0) {
            const numberValid = newCoinCount <= newCoinMaxCount
            if (this.state.editingMode) {
                return (!this.isCoinParUse(newCoinPar) || newCoinPar === this.props.coins.find(item => item.id === this.state.coinId).coinPar) && numberValid
            } else {
                return !this.isCoinParUse(newCoinPar) && numberValid
            }
        } else { return false }
    }

    transformValue = (number) => {
        if (typeof (number) === 'string')
            return Number(number.replace(/\s+/g, ''))
        if (typeof (number) === 'number')
            return number
        return undefined
    }

    submitForm = () => {
        let newCoinPar = this.transformValue(this.state.newCoinPar)
        let newCoinCount = this.transformValue(this.state.newCoinCount)
        let newCoinMaxCount = this.transformValue(this.state.newCoinMaxCount)
        if (this.isFormValid(newCoinPar, newCoinCount, newCoinMaxCount)) {
            if (this.state.editingMode) {
                const coin = {
                    "id": this.state.coinId,
                    "coinPar": newCoinPar,
                    "coinCount": newCoinCount,
                    "coinMaxCount": newCoinMaxCount
                }
                editCoin(coin)
                    .then((res) => console.log(res))
                    .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
                    .finally(() => {
                        getDBCoins()
                            .then(res => {
                                this.props.setCoins(res.data, 'par_min')
                            })
                            .catch((error) => {
                                console.log("SOMETHING WENT WRONG with Get-Request", error)
                            })
                        this.props.closeForm()
                    })
            } else {
                const newCoin = {
                    "coinPar": newCoinPar,
                    "coinCount": newCoinCount,
                    "coinMaxCount": newCoinMaxCount
                }
                addCoin(newCoin)
                    .then((res) => console.log(res))
                    .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
                    .finally(() => {
                        getDBCoins()
                            .then(res => {
                                this.props.setCoins(res.data, 'par_min') // .sort((a, b) => a.coinPar - b.coinPar)
                            })
                            .catch((error) => {
                                console.log("SOMETHING WENT WRONG with Get-Request", error)
                            })
                        this.props.closeForm()
                    })
            }
        } else { console.log('Validation form Error') }
    }

    // submitCreateCoin = () => {
    //     const newCoinPar = Number(this.state.newCoinPar)
    //     const newCoinCount = Number(this.state.newCoinCount)
    //     const newCoinMaxCount = Number(this.state.newCoinMaxCount)
    //     if (this.isFormValid(newCoinPar, newCoinCount, newCoinMaxCount)) {
    //         let newCoin = { 
    //             "coinPar": newCoinPar, 
    //             "coinCount": newCoinCount, 
    //             "coinMaxCount": newCoinMaxCount
    //         }
    //         // let masCoin = this.props.coin.concat(newCoin)//.sort((a, b) => a.coinName - b.coinName)
    //         addCoin(newCoin)
    //             .then((res) => console.log(res))
    //             .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
    //             .finally(() => {
    //                 getDBCoins()
    //                     .then(res => {
    //                         this.props.setCoins(res.data, 'par_min') // .sort((a, b) => a.coinPar - b.coinPar)
    //                     })
    //                     .catch((error) => {
    //                         console.log("SOMETHING WENT WRONG with Get-Request", error)
    //                     })
    //                 this.props.closeForm()
    //             })
    //     } else { console.log('Create form Error') }

    // }

    // submitEditCoin = () => {
    //     const newCoinPar = Number(this.state.newCoinPar)
    //     const newCoinCount = Number(this.state.newCoinCount)
    //     const newCoinMaxCount = Number(this.state.newCoinMaxCount)
    //     if (this.isFormValid(newCoinPar, newCoinCount, newCoinMaxCount)) {
    //         const coin = {
    //             "id": this.state.coinId,
    //             "coinPar": newCoinPar,
    //             "coinCount": newCoinCount,
    //             "coinMaxCount": newCoinMaxCount
    //         }
    //         editCoin(coin)
    //             .then((res) => console.log(res))
    //             .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
    //             .finally(() => {
    //                 getDBCoins()
    //                     .then(res => {
    //                         this.props.setCoins(res.data, 'par_min')
    //                     })
    //                     .catch((error) => {
    //                         console.log("SOMETHING WENT WRONG with Get-Request", error)
    //                     })
    //                 this.props.closeForm()
    //             })
    //     } else {
    //         console.log("Edit form Error")
    //     }
    // }

    deleteCoin = () => {
        deleteCoin(this.state.coinId)
            .then((res) => console.log(res))
            .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
            .finally(() => {
                getDBCoins()
                    .then(res => {
                        // this.setState({
                        //   coin: res.data//.sort((a, b) => a.coinName - b.coinName),
                        // });
                        this.props.setCoins(res.data, 'par_min')
                    })
                    .catch((error) => {
                        console.log("SOMETHING WENT WRONG with Get-Request", error)
                    })
            })
        this.props.closeForm()
    };

    render() {
        const tableSource = [
            {
                name: 'Номинал',
                inputComponent: <input
                    name="newCoinPar"
                    placeholder="Номинал"
                    value={this.state.newCoinPar}
                    onChange={this.handleInputChange}
                />
            },
            {
                name: 'Кол-во',
                inputComponent: <input
                    name="newCoinCount"
                    placeholder="Текущее кол-во монет в автомате"
                    value={this.state.newCoinCount}
                    onChange={this.handleInputChange}
                />
            },
            {
                name: 'Макс. кол-во',
                inputComponent: <input
                    name="newCoinMaxCount"
                    placeholder="Максимальное кол-во монет в автомате"
                    value={this.state.newCoinMaxCount}
                    onChange={this.handleInputChange}
                />
            },
        ]
        return (
            <div>
                <FormTable source={this.state.tableSource} />

                {/* <form>
                    <label htmlFor="choose">Would you prefer a banana or cherry?</label>
                    <input id="choose" name="i_like" /><br />
                    <label htmlFor="choose">Would or cherry?</label>
                    <input id="choose" name="i_like" /><br />
                    <label htmlFor="choose">Would</label>
                    <input id="choose" name="i_like" /><br />
                    <button>Submit</button>
                </form> */}

                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form> */}
                
                {/* Номинал
                <input
                    name="newCoinPar"
                    placeholder="Номинал"
                    value={this.state.newCoinPar}
                    onChange={this.handleInputChange}
                >
                </input><br />
                Кол-во
                <input
                    name="newCoinCount"
                    placeholder="Текущее кол-во монет в автомате"
                    value={this.state.newCoinCount}
                    onChange={this.handleInputChange}
                >
                </input><br />
                Макс. кол-во
                <input
                    name="newCoinMaxCount"
                    placeholder="Максимальное кол-во монет в автомате"
                    value={this.state.newCoinMaxCount}
                    onChange={this.handleInputChange}
                >
                </input> */}
                <br />
                {/* <button onClick={this.submitCreateCoin}>Изменить</button>
                    <button onClick={this.deleteCoin}>Удалить</button> */}
                {this.state.buttons}
            </div>
        )
    };
};

function mapStateToProps(state) {
    return {
        // sum: state.sum,
        // purchase: state.purchase,
        // coins: state.coins,
        coins: state.coins,
        // basket: state.basket
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setSum: bindActionCreators(setSum, dispatch),
        // resetSum: bindActionCreators(resetSum, dispatch),
        // setPurchase: bindActionCreators(setPurchase, dispatch),
        // setBasket: bindActionCreators(setBasket, dispatch),
        setCoins: bindActionCreators(setCoins, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinForm)