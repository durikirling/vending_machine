
import React, {Component} from 'react';

class EditCoin extends Component {

render() {
  return(
    <div 
    id="modalEditCoin" 
    className="modal"
    >
        <div className="modal-content">
            Изменение валюты:<br/>
            Номинал
            <input 
            name="newCoinPar"
            placeholder="Номинал" 
            value={this.props.newCoinPar} 
            onChange={this.props.handleInputChange}
            >
            </input><br/>
            Кол-во
            <input 
            name="newCoinCount"
            placeholder="Текущее кол-во монет в автомате" 
            value={this.props.newCoinCount} 
            onChange={this.props.handleInputChange}
            >
            </input><br/>
            Макс. кол-во
            <input 
            name="newCoinMaxCount"
            placeholder="Максимальное кол-во монет в автомате" 
            value={this.props.newCoinMaxCount} 
            onChange={this.props.handleInputChange}
            >
            </input><br/>
            <button onClick={this.props.submitEditCoin}>Изменить</button>
            <button onClick={this.props.deleteCoin}>Удалить</button>
            <div 
            className="x" 
            onClick={this.props.exitEditCoin}
            >
                x
            </div>
        </div> 
    </div>
    )
  };
};

export default EditCoin;