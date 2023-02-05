import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  removeFromPurchase,
  removeProductFromBasket
} from '../../store/actions/actionCreator';
import { bindActionCreators } from 'redux';

class ProductCard extends Component {

  removeSoda = (product) => {
    this.props.removeFromPurchase(product.productPrice)
    this.props.removeProductFromBasket(product.id)
  }

  render() {
    const item = this.props.source

    if (!this.props.isAdmin) {
      if ((item.productCount - this.props.basket[item.id]) < 1 || item.productCount < 1) {
        // var canTakeSoda = { opacity: 0.2 }
        var classNa = 'soda cant-take-soda'
        var canTakeSoda = { background: 'black' }
      } else if (item.productPrice <= this.props.sum - this.props.purchase) {
        var canTakeSoda = { background: '#798' }
      }
    } else if (item.productCount < 1) {
      canTakeSoda = { animation: "spark 2000ms infinite" }
    } else if (item.productCount < 10) {
      canTakeSoda = { boxShadow: 'inset 0 0 20px 1px gold' }
    }
    // else var sodaClassName = item.productCount === '...'? 'soda hint' : 'soda'
    const defaultProduct = item.productCount === '...'
    //   559
    //   998
    //   978
    //   798
    //   else canTakeSoda = {}

    return (
      <div
        id={"soda_" + item.id}
        className={defaultProduct ? 'soda hint' : classNa ?? 'soda'}
        style={canTakeSoda}
        key={item.id}
        onClick={() => { this.props.onClick(item) }}
        data-title={defaultProduct ? 'При загрузке продуктов произошла ошибка. :(' : ''}
      >
        <img
          src={item.productImg}
          alt={item.productName}
        /><br />
        <b>{item.productName}</b><br />
        {item.productPrice} ₽<br />
        {item.productCount} шт.
        {this.props.basket[item.id] > 0 && !this.props.isAdmin &&
          <div style={{ position: "relative", /*display: this.props.basket[item.id] > 0 ? 'block' : 'none',*/ paddingTop: "10px" }}>
            <div
              className="minus"// hint"
              data-title={'Уменьшить кол-во продукта'}
              onClick={(event) => {
                this.removeSoda(item)
                event.stopPropagation()
              }}
            />
            <div className="purchase-count">{this.props.basket[item.id]}</div>
            <div
              className="plus"// hint" 
              data-title={'Увеличить кол-во продукта'} />
          </div>
        }
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    sum: state.sum,
    purchase: state.purchase,
    basket: state.basket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromPurchase: bindActionCreators(removeFromPurchase, dispatch),
    // addProductToBasket: bindActionCreators(addProductToBasket, dispatch),
    removeProductFromBasket: bindActionCreators(removeProductFromBasket, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard)