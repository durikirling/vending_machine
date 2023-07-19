
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDBCoins, editCoin, addCoin, deleteCoin } from '../../utils/server';
import { setCoins } from '../../store/actions/actionCreator';
import { bindActionCreators } from 'redux';
// import FormTable from '../generic/FormTable';
import Form from '../generic/Form/Form';

class CoinForm extends Component {

    state = {
        id: this.props.source?.id ?? '',
        coinPar: this.props.source?.coinPar ?? '',
        coinCount: this.props.source?.coinCount ?? '',
        coinMaxCount: this.props.source?.coinMaxCount ?? '',
        editingMode: this.props.source ? true : false,
    }

    componentDidMount() {
        // const coin = this.props.source
        // if (coin) {
        //     this.setState({
        //         id: coin.id,
        //         coinPar: coin.coinPar,
        //         coinCount: coin.coinCount,
        //         coinMaxCount: coin.coinMaxCount,
        //         editingMode: true
        //     })
        // }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    isCoinParUse = (coinPar) => {
        return this.props.coins.some(coin => coin.coinPar === coinPar)
    }

    // isFormValid = (coinPar, coinCount, coinMaxCount) => {
    //     if (coinPar > 0 && coinCount >= 0 && coinMaxCount >= 0) {
    //         const numberValid = coinCount <= coinMaxCount
    //         if (this.state.editingMode) {
    //             return (!this.isCoinParUse(coinPar) || coinPar === this.props.coins.find(item => item.id === this.state.id).coinPar) && numberValid
    //         } else {
    //             return !this.isCoinParUse(coinPar) && numberValid
    //         }
    //     } else { return false }
    // }

    // transformValue = (number) => {
    //     if (typeof (number) === 'string')
    //         return Number(number.replace(/\s+/g, ''))
    //     if (typeof (number) === 'number')
    //         return number
    //     return undefined
    // }

    // submitForm = () => {
    //     let coinPar = this.transformValue(this.state.coinPar)
    //     let coinCount = this.transformValue(this.state.coinCount)
    //     let coinMaxCount = this.transformValue(this.state.coinMaxCount)
    //     if (this.isFormValid(coinPar, coinCount, coinMaxCount)) {
    //         if (this.state.editingMode) {
    //             const coin = {
    //                 "id": this.state.id,
    //                 "coinPar": coinPar,
    //                 "coinCount": coinCount,
    //                 "coinMaxCount": coinMaxCount
    //             }
    //             editCoin(coin)
    //                 .then((res) => console.log(res))
    //                 .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
    //                 .finally(() => {
    //                     getDBCoins()
    //                         .then(res => {
    //                             this.props.setCoins(res.data)
    //                         })
    //                         .catch((error) => {
    //                             console.log("SOMETHING WENT WRONG with Get-Request", error)
    //                         })
    //                     this.props.closeForm()
    //                 })
    //         } else {
    //             const newCoin = {
    //                 "coinPar": coinPar,
    //                 "coinCount": coinCount,
    //                 "coinMaxCount": coinMaxCount
    //             }
    //             addCoin(newCoin)
    //                 .then((res) => console.log(res))
    //                 .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
    //                 .finally(() => {
    //                     getDBCoins()
    //                         .then(res => {
    //                             this.props.setCoins(res.data)
    //                         })
    //                         .catch((error) => {
    //                             console.log("SOMETHING WENT WRONG with Get-Request", error)
    //                         })
    //                     this.props.closeForm()
    //                 })
    //         }
    //     } else { console.log('Validation form Error') }
    // }

    // submitCreateCoin = () => {
    //     const coinPar = Number(this.state.coinPar)
    //     const coinCount = Number(this.state.coinCount)
    //     const coinMaxCount = Number(this.state.coinMaxCount)
    //     if (this.isFormValid(coinPar, coinCount, coinMaxCount)) {
    //         let newCoin = { 
    //             "coinPar": coinPar, 
    //             "coinCount": coinCount, 
    //             "coinMaxCount": coinMaxCount
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
    //     const coinPar = Number(this.state.coinPar)
    //     const coinCount = Number(this.state.coinCount)
    //     const coinMaxCount = Number(this.state.coinMaxCount)
    //     if (this.isFormValid(coinPar, coinCount, coinMaxCount)) {
    //         const coin = {
    //             "id": this.state.id,
    //             "coinPar": coinPar,
    //             "coinCount": coinCount,
    //             "coinMaxCount": coinMaxCount
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
        deleteCoin(this.state.id)
            .then((res) => console.log(res))
            .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
            .finally(() => {
                getDBCoins()
                    .then(res => {
                        this.props.setCoins(res.data)
                    })
                    .catch((error) => {
                        console.log("SOMETHING WENT WRONG with Get-Request", error)
                    })
            })
        this.props.closeForm()
    };

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target.form)
        // const form = new Form(e.target)
        // console.log(form)
        const formData = new FormData(e.target)
        // console.log(Array.from(formData))

        let coin = this.props.source ?? {}

        for (let [name, value] of formData) {
            // alert(`${name} = ${value}`); // key1=value1, потом key2=value2

            coin[name] = Number(value) // .trim().replace(/ +(?= )/g, '')
            // .trim() - убираем пробелы в начале и конце 
            // .replace(/ +(?= )/g,'') - меняем множественные пробелы на один
        }

        console.log(coin)

        // if (this.isProductNameUse(product)) {
        //   notification({ text: 'name error', type: 'error' }, 3000)
        //   return null
        // }

        if (this.state.editingMode) {
            this.submitEdit(coin)
        } else {
            this.submitCreate(coin)
        }

    }

    submitCreate = (coin) => {
        addCoin(coin)
            .then((res) => console.log(res))
            .catch((error) => console.log("SOMETHING WENT WRONG with CreateProduct", error))
            .finally(() => {
                getDBCoins()
                    .then(res => {
                        this.props.setCoins(res.data)
                    })
                    .catch((error) => {
                        console.log("SOMETHING WENT WRONG with Get-Request", error)
                    })
                this.props.closeForm()
            })
    }

    submitEdit = (coin) => {
        editCoin(coin)
            .then((res) => console.log(res))
            .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
            .finally(() => {
                getDBCoins()
                    .then(res => {
                        this.props.setCoins(res.data)
                    })
                    .catch((error) => {
                        console.log("SOMETHING WENT WRONG with Get-Request", error)
                    })
                this.props.closeForm()
            })
    }

    // getFormButtons = () => {
    //     const formButtons = [
    //         { label: 'Удалить', onClick: (e) => this.deleteCoin() },
    //         // { label: 'Удалить', onClick: (e) => this.deleteProduct() }
    //     ]
    //     return formButtons
    // }

    render() {
        // const buttonsParams = this.state.editingMode ? this.getFormButtons() : null

        return (
            <Form
                handleSubmit={this.handleSubmit}
                // submitButtonLabel={this.state.editingMode ? 'Сохранить' : 'Создать'}
                // anotherButtons={buttonsParams}
                isHighlightChanges={this.state.editingMode}
            // title='Заполните поля'
            >
                <input
                    label={'Номинал'}
                    name="coinPar"
                    placeholder="Номинал"
                    value={this.state.coinPar}
                    onChange={this.handleInputChange}
                    required={true}
                    type='number'
                    // pattern='^[0-9]+$'
                    min={1}
                    autoComplete="off"
                // onInvalid={(e)=>{console.log(e)}}
                />
                <input
                    label={'Кол-во'}
                    name="coinCount"
                    placeholder="Текущее кол-во монет в автомате"
                    value={this.state.coinCount}
                    onChange={this.handleInputChange}
                    required={true}
                    type='number'
                    max={this.state.coinMaxCount}
                    min={0}
                    autoComplete="off"
                />
                <input
                    label={'Макс. кол-во'}
                    name="coinMaxCount"
                    placeholder="Максимальное кол-во монет в автомате"
                    value={this.state.coinMaxCount}
                    onChange={this.handleInputChange}
                    type='number'
                    required={true}
                    min={0}
                    autoComplete="off"
                />
                <button type='submit'>
                    {this.state.editingMode ? 'Сохранить' : 'Создать'}
                </button>
                {this.state.editingMode ?
                    <button onClick={(e) => this.deleteCoin()}>
                        Удалить
                    </button>
                    : null
                }
            </Form>
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

    // setTableSource = () => {
    //     const tableSource = [
    //         {
    //             name: 'Номинал',
    //             inputComponent: <input
    //                 name="coinPar"
    //                 placeholder="Номинал"
    //                 value={this.state.coinPar}
    //                 onChange={this.handleInputChange}
    //                 required={true}
    //                 type='number'
    //                 // pattern='^[0-9]+$'
    //                 min={0}
    //             // onInvalid={(e)=>{console.log(e)}}
    //             />
    //         },
    //         {
    //             name: 'Кол-во',
    //             inputComponent: <input
    //                 name="coinCount"
    //                 placeholder="Текущее кол-во монет в автомате"
    //                 value={this.state.coinCount}
    //                 onChange={this.handleInputChange}
    //                 required={true}
    //                 type='number'
    //                 max={this.state.coinMaxCount}
    //                 min={0}
    //             />
    //         },
    //         {
    //             name: 'Макс. кол-во',
    //             inputComponent: <input
    //                 name="coinMaxCount"
    //                 placeholder="Максимальное кол-во монет в автомате"
    //                 value={this.state.coinMaxCount}
    //                 onChange={this.handleInputChange}
    //                 type='number'
    //                 required={true}
    //                 min={0}
    //             />
    //         },
    //     ]
    //     this.setState({ tableSource: tableSource })
    // }