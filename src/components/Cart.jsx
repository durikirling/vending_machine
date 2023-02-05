import React, { Component } from 'react';
// import image from '../../public/images/basket_icon.png'

class Cart extends Component {
    render() {

        return (
            <div
            className='cart'
                // style={{
                //     position: 'absolute',
                //     width: 60,
                //     height: 60,
                //     top: 0,
                //     right: 250,
                //     cursor: 'pointer',
                //     padding: 0,
                //     backgroundImage: '/images/basket_icon.png'
                // }}
                onClick={(e) => this.props.onClick(e)}
            >
                < img
                  style={{
                    // position: 'absolute',
                    // width: 50,
                    // height: 50,
                    top: 0,
                    right: 250,
                    padding:0
                  }}
                  src={'/images/basket_icon.png'}
                  alt={'basket_icon.png'}
                />
                <div
                    style={{
                        position: 'absolute',
                        // width: 20,
                        // height: 20,
                        top: 22,
                        right: 40,
                        borderRadius: '100%',
                        // backgroundColor: 'red'
                        color: 'black'
                    }}
                    className="">{this.props.count}</div>
            </div>
        )
    };
};

export default Cart;