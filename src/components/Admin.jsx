
import React, { Component } from 'react';
// import axios from 'axios';
// import LoginPopup from './LoginPopup.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from './Products/Products.jsx';
import Coins from './Coins/Coins.jsx';
import ProductForm from './Products/ProductForm.jsx';
import {
  setSum,
  resetSum,
  setPurchase,
  setBasket,
  // setCoins,
  // setProducts
} from '../store/actions/actionCreator.js';
import Popup from './generic/Popup.jsx';
import CoinForm from './Coins/CoinForm.jsx';
// import { moveAllIndicatorCoin } from '../../utils/moveIndicatorCoin.js'
// import Alert from './Alert.js';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFormOpened: false,
      popupTitle: '',
      component: <></>
    };
  };

  // openCreationForm = (name) => {
  //   let component = <></>
  //   switch (name) {
  //     case 'product':
  //       component = <ProductForm
  //         closeForm={this.closeForm}
  //       />
  //       break;
  //     case 'coin':
  //       component = <CoinForm
  //         closeForm={this.closeForm}
  //       />
  //       break;
  //     default:
  //       break
  //   }
  //   this.setState({
  //     isFormOpened: true,
  //     component: component
  //   })
  // }

  closeForm = () => {
    // let array = Array.from(document.querySelectorAll('div[id="modalCreateProduct"]'))
    // array[0].style.display = 'none'
    this.setState(() => {
      return {
        isFormOpened: false
      }
    }/*,()=>{}*/);
  }

  openForm = (source, name) => {
    let component = <></>
    let popupTitle = ''
    switch (name) {
      case 'product':
        component = <ProductForm
          source={source}
          closeForm={this.closeForm}
        />
        popupTitle = source ? 'Изменение' : 'Создание'
        popupTitle += " напитка" 
        break;
      case 'coin':
        component = <CoinForm
          source={source}
          closeForm={this.closeForm}
        />
        popupTitle = source ? 'Изменение' : 'Создание'
        popupTitle += " монеты" 
        break;
      default:
        break
    }

    this.setState({
      isFormOpened: true,
      component: component,
      popupTitle: popupTitle
    });
  }

  render() {
    return (
        <div className="admin">
          <Products
            isAdmin={true}
            onClick={(product) => { this.openForm(product, 'product') }}
          >
            <div
              className="soda"
              onClick={() => this.openForm(null, 'product')}
              data-title="Создать товар"
            >
              <div
                className="createSoda" // &#10010;
              >+</div>
            </div>
          </Products>
          <Coins
            isAdmin={true}
            onClick={(coin) => { this.openForm(coin, 'coin') }}
          >
            <div className="coin">
              <div
                className="ruble"
                onClick={() => this.openForm(null, 'coin')}
                data-title="Создать монету"
              >
                <div
                  className="createCoin"
                >+</div>

              </div>
            </div>
          </Coins>

          {/* <div
            id="modalErr"
            className="modal"
          >
            <div className="modal-content">
              Извините, в автомате недостаточно средств. Недосдача: {this.state.change}  ₽<br />
              <button onClick={this.submitErr}>OK</button>
            </div>
          </div> */}
          <Popup
            visible={this.state.isFormOpened}
            title={this.state.popupTitle}
            closeForm={this.closeForm}
          >
            {this.state.component}
          </Popup>
          {/* <div
            className="login"
            onClick={this.props.toLogout}
          >
            Logout
          </div> */}
        </div>

      // <div className="App">
      //   <div className="vending_machine">
      //     <Products
      //     product = {this.props.product}
      //     addProduct = {this.props.addProduct}
      //     editProduct = {this.props.editProduct}
      //     // withoutIndex = {this.withoutIndex}
      //     deleteProduct = {this.props.deleteProduct}
      //     ></Products>
      //     <Coins
      //     coins = {this.props.coins}
      //     addCoin = {this.props.addCoin}
      //     editCoin = {this.props.editCoin}
      //     // withoutIndex = {this.withoutIndex}
      //     deleteCoin = {this.props.deleteCoin}
      //     ></Coins>
      //     <div 
      //     className="login" 
      //     onClick={this.props.toLogout}
      //     >
      //       Logout
      //     </div>
      //   </div>
      // </div>
    )
  };
};

// export default Admin;

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
    // setCoins: bindActionCreators(setCoins, dispatch),
    // setProducts: bindActionCreators(setProducts, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)