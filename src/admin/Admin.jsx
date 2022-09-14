
import React, {Component} from 'react';
import Products from './Products.jsx';
import Coins from './Coins.jsx';

class Admin extends Component {

  // withoutIndex = (array, index) => {
  //   return (array.slice(0, index).concat(array.slice(index + 1)))
  // };

  render() {
    return(
      <div className="App">
        <div className="vending_machine">
          <Products
          product = {this.props.product}
          addProduct = {this.props.addProduct}
          editProduct = {this.props.editProduct}
          // withoutIndex = {this.withoutIndex}
          deleteProduct = {this.props.deleteProduct}
          ></Products>
          <Coins
          coins = {this.props.coins}
          addCoin = {this.props.addCoin}
          editCoin = {this.props.editCoin}
          // withoutIndex = {this.withoutIndex}
          deleteCoin = {this.props.deleteCoin}
          ></Coins>
          <div 
          className="login" 
          onClick={this.props.toLogout}
          >
            Logout
          </div>
        </div>
      </div>
    )
  };
};

export default Admin;