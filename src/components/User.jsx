
import React, { Component } from 'react';
// import axios from 'axios';
// import LoginPopup from './LoginPopup.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from './Products/Products.jsx';
import Coins from './Coins/Coins.jsx';
import Screen from './Screen.jsx';
import {
  setSum,
  resetSum,
  setPurchase,
  setBasket,
  setCoins,
  setProducts, addToPurchase, removeFromPurchase, addProductToBasket, removeProductFromBasket,
  enterCoin, addToSum,
  resetPurchase, resetBasket
} from '../store/actions/actionCreator.js';
// import { moveAllIndicatorCoin, moveIndicatorCoin } from '../utils/moveIndicatorCoin.js'
// import Alert from './Alert.js';
import Cart from './Cart.jsx';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  };

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          <div style={{ position: 'absolute' }}>HO</div>
          break;
        // case 'success':
        //   NotificationManager.success('Success message', 'Title here');
        //   break;
        // case 'warning':
        //   NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        //   break;
        // case 'error':
        //   NotificationManager.error('Error message', 'Click me!', 5000, () => {
        //     alert('callback');
        // });
        // break;
        default:
          <div style={{ position: 'absolute' }}>default</div>
          break;
      }
    };
  };

  getChange = () => {
    let change = this.props.sum - this.props.purchase
    const storeCoins = this.props.coins.sort((a, b) => a.coinPar - b.coinPar)
    let storeProducts = this.props.products

    // массив для хранения текущего кол-ва монет в автомате, 
    // причем на 0 месте стоит кол-во монет наименьшего номинала 
    // и дальше по возрастающей соотвественно номиналу
    // var masCoin = [];
    // for (let i = 0; i < storeCoins.length; i++) {
    //   masCoin[i] = storeCoins[i].coinCount
    // }
    // for (let m = masCoin.length - 1; m >= 0; m--) {
    //   while (masCoin[m] > 0)
    //     if (change - storeCoins[m].coinPar >= 0) {
    //       masCoin[m] = --masCoin[m]
    //       change = change - storeCoins[m].coinPar
    //     }
    //     else break
    // }

    for (let i = storeCoins.length - 1; i >= 0; i--) {
      while (storeCoins[i].coinCount > 0)
        if (change - storeCoins[i].coinPar >= 0) {
          storeCoins[i].coinCount = --storeCoins[i].coinCount
          change = change - storeCoins[i].coinPar
        }
        else break
    }

    storeProducts = storeProducts.map(item => {
      const countToBuy = this.props.basket[item.id]
      if (countToBuy) {
        item.productCount -= countToBuy
        return item
      }
      return item
    })

    this.props.setProducts(storeProducts)
    this.props.setCoins(storeCoins)
    // moveAllIndicatorCoin()

    if (change > 0) {
      console.log(`Извините, в автомате недостаточно средств. Недосдача: ${change}₽`)
      //alert("Недосдача "+ change +" ₽")
      // let array = Array.from(document.querySelectorAll('div[id="modalErr"]'))
      // array[0].style.display = 'block'
    }
    else this.screenNull()
  }

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

  submitErr = () => {
    // let array = Array.from(document.querySelectorAll('div[id="modalErr"]'))
    // array[0].style.display = 'none'
    this.screenNull()
  }

  screenNull = () => {
    this.props.resetSum()
    this.props.resetPurchase()
    this.props.resetBasket()
  }

  getSoda = (product) => {
    const productPrice = product.productPrice, productCount = product.productCount
    if (productPrice === '...') {
      console.log('Что-то пошло не так при загрузке товара, Вы не можете купить образец.')
      return null
    }
    if (productCount <= 0) {
      console.log('Товар закончился.')
      return null
    }
    if (productCount <= this.props.basket[product.id]) {
      console.log('Вы взяли максимальное количество товара.')
      return null
    }
    if (this.props.purchase + productPrice > this.props.sum) {
      console.log('Недостаточно средств для покупки.')
      return null
    }
    this.props.addProductToBasket(product.id)
    this.props.addToPurchase(productPrice)
  }

  // removeSoda = (product) => {
  //   this.props.removeFromPurchase(product.productPrice)
  //   this.props.removeProductFromBasket(product.id)
  // }

  enterCoin = (coin) => { // вносим монету
    if (coin.coinPar === '...') {
      console.log('Что-то пошло не так при загрузке монет, Вы не можете оплатить образцом.')
      return null
    }
    if (coin.coinCount >= coin.coinMaxCount) {
      console.log(`Внесено максимально возможное количество монет данного номинала (${coin.coinPar}₽).`)
      return null
    }
    // console.log(coin)
    this.props.enterCoin(coin.id)
    this.props.addToSum(coin.coinPar)
    // console.log(coin)
    // moveIndicatorCoin(coin)
  }

  render() {
    let purchaseCountDifferentProduct = 0;
    const basket = this.props.basket
    for (let key in basket) {
      if (basket[key] > 0)
      purchaseCountDifferentProduct++;
    }

    return (
      <div className="user">
        <Products
          isAdmin={false}
          onClick={(product) => { this.getSoda(product) }}
        // removeSoda={(product) => this.removeSoda(product)}
        />
        <Screen />
        <Coins onClick={(coin) => { this.enterCoin(coin) }}
        />
        <div
          id="getChange"
          className="change"
          // onClick={() => this.createNotification('info')/* this.getChange */} // !!!!!!!!!!!!!!!!!
          onClick={this.getChange}
        >
          BUY
          {/* RETURN THE CHANGE */}
        </div>
        {purchaseCountDifferentProduct > 0 &&
        <Cart count={purchaseCountDifferentProduct}
        onClick={(e)=>{
          console.log('hi', e)
        }}></Cart>
          // <div style={{
          //   position: 'absolute',
          //   width: 100,
          //   height: 100,
          //   top: 0,
          //   right: 250
          // }}>
          //   < img
          //     style={{
          //       // position: 'absolute',
          //       // width: 50,
          //       // height: 50,
          //       top: 0,
          //       right: 250
          //     }}
          //     src={'/images/basket_icon.png'}
          //     alt={'basket_icon.png'}
          //   />
          //   <div
          //     style={{
          //       position: 'absolute',
          //       width: 20,
          //       height: 20,
          //       top: 32,
          //       right: 40,
          //       borderRadius: '100%',
          //       // backgroundColor: 'red'
          //       color: 'black'
          //     }}
          //     className="">{purchaseCountDifferentProduct}</div>
          // </div>
        }

        {/* <div
            id="modalErr"
            className="modal"
          >
            <div className="modal-content">
              Извините, в автомате недостаточно средств. Недосдача: {this.state.change}  ₽<br />
              <button onClick={this.submitErr}>OK</button>
            </div>
          </div> */}

        {/* <Alert type='success' message='MASAGE'></Alert> */}
        {/* <div
          className="login"
          // onClick={this.toOpenLogin}
          onClick={this.props.toLogin}
        >
          Login
          <LoginPopup
          toLogin={this.props.toLogin}
        />
        </div> */}

      </div>
    )
  };
};

// export default User;

function mapStateToProps(state) {
  return {
    sum: state.sum,
    purchase: state.purchase,
    coins: state.coins,
    products: state.products,
    basket: state.basket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSum: bindActionCreators(setSum, dispatch),
    resetSum: bindActionCreators(resetSum, dispatch),
    setPurchase: bindActionCreators(setPurchase, dispatch),
    resetPurchase: bindActionCreators(resetPurchase, dispatch),
    setBasket: bindActionCreators(setBasket, dispatch),
    resetBasket: bindActionCreators(resetBasket, dispatch),
    setCoins: bindActionCreators(setCoins, dispatch),
    setProducts: bindActionCreators(setProducts, dispatch),
    addToPurchase: bindActionCreators(addToPurchase, dispatch),
    removeFromPurchase: bindActionCreators(removeFromPurchase, dispatch),
    addProductToBasket: bindActionCreators(addProductToBasket, dispatch),
    removeProductFromBasket: bindActionCreators(removeProductFromBasket, dispatch),
    enterCoin: bindActionCreators(enterCoin, dispatch),
    addToSum: bindActionCreators(addToSum, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)