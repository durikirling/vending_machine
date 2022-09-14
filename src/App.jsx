import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// import products from './db/products.json'
// import coins from './db/coins.json'
import User from "./user/User.jsx";
import Admin from "./admin/Admin.jsx";
import { connect } from 'react-redux';
import { setCoins, setProducts } from './store/actions/actionCreator.js'
import { bindActionCreators } from 'redux';
import { moveAllIndicatorCoin } from './user/moveIndicatorCoin'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [], // напитки
      coins: [], // монеты в автомате УПОРЯДОЧЕНЫ ПО ВОЗРАСТАНИЮ НОМИНАЛА

      isLogin: false, // права администратора
    };

  };

  componentDidMount() {
    this.getDBProduct(); // получаем список товаров (газировки) в автомате
    this.getDBCoin(); // получаем список монет в автомате
  }

  getDBProduct = () => {
    let url = "http://localhost:5000/trade/products/"
    axios
      .get(url)
      .then((res) => {
        // console.log(res)
        this.props.setProducts(res.data)
        // this.setState({
        //   product: res.data//.sort((a, b) => a.productName - b.productName),
        // });
      })
      .catch((error) => {
        console.log("SOMETHING WENT WRONG with getDBProduct", error)

      })
  };

  getDBCoin = () => {
    let url = "http://localhost:5000/trade/money/"
    axios
      .get(url)
      .then((res) => {
        // console.log(res)
        this.props.setCoins(res.data.sort((a, b) => a.coinPar - b.coinPar))
        // this.setState({
        //   coins: res.data.sort((a, b) => a.coinPar - b.coinPar),
      })
      .then(() => {
        moveAllIndicatorCoin()
      })
      .catch((error) => console.log("SOMETHING WENT WRONG with getDBCoin", error))
  };

  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  // getChange = (masCoin) => { // получаем сдачу
  //   for (let i = 0; i < this.state.coins.length; i++) {
  //     this.setState(prevState => ({
  //       coins:
  //         prevState.coins.map((el, key) =>
  //           key === i ? { ...el, coinCount: masCoin[i] } : el),
  //     })
  //       , () => {
  //         let url = "http://localhost:5000/trade/change"
  //         axios
  //           .post(url, this.state.coins)
  //           .then((res) => console.log(res))
  //           .catch((error) => console.log("SOMETHING WENT WRONG with getChange", error))
  //           .then(() => { this.getDBCoin(); })
  //       }
  //     );
  //   }

  // }

  toLogout = () => { // разлогиниваемся
    this.setState({
      isLogin: false
    }, () => moveAllIndicatorCoin());
  }

  toLogin = () => { // логинимся
    this.setState({
      isLogin: true
    }/* , () => moveAllIndicatorCoin() */);
  }

  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  addProduct = (newProduct) => { // добавляем в автомат новый продукт
    // this.setState({product: this.state.product.concat(newProduct)});
    let url = "http://localhost:5000/admin/CreateProduct"
    axios
      .post(url, newProduct)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with CreateProduct", error))
      .then(() => { this.getDBProduct(); })
  }

  editProduct = (indexEditProduct, newProductName, newProductImg, newProductCount, newProductPrice) => { // изменяем данные продукта в автомате
    // this.setState(prevState => ({
    //   product:
    //     prevState.product.map((el, key) => 
    //       key === indexEditProduct? {
    //         productName: newProductName,
    //         productImg: newProductImg,
    //         productCount: newProductCount,
    //         productPrice: newProductPrice
    //       } : el)
    // }));
    let editProduct = { "id": this.state.product[indexEditProduct].id, "productName": newProductName, "productCount": Number(newProductCount), "productPrice": Number(newProductPrice), "productImg": newProductImg }
    let url = "http://localhost:5000/admin/EditProduct"
    axios
      .post(url, editProduct)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
      .then(() => { this.getDBProduct(); })
  }

  deleteProduct = (indexDeleteProduct) => {
    console.log(this.state.product[indexDeleteProduct].id)
    let url = "http://localhost:5000/admin/RemoveProduct?id=" + this.state.product[indexDeleteProduct].id
    axios
      .delete(url)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with deleteProduct", error))
      .then(() => { this.getDBProduct(); })
  }

  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  // addCoin = (masCoin) => { // добавляем в автомат новую монету (нового номинала)
  //   this.setState({
  //     coins: masCoin
  //   }, ()=>this.moveAllIndicatorCoin());
  // }

  addCoin = (newCoin) => { // добавляем в автомат новую монету (нового номинала)
    let url = "http://localhost:5000/admin/CreateCoin"
    axios
      .post(url, newCoin)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
      .then(() => { this.getDBCoin(); })
  }

  editCoin = (indexEditCoin, newCoinPar, newCoinCount, newCoinMaxCount) => { // изменяем данные монеты в автомате
    // this.setState(prevState => ({
    //   coins:
    //     prevState.coins.map((el, key) => 
    //       key === indexEditCoin? {
    //         coinPar: newCoinPar,
    //         coinCount: newCoinCount,
    //         coinMaxCount: newCoinMaxCount
    //       } : el).sort((a, b) => a.coinPar - b.coinPar)
    // }), ()=>this.moveAllIndicatorCoin());

    let editCoin = { "id": this.state.coins[indexEditCoin].id, "coinPar": Number(newCoinPar), "coinCount": Number(newCoinCount), "coinMaxCount": Number(newCoinMaxCount) }
    let url = "http://localhost:5000/admin/EditCoin"
    axios
      .post(url, editCoin)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
      .then(() => { this.getDBCoin(); })
  }

  deleteCoin = (indexDeleteCoin) => {
    console.log(this.state.coins[indexDeleteCoin].id)
    let url = "http://localhost:5000/admin/RemoveCoin?id=" + this.state.coins[indexDeleteCoin].id
    axios
      .delete(url)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with deleteCoin", error))
      .then(() => { this.getDBCoin(); })
  }

  render() {
    if (this.state.isLogin === true) {
      return (
        <Admin
          product={this.state.product}
          addProduct={this.addProduct}
          editProduct={this.editProduct}
          deleteProduct={this.deleteProduct}

          coins={this.state.coins}
          addCoin={this.addCoin}
          editCoin={this.editCoin}
          deleteCoin={this.deleteCoin}

          toLogout={this.toLogout}
        ></Admin>
      )
    }

    if (this.state.isLogin === false) {
      return (
        <User
          getChange={this.getChange}

          toLogin={this.toLogin}
        ></User>
      )
    }
  };
};

// export default App;

function mapStateToProps(state) {
  return {
    coins: state.coins
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCoins: bindActionCreators(setCoins, dispatch),
    setProducts: bindActionCreators(setProducts, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)