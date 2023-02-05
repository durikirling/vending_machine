import React, { Component } from 'react';
import axios from 'axios';
// import '../App.css';
// import products from './db/products.json'
// import coins from './db/coins.json'
import User from "./User.jsx";
import Admin from "./Admin.jsx";
import { connect } from 'react-redux';
import { setCoins, setProducts, setProductFilter, setCoinFilter } from '../store/actions/actionCreator.js'
import { bindActionCreators } from 'redux';
// import { moveAllIndicatorCoin } from '../utils/moveIndicatorCoin.js'
import { getDBProducts, getDBCoins } from '../utils/server.js';
import SelectBox from './generic/SelectBox.jsx';
import { selectBoxProductSource, selectBoxCoinSource } from '../utils/constants'

class VendingMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // product: [], // напитки
      // coins: [], // монеты в автомате УПОРЯДОЧЕНЫ ПО ВОЗРАСТАНИЮ НОМИНАЛА

      isLogin: false, // права администратора
      selectedProductValue: '',
    };

  };

  componentDidMount() {
    // this.getDBProduct(); // получаем список товаров (газировки) в автомате
    // this.getDBCoin(); // получаем список монет в автомате
    axios.all([
      getDBProducts(),
      getDBCoins()
    ])
      .then(res => {
        // this.setState({
        //   product: res.data//.sort((a, b) => a.productName - b.productName),
        // });
        this.props.setProducts(res[0].data)
        this.props.setCoins(res[1].data, 'par_min')
      })
      .catch((error) => {
        console.log("SOMETHING WENT WRONG with Get-Request", error)
      })
      .finally(() => {
        // moveAllIndicatorCoin()
      })
  }

  // toLogout = () => { // разлогиниваемся
  //   this.setState({
  //     isLogin: false
  //   }, () => moveAllIndicatorCoin());
  // }

  toLogin = () => { // логинимся
    this.setState({
      isLogin: !this.state.isLogin
    }
      , () => {
        if (!this.state.isLogin)
          // moveAllIndicatorCoin()
          return null
      }
    );
  }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  render() {
    //   if (this.state.isLogin === true) {
    //     return (
    //       <Admin
    //         toLogout={this.toLogout}
    //       />
    //     )
    //   }
    //   else if (this.state.isLogin === false) {
    //     return (
    //       <User
    //         toLogin={this.toLogin}
    //       />
    //     )
    //   }
    //   else {
    //     return (
    //       <div>HELLO</div>
    //     )
    //   }
    // };
    return (
      <div className="vending_machine">
        <div
          className="login"
          // onClick={this.toOpenLogin}
          onClick={this.toLogin}
        >
          {this.state.isLogin ? 'Logout' : 'Login'}
          {/* <LoginPopup
          toLogin={this.props.toLogin}
        /> */}
        </div>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <SelectBox
            // value={this.state.selectedProductValue}
            title={'Продукты'}
            defaultName={'Отсортировать товар...'}
            source={selectBoxProductSource}
            onChange={e => {
              const sort = e.target.value
              // console.log(sort)
              this.props.setProductFilter(sort)
              // this.props.setProducts(this.props.products, sort)
              // this.setState({ selectedProductValue: e.target.value }) 
            }}
          />
          <SelectBox
            title={'Монеты'}
            defaultName={'Отсортировать валюту...'}
            source={selectBoxCoinSource}
            onChange={e => {
              const sort = e.target.value
              this.props.setCoinFilter(sort)
            }}
          />
        </div>
        {this.state.isLogin ?
          <Admin
            toLogout={this.toLogout}
          />
          :
          <User
            toLogin={this.toLogin}
          />
        }
      </div>
    )
  }
};

// export default App;

function mapStateToProps(state) {
  return {
    coins: state.coins,
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCoins: bindActionCreators(setCoins, dispatch),
    setProducts: bindActionCreators(setProducts, dispatch),
    setProductFilter: bindActionCreators(setProductFilter, dispatch),
    setCoinFilter: bindActionCreators(setCoinFilter, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendingMachine)

VendingMachine.propTypes = {
  // blogPost: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   title: PropTypes.string.isRequired,
  //   // и так далее
  // }).isRequired,

}