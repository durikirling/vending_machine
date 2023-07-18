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
    let cardClassName = 'product-card'

    if (!this.props.isAdmin) {
      if ((item.productCount - this.props.basket[item.id]) < 1 || item.productCount < 1) {
        // var canTakeSoda = { opacity: 0.2 }
        cardClassName += ' cant-take-product'
        var canTakeSoda = { background: 'black' }
      } else if (item.productPrice <= this.props.sum - this.props.purchase) {
        var canTakeSoda = { background: '#798' }
      }
    } else if (item.productCount < 1) {
      canTakeSoda = { animation: "spark 2000ms infinite" }
    } else if (item.productCount < 10) {
      canTakeSoda = { boxShadow: 'inset 0 0 20px 1px gold' }
    }
    // else var cardClassName = item.productCount === '...'? 'soda hint' : 'soda'
    const defaultProduct = item.productCount === '...'
    //   559
    //   998
    //   978
    //   798
    //   else canTakeSoda = {}
    let purchaseCountSelectSource = []
    for (let i = 0; i <= item.productCount; i++) {
      purchaseCountSelectSource.push({ value: i })
    }
    // this.props.basket[item.id]
    return (
      <div
        id={"soda_" + item.id}
        className={defaultProduct ? 'product-card hint' : cardClassName}
        style={canTakeSoda}
        key={item.id}
        onClick={() => { this.props.onClick(item) }}
        data-title={defaultProduct ? 'При загрузке продуктов произошла ошибка. :(' : ''}
      >
        <img className='product-img'
          src={item.productImg}
          alt={item.productName}
        /><br />

        <b>{item.productName}</b><br />
        <span> {/* тег нужен для того, чтобы правильно работала отмена opacity  */}
          {item.productPrice} ₽<br />
          {item.productCount} шт.
        </span>
        {this.props.basket[item.id] > 0 && !this.props.isAdmin &&
          <div className='product-purs-btns non-opaque'>
            <div
              className="minus-product-btn non-opaque"// hint"
              data-title={'Уменьшить кол-во продукта'}
              onClick={(event) => {
                event.stopPropagation()
                this.removeSoda(item)
              }}
            />
            <div className="purchase-count non-opaque">
              {/* {this.props.basket[item.id]} */}
              {/* <input
                type="number"
                min={0}
                max={item.productCount}
                step={1}
                value={this.props.basket[item.id]}
                onClick={event => event.stopPropagation()}
                onChange={(event) => {
                  this.props.onClick(item, event.target.value)
                }}
              /> */}
              <select
                onChange={event=>this.props.onClick(item, +event.target.value)}
                value={this.props.basket[item.id]}
                onClick={e=>e.stopPropagation()}
              >
                {
                  [...Array(item.productCount)].map((_, i) => i + 1).map(i =>
                    <option key={i} value={i}>{i}</option>
                  )
                }
              </select>
            </div>
            <div
              className="plus-product-btn non-opaque" // hint" 
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