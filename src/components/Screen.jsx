
import React, { Component } from 'react';
// import LoginPopup from './LoginPopup.jsx';
import { connect } from 'react-redux';

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
    purchase: state.purchase
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Screen)