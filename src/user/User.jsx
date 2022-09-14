
import React, { Component } from 'react';
import axios from 'axios';
import LoginPopup from './LoginPopup.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from './Products.jsx';
import Coins from './Coins.jsx';
import { 
  setSum, 
  resetSum, 
  setPurchase, 
  setBasket, 
  setCoins, 
  setProducts 
} from '../store/actions/actionCreator.js';
import { moveAllIndicatorCoin } from './moveIndicatorCoin'
import Alert from './Alert.js';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  };

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          <div style={{position: 'absolute'}}>HO</div>
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
      }
    };
  };

  getChange = () => {
    let change = this.props.sum - this.props.purchase
    let storeCoins = this.props.coins
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

    for (let productIndex in this.props.basket) {
      if (this.props.basket[productIndex] > 0) {
        storeProducts[productIndex].productCount -= this.props.basket[productIndex]
      }
    }

    // for (let i = 0; i < storeCoins.length; i++) {
    //   storeCoins[i].coinCount = masCoin[i]
    //   // this.setState(prevState => ({
    //   //   coins:
    //   //     prevState.coins.map((el, key) =>
    //   //       key === i ? { ...el, coinCount: masCoin[i] } : el),
    //   // })
    //   // , () => {
    //   //   let url = "http://localhost:5000/trade/change"
    //   //   axios
    //   //     .post(url, this.state.coins)
    //   //     .then((res) => console.log(res))
    //   //     .catch((error) => console.log("SOMETHING WENT WRONG with getChange", error))
    //   //     .then(() => { this.getDBCoin(); })
    //   // }
    //   // );
    // }

    this.props.setProducts(storeProducts)
    this.props.setCoins(storeCoins)
    moveAllIndicatorCoin()

    // let url1 = "http://localhost:5000/trade/change"
    // axios
    //   .post(url1, storeCoins)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log("SOMETHING WENT WRONG with getChange", error))
    //   .then(() => { this.getDBCoin(); })

    // let url2 = "http://localhost:5000/trade/buy?id=" + this.props.products[index].id
    // axios
    //   .post(url2)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log("SOMETHING WENT WRONG with getSoda", error))
    //   .then(() => { this.getDBProduct(); })

    // this.props.getChange(masCoin)

    if (change > 0) {
      // console.log("Извините, в автомате недостаточно средств. Недосдача: "+ change +" ₽")
      //alert("Недосдача "+ change +" ₽")
      let array = Array.from(document.querySelectorAll('div[id="modalErr"]'))
      array[0].style.display = 'block'
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
    let array = Array.from(document.querySelectorAll('div[id="modalErr"]'))
    array[0].style.display = 'none'
    this.screenNull()
  }

  screenNull = () => {
    this.props.setSum(0)
    this.props.setPurchase(0)
    this.props.setBasket({})
    // заменить на reset
  }

  render() {
    return (
      <div className="App">
        {/* для подключения шрифта */}
        <link
          href='https://fonts.googleapis.com/css?family=Orbitron'
          rel='stylesheet'
          type='text/css'
        />
        <div className="vending_machine">
          <Products />
          <b id="screen">
            <div className="sum">
              ENTER : {this.props.sum} ₽<br /><br />
              PURCHASE  {/* AMOUNT */} : {this.props.purchase} ₽<br /><br />
              CHANGE : {this.props.sum - this.props.purchase} ₽
              {/* ВНЕСЕНО : {this.state.sum} ₽<br/><br/>
              ПОКУПКА : {this.state.purchase} ₽<br/><br/>
              СДАЧА : {this.state.change} ₽ */}
            </div>
          </b>
          <Coins />
          <div
            id="getChange"
            className="change"
            onClick={()=>this.createNotification('info')/* this.getChange */} // !!!!!!!!!!!!!!!!!
          >
            BUY
            {/* RETURN THE CHANGE */}
          </div>

          <div
            id="modalErr"
            className="modal"
          >
            <div className="modal-content">
              Извините, в автомате недостаточно средств. Недосдача: {this.state.change}  ₽<br />
              <button onClick={this.submitErr}>OK</button>
            </div>
          </div>

        </div>
        {/* <Alert type='success' message='MASAGE'></Alert> */}
        <LoginPopup
          toLogin={this.props.toLogin}
        />
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
    setBasket: bindActionCreators(setBasket, dispatch),
    setCoins: bindActionCreators(setCoins, dispatch),
    setProducts: bindActionCreators(setProducts, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)