import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    setSum, 
    resetSum, 
    setPurchase, 
    setBasket, 
    setCoins, 
    setProducts 
  } from '../store/actions/actionCreator.js';


class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
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
        )
    };
};

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
)(Screen)