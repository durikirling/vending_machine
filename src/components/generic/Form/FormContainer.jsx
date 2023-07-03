
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { getDBCoins, editCoin, addCoin, deleteCoin } from '../utils/server';
// import { setCoins } from '../store/actions/actionCreator';
// import { bindActionCreators } from 'redux';
// // import FormTable from '../generic/FormTable';
// import Form from './generic/Form';

// class CoinForm extends Component {

//     state = {
//         // coinId: '',
//         // newCoinPar: '',
//         // newCoinCount: '',
//         // newCoinMaxCount: '',
//         // editingMode: false,
//     }

//     componentDidMount() {
//         const source = this.props.source
//         if (source) {
//             this.setState({
//                 // coinId: coin.id,
//                 // newCoinPar: coin.coinPar,
//                 // newCoinCount: coin.coinCount,
//                 // newCoinMaxCount: coin.coinMaxCount,
//                 editingMode: true
//             })
//         }
//     }

//     handleInputChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     }

//     isCoinParUse = (newCoinPar) => {
//         return this.props.coins.some(coin => coin.coinPar === newCoinPar)
//     }

//     isFormValid = (newCoinPar, newCoinCount, newCoinMaxCount) => {
//         if (newCoinPar > 0 && newCoinCount >= 0 && newCoinMaxCount >= 0) {
//             const numberValid = newCoinCount <= newCoinMaxCount
//             if (this.state.editingMode) {
//                 return (!this.isCoinParUse(newCoinPar) || newCoinPar === this.props.coins.find(item => item.id === this.state.coinId).coinPar) && numberValid
//             } else {
//                 return !this.isCoinParUse(newCoinPar) && numberValid
//             }
//         } else { return false }
//     }

//     transformValue = (number) => {
//         if (typeof (number) === 'string')
//             return Number(number.replace(/\s+/g, ''))
//         if (typeof (number) === 'number')
//             return number
//         return undefined
//     }

//     submitForm = () => {
//         let newCoinPar = this.transformValue(this.state.newCoinPar)
//         let newCoinCount = this.transformValue(this.state.newCoinCount)
//         let newCoinMaxCount = this.transformValue(this.state.newCoinMaxCount)
//         if (this.isFormValid(newCoinPar, newCoinCount, newCoinMaxCount)) {
//             if (this.state.editingMode) {
//                 const coin = {
//                     "id": this.state.coinId,
//                     "coinPar": newCoinPar,
//                     "coinCount": newCoinCount,
//                     "coinMaxCount": newCoinMaxCount
//                 }
//                 editCoin(coin)
//                     .then((res) => console.log(res))
//                     .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
//                     .finally(() => {
//                         getDBCoins()
//                             .then(res => {
//                                 this.props.setCoins(res.data)
//                             })
//                             .catch((error) => {
//                                 console.log("SOMETHING WENT WRONG with Get-Request", error)
//                             })
//                         this.props.closeForm()
//                     })
//             } else {
//                 const newCoin = {
//                     "coinPar": newCoinPar,
//                     "coinCount": newCoinCount,
//                     "coinMaxCount": newCoinMaxCount
//                 }
//                 addCoin(newCoin)
//                     .then((res) => console.log(res))
//                     .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
//                     .finally(() => {
//                         getDBCoins()
//                             .then(res => {
//                                 this.props.setCoins(res.data)
//                             })
//                             .catch((error) => {
//                                 console.log("SOMETHING WENT WRONG with Get-Request", error)
//                             })
//                         this.props.closeForm()
//                     })
//             }
//         } else { console.log('Validation form Error') }
//     }

//     // submitCreateCoin = () => {
//     //     const newCoinPar = Number(this.state.newCoinPar)
//     //     const newCoinCount = Number(this.state.newCoinCount)
//     //     const newCoinMaxCount = Number(this.state.newCoinMaxCount)
//     //     if (this.isFormValid(newCoinPar, newCoinCount, newCoinMaxCount)) {
//     //         let newCoin = { 
//     //             "coinPar": newCoinPar, 
//     //             "coinCount": newCoinCount, 
//     //             "coinMaxCount": newCoinMaxCount
//     //         }
//     //         // let masCoin = this.props.coin.concat(newCoin)//.sort((a, b) => a.coinName - b.coinName)
//     //         addCoin(newCoin)
//     //             .then((res) => console.log(res))
//     //             .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
//     //             .finally(() => {
//     //                 getDBCoins()
//     //                     .then(res => {
//     //                         this.props.setCoins(res.data, 'par_min') // .sort((a, b) => a.coinPar - b.coinPar)
//     //                     })
//     //                     .catch((error) => {
//     //                         console.log("SOMETHING WENT WRONG with Get-Request", error)
//     //                     })
//     //                 this.props.closeForm()
//     //             })
//     //     } else { console.log('Create form Error') }

//     // }

//     // submitEditCoin = () => {
//     //     const newCoinPar = Number(this.state.newCoinPar)
//     //     const newCoinCount = Number(this.state.newCoinCount)
//     //     const newCoinMaxCount = Number(this.state.newCoinMaxCount)
//     //     if (this.isFormValid(newCoinPar, newCoinCount, newCoinMaxCount)) {
//     //         const coin = {
//     //             "id": this.state.coinId,
//     //             "coinPar": newCoinPar,
//     //             "coinCount": newCoinCount,
//     //             "coinMaxCount": newCoinMaxCount
//     //         }
//     //         editCoin(coin)
//     //             .then((res) => console.log(res))
//     //             .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
//     //             .finally(() => {
//     //                 getDBCoins()
//     //                     .then(res => {
//     //                         this.props.setCoins(res.data, 'par_min')
//     //                     })
//     //                     .catch((error) => {
//     //                         console.log("SOMETHING WENT WRONG with Get-Request", error)
//     //                     })
//     //                 this.props.closeForm()
//     //             })
//     //     } else {
//     //         console.log("Edit form Error")
//     //     }
//     // }

//     deleteCoin = () => {
//         deleteCoin(this.state.coinId)
//             .then((res) => console.log(res))
//             .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
//             .finally(() => {
//                 getDBCoins()
//                     .then(res => {
//                         this.props.setCoins(res.data)
//                     })
//                     .catch((error) => {
//                         console.log("SOMETHING WENT WRONG with Get-Request", error)
//                     })
//             })
//         this.props.closeForm()
//     };

//     handleSubmit = (e) => {
//         e.preventDefault()
//         console.log(e.target.form)
//         const form = new Form(e.target)
//         console.log(form)
//         const formData = new FormData(e.target)
//         console.log(Array.from(formData))

//         for (let [name, value] of formData) {
//             // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
//         }
//     }

//     getFormButtons = () => {
//         const formButtons = [
//             { label: 'Удалить', onClick: (e) => this.deleteProduct() },
//             // { label: 'Удалить', onClick: (e) => this.deleteProduct() }
//         ]
//         return formButtons
//     }

//     render() {
//         const buttonsParams = this.state.editingMode ? this.getFormButtons() : null

//         return (
//             <Form
//                 source={this.props.source}
//                 handleSubmit={this.handleSubmit}
//                 submitButtonLabel={this.state.editingMode ? 'Сохранить' : 'Создать'}
//                 anotherButtons={buttonsParams}
//                 // title='Заполните поля'
//             >
//                 <input
//                     label={'Номинал'}
//                     name="newCoinPar"
//                     placeholder="Номинал"
//                     value={this.state.newCoinPar}
//                     onChange={this.handleInputChange}
//                     required={true}
//                     type='number'
//                     // pattern='^[0-9]+$'
//                     min={0}
//                     autoComplete="off"
//                 // onInvalid={(e)=>{console.log(e)}}
//                 />
//                 <input
//                     label={'Кол-во'}
//                     name="newCoinCount"
//                     placeholder="Текущее кол-во монет в автомате"
//                     value={this.state.newCoinCount}
//                     onChange={this.handleInputChange}
//                     required={true}
//                     type='number'
//                     max={this.state.newCoinMaxCount}
//                     min={0}
//                     autoComplete="off"
//                 />
//                 <input
//                     label={'Макс. кол-во'}
//                     name="newCoinMaxCount"
//                     placeholder="Максимальное кол-во монет в автомате"
//                     value={this.state.newCoinMaxCount}
//                     onChange={this.handleInputChange}
//                     type='number'
//                     required={true}
//                     min={0}
//                     autoComplete="off"
//                 />
//             </Form>
//         )
//     };
// };

// function mapStateToProps(state) {
//     return {
//         // sum: state.sum,
//         // purchase: state.purchase,
//         // coins: state.coins,
//         coins: state.coins,
//         // basket: state.basket
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         // setSum: bindActionCreators(setSum, dispatch),
//         // resetSum: bindActionCreators(resetSum, dispatch),
//         // setPurchase: bindActionCreators(setPurchase, dispatch),
//         // setBasket: bindActionCreators(setBasket, dispatch),
//         setCoins: bindActionCreators(setCoins, dispatch)
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CoinForm)

//     // setTableSource = () => {
//     //     const tableSource = [
//     //         {
//     //             name: 'Номинал',
//     //             inputComponent: <input
//     //                 name="newCoinPar"
//     //                 placeholder="Номинал"
//     //                 value={this.state.newCoinPar}
//     //                 onChange={this.handleInputChange}
//     //                 required={true}
//     //                 type='number'
//     //                 // pattern='^[0-9]+$'
//     //                 min={0}
//     //             // onInvalid={(e)=>{console.log(e)}}
//     //             />
//     //         },
//     //         {
//     //             name: 'Кол-во',
//     //             inputComponent: <input
//     //                 name="newCoinCount"
//     //                 placeholder="Текущее кол-во монет в автомате"
//     //                 value={this.state.newCoinCount}
//     //                 onChange={this.handleInputChange}
//     //                 required={true}
//     //                 type='number'
//     //                 max={this.state.newCoinMaxCount}
//     //                 min={0}
//     //             />
//     //         },
//     //         {
//     //             name: 'Макс. кол-во',
//     //             inputComponent: <input
//     //                 name="newCoinMaxCount"
//     //                 placeholder="Максимальное кол-во монет в автомате"
//     //                 value={this.state.newCoinMaxCount}
//     //                 onChange={this.handleInputChange}
//     //                 type='number'
//     //                 required={true}
//     //                 min={0}
//     //             />
//     //         },
//     //     ]
//     //     this.setState({ tableSource: tableSource })
//     // }