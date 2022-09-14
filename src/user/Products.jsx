import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProducts, addToPurchase, removeFromPurchase, addProductToBasket, removeProductFromBasket } from '../store/actions/actionCreator.js'

class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      purchaseCountSoda: {}
    };
  };

  getSoda = (productPrice, productCount, index) => {
    if (productPrice === '...') {
      console.log('Что-то пошло не так при загрузке товара, Вы не можете купить образец.')
      return null
    }
    if (productCount <= 0) {
      console.log('Товар закончился.')
      return null
    }
    if (productCount <= this.props.basket[index]) {
      console.log('Вы взяли максимальное количество товара.')
      return null
    }
    if (this.props.purchase + productPrice > this.props.sum) {
      console.log('Недостаточно средств для покупки.')
      return null
    }
    this.props.addProductToBasket(index)
    this.props.addToPurchase(productPrice)
  }

  removeSoda = (item, index) => {
    this.props.removeFromPurchase(item.productPrice)
    this.props.removeProductFromBasket(index)
  }

  render() {
    return (
      <div className="allSoda">
        {this.props.products.map((item, index) => {
          if (item.productCount < 1)
            var canTakeSoda = { opacity: 0.2 }
          else if (item.productPrice <= this.props.sum - this.props.purchase)
            canTakeSoda = { background: '#798' }
          // else var sodaClassName = item.productCount === '...'? 'soda hint' : 'soda'
          let sodaClassName = item.productCount === '...' ? 'soda hint' : 'soda'
          // 559
          // 998
          // 978
          // 798
          // else canTakeSoda = {}
          return (
            <div
              id="soda"
              className={sodaClassName}
              style={canTakeSoda}
              key={index}
              onClick={() => { this.getSoda(item.productPrice, item.productCount, index) }}
              data-title={'При загрузке продуктов произошла ошибка. :('}
            >
              <img
                src={item.productImg}
                alt={item.productName}
              /><br />
              {item.productName}<br />
              {item.productPrice} ₽<br />
              {item.productCount} шт.<div style={{ margin: "10px" }} />
              <div style={{ position: "relative", display: this.props.basket[index] > 0 ? 'block' : 'none' }}>
                <div
                  className="minus"// hint"
                  data-title={'Уменьшить кол-во продукта'}
                  onClick={(event) => {
                    this.removeSoda(item, index)
                    event.stopPropagation()
                  }}
                />
                <div className="purchase-count">{this.props.basket[index]}</div>
                <div
                  className="plus"// hint" 
                  data-title={'Увеличить кол-во продукта'} />
              </div>
            </div>
          )
        })}
      </div>
    )
  };
};

// export default Products;

function mapStateToProps(state) {
  return {
    products: state.products,
    sum: state.sum,
    purchase: state.purchase,
    basket: state.basket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProducts: bindActionCreators(setProducts, dispatch),
    addToPurchase: bindActionCreators(addToPurchase, dispatch),
    removeFromPurchase: bindActionCreators(removeFromPurchase, dispatch), 
    addProductToBasket: bindActionCreators(addProductToBasket, dispatch), 
    removeProductFromBasket: bindActionCreators(removeProductFromBasket, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)