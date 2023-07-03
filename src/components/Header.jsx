import React, { Component } from 'react';
// import image from '../../public/images/basket_icon.png'
import SelectBox from './generic/SelectBox.jsx';
import { SELECTBOX_PRODUCT_SOURCE, SELECTBOX_COIN_SOURCE } from '../utils/constants'
import Cart from './Cart.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProductSorting, setCoinSorting } from '../store/actions/actionCreator.js'


class Header extends Component {
    render() {

        return (
            <div id="header">
                <SelectBox
                    // value={this.state.selectedProductValue}
                    title={'Продукты'}
                    defaultName={'Отсортировать товар...'}
                    source={SELECTBOX_PRODUCT_SOURCE}
                    onChange={e => {
                        const sort = e.target.value
                        // console.log(sort)
                        this.props.setProductSorting(sort)
                        // this.props.setProducts(this.props.products, sort)
                        // this.setState({ selectedProductValue: e.target.value }) 
                    }}
                />
                <SelectBox
                    title={'Монеты'}
                    defaultName={'Отсортировать валюту...'}
                    source={SELECTBOX_COIN_SOURCE}
                    onChange={e => {
                        const sort = e.target.value
                        this.props.setCoinSorting(sort)
                    }}
                />
                <Cart
                    // count={purchaseCountDifferentProduct}
                    onClick={(e) => {
                        console.log('hi', e)
                    }}
                />
                <div
                    className="login"
                    // onClick={this.toOpenLogin}
                    onClick={this.props.toLogin}
                >
                    {this.props.isLogin ? 'Logout' : 'Login'}
                    {/* <LoginPopup
                            toLogin={this.props.toLogin}
                        /> */}
                </div>
            </div>
        )
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setProductSorting: bindActionCreators(setProductSorting, dispatch),
        setCoinSorting: bindActionCreators(setCoinSorting, dispatch),
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(Header)

// export default Header;