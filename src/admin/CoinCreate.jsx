
import React, {Component} from 'react';

class CreateCoin extends Component {
  render() {
    return(
      <div 
      id="modalCreateCoin" 
      className="modal"
      >
          <div className="modal-content">
              Создание валюты:<br/>
              <input 
              name="newCoinPar"
              placeholder="Номинал" 
              value={this.props.newCoinPar} 
              onChange={this.props.handleInputChange}
              // type='number'
              >
              </input><br/>
              <input 
              name="newCoinCount"
              placeholder="Текущее кол-во монет в автомате" 
              value={this.props.newCoinCount} 
              onChange={this.props.handleInputChange}
              >
              </input><br/>
              <input 
              name="newCoinMaxCount"
              placeholder="Максимальное кол-во монет в автомате" 
              value={this.props.newCoinMaxCount} 
              onChange={this.props.handleInputChange}
              >
              </input><br/>
              <button onClick={this.props.submitCreateCoin}>Создать</button>
              <div 
              className="x" 
              onClick={this.props.exitCreateCoin}
              >
                x
              </div>
          </div> 
      </div>
    )
  };
};

export default CreateCoin;