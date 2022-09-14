
import React, {Component} from 'react';

class EditProduct extends Component {

render() {
  return(
    <div 
    id="modalEditProduct" 
    className="modal"
    >
        <div className="modal-content">
            Изменение напитка:<br/>
            Название
            <input 
            name = "newProductName"
            placeholder="Номинал" 
            value={this.props.newProductName} 
            onChange={this.props.handleInputChange}
            /><br/>
            Цена
            <input 
            name = "newProductPrice"
            placeholder="Текущее кол-во монет в автомате" 
            value={this.props.newProductPrice} 
            onChange={this.props.handleInputChange}
            /><br/>
            Кол-во
            <input 
            name = "newProductCount"
            placeholder="Максимальное кол-во монет в автомате" 
            value={this.props.newProductCount} 
            onChange={this.props.handleInputChange}
            /><br/>
            Изображение
            <input 
            name = "newProductImg"
            placeholder="Изображение" 
            value={this.props.newProductImg} 
            onChange={this.props.handleInputChange}
            /><br/>
            или
            <input
            type="file"
            className="inputFile"
            accept=".jpg,.png"
            onChange={(e) => this.props.inputFile(e)}
            />
            <button onClick={this.props.submitEditProduct}>Изменить</button>
            <button onClick={this.props.deleteProduct}>Удалить</button>
            <div className="x" onClick={this.props.exitEditProduct}>x</div>
        </div> 
    </div>
    )
  };
};

export default EditProduct;