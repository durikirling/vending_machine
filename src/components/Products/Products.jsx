import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import {filterProducts} from  '../../utils/functions.js'
import './Product.css'

class Products extends Component {

  state = {
    filteredProducts: []
  }

  componentDidMount = () => {
    this.setState({ filteredProducts: filterProducts(this.props.products, this.props.productFilter) })
  }

  componentDidUpdate = (prevState) => {
    if (prevState.productFilter !== this.props.productFilter || prevState.products !== this.props.products)
      this.setState({ filteredProducts: filterProducts(this.props.products, this.props.productFilter) })
  }

  // filterProducts = () => {
  //   return this.props.products.sort((a, b) => {
  //     switch (this.props.productFilter) {
  //       case 'name_min':
  //         if (a.productName.toLowerCase() > b.productName.toLowerCase()) { return 1 }
  //         else { return -1 }
  //       case 'name_max':
  //         if (a.productName.toLowerCase() < b.productName.toLowerCase()) { return 1 }
  //         else { return -1 }
  //       case 'price_min':
  //         return a.productPrice - b.productPrice;
  //       case 'price_max':
  //         return b.productPrice - a.productPrice;
  //       case 'count_min':
  //         return a.productCount - b.productCount;
  //       case 'count_max':
  //         return b.productCount - a.productCount;
  //       default:
  //         return a.id - b.id;
  //     }
  //   })
  // }

  render() {
    return (
      <div className="allSoda">
        {this.props.children}
        {this.state.filteredProducts.map((item) => {
          // if (!this.props.isAdmin) {
          //   if (item.productCount < 1) {
          //     // var canTakeSoda = { opacity: 0.2 }
          //     var classNa = 'soda cant-take-soda' 
          //   } else if (item.productPrice <= this.props.sum - this.props.purchase) {
          //     var canTakeSoda = { background: '#798' }
          //   }
          // } else if (item.productCount < 1) {
          //   canTakeSoda = { animation: "spark 2000ms infinite" }
          // } else if (item.productCount < 10) {
          //   canTakeSoda = { boxShadow: 'inset 0 0 20px 1px gold' }
          // }
          // else var sodaClassName = item.productCount === '...'? 'soda hint' : 'soda'
          // const defaultProduct = item.productCount === '...'
          // 559
          // 998
          // 978
          // 798
          // else canTakeSoda = {}
          return (
            <ProductCard
              key={item.id}
              source={item}
              isAdmin={this.props.isAdmin}
              onClick={() => {
                this.props.onClick(item)
              }}
            // removeSoda={()=>this.props.removeSoda(item)}    
            />

            // <div
            //   id={"soda_"+item.id}
            //   className={defaultProduct ? 'soda hint' : classNa ?? 'soda'}
            //   style={canTakeSoda}
            //   key={item.id}
            //   // onClick={() => { this.getSoda(item.productPrice, item.productCount, index) }}
            //   onClick={() => { this.props.onClick(item) }}
            //   data-title={defaultProduct ? 'При загрузке продуктов произошла ошибка. :(' : ''}
            // >
            //   <img
            //     src={item.productImg}
            //     alt={item.productName}
            //   /><br />
            //   <b>{item.productName}</b><br />
            //   {item.productPrice} ₽<br />
            //   {item.productCount} шт.
            //   {this.props.basket[item.id] > 0 && !this.props.isAdmin &&
            //     <div style={{ position: "relative", /*display: this.props.basket[item.id] > 0 ? 'block' : 'none',*/ paddingTop: "10px" }}>
            //       <div
            //         className="minus"// hint"
            //         data-title={'Уменьшить кол-во продукта'}
            //         onClick={(event) => {
            //           this.props.removeSoda(item)
            //           event.stopPropagation()
            //         }}
            //       />
            //       <div className="purchase-count">{this.props.basket[item.id]}</div>
            //       <div
            //         className="plus"// hint" 
            //         data-title={'Увеличить кол-во продукта'} />
            //     </div>
            //   }
            // </div>
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
    productFilter: state.productFilter
    // sum: state.sum,
    // purchase: state.purchase,
    // basket: state.basket
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Products)