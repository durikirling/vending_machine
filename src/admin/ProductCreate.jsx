
import React, {Component} from 'react';

class CreateProduct extends Component {

render() {
  return(
    <div 
    id="modalCreateProduct" 
    className="modal"
    >
        <div className="modal-content">
        Создание напитка:<br/>
            <input 
            name = "newProductName"
            placeholder="Название"  
            onChange={this.props.handleInputChange} 
            value={this.props.newProductName}
            /><br/>
            <input 
            name = "newProductPrice"
            placeholder="Стоимость"  
            onChange={this.props.handleInputChange}  
            value={this.props.newProductPrice}
            /><br/>
            <input 
            name = "newProductCount"
            placeholder="Кол-во продукта"  
            onChange={this.props.handleInputChange} 
            value={this.props.newProductCount}
            /><br/>
            <input 
            name = "newProductImg"
            placeholder="Изображение"  
            onChange={this.props.handleInputChange} 
            value={this.props.newProductImg}
            /><br/>
            или 
            <input
            type="file"
            className="inputFile"
            // accept=".txt,.doc,.docx"
            onChange={(e) => this.props.inputFile(e)}
            />
            <button onClick={this.props.submitCreateProduct}>Создать</button>
            <div className="x" onClick={this.props.exitCreateProduct}>x</div>
        </div> 
    </div>
    )
  };
};

export default CreateProduct;