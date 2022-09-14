
import React, {Component} from 'react';
import CreateProduct from './ProductCreate.jsx';
import EditProduct from './ProductEdit.jsx';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newProductName: "",
          newProductPrice: "",
          newProductCount: "",
          newProductImg: "",
          indexEditProduct: ""
        };
      };


      handleInputChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      
    inputFile = (e) => {
        // можно использовать в случае, если изображение находится в папке images данного проекта
        // const image = "/images/" + e.target.files[0].name;
        // this.setState({newProductImg: image});

        // можно использовать с изображениями, находящимися в любой дериктории ПК
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = e.target.result;
            this.setState({newProductImg: image});
        };
        reader.readAsDataURL(e.target.files[0])
    };
      
      isProductUse = () => {
        for (let i=0; i<this.props.product.length; i++) {
          if (this.state.newProductName.toLowerCase() === this.props.product[i].productName.toLowerCase()) 
            return false 
        }
        return true
      }

      createProduct = () => {
        let array = Array.from(document.querySelectorAll('div[id="modalCreateProduct"]'))
        array[0].style.display = 'block'
    }
    
      submitCreateProduct = () => {
        if (this.isProductUse() &&  this.state.newProductCount>=0 && this.state.newProductPrice>0)
        {
          let newProduct = {"productName": this.state.newProductName, "productCount": Number(this.state.newProductCount), "productPrice": Number(this.state.newProductPrice), "productImg": this.state.newProductImg}
          // let masProduct = this.props.product.concat(newProduct)//.sort((a, b) => a.productName - b.productName)
          this.props.addProduct(newProduct)
        }
        this.exitCreateProduct()
      }
      
      exitCreateProduct = () => {
        let array = Array.from(document.querySelectorAll('div[id="modalCreateProduct"]'))
        array[0].style.display = 'none'
        this.setState(()=>{
          return {
            newProductName: "",
            newProductPrice: "",
            newProductCount: "",
            newProductImg: ""
        }}/*,()=>{}*/);
      }

      editProduct = (index) => {
        this.setState({
          newProductName: this.props.product[index].productName,
          newProductPrice: this.props.product[index].productPrice,
          newProductCount: this.props.product[index].productCount,
          newProductImg: this.props.product[index].productImg,
          indexEditProduct: index
        });
        console.log(index)
        let array = Array.from(document.querySelectorAll('div[id="modalEditProduct"]'))
        array[0].style.display = 'block'
      }
    
      submitEditProduct = () => {
        if ((this.isProductUse()
            || this.state.newProductName === this.props.product[this.state.indexEditProduct].productName)
            && this.state.newProductCount>=0 
            && this.state.newProductPrice>0)
            this.props.editProduct(this.state.indexEditProduct,this.state.newProductName, this.state.newProductImg,this.state.newProductCount,this.state.newProductPrice)
        this.exitEditProduct()
      }
    
      exitEditProduct = () => {
        let array = Array.from(document.querySelectorAll('div[id="modalEditProduct"]'))
        array[0].style.display = 'none'
        this.setState({
            newProductName: "",
            newProductPrice: "",
            newProductCount: "",
            newProductImg: ""
        });
      }
    
      // deleteProduct = () => {
      //   this.props.addProduct(this.props.withoutIndex(this.props.product, this.state.indexEditProduct))
      //   this.exitEditProduct()
      // };

      deleteProduct = () => {
        this.props.deleteProduct(this.state.indexEditProduct)
        this.exitEditProduct()
      };

render() {
  return(
      <div>
    <div className="allSoda">
                    <div  
                    className="soda" 
                    onClick={this.createProduct}
                    >
                        <div 
                        className="createSoda"
                        >+</div>
                    </div>
                    {this.props.product.map((item, index) => {
                        // if (item.productCount === 0)
                        //   var canTakeSoda = {opacity: 0.2}
                        // else if (item.productPrice <= this.props.sum - this.props.purchase)
                        //   canTakeSoda = {background: '#798'}
                        // else canTakeSoda = {}
                        return(
                            <div  
                            className="soda" 
                            // style={canTakeSoda} 
                            key={index}  
                            onClick={() => this.editProduct(index)}
                            data-title = "Изменить напиток"
                            >     
                                <img 
                                src={item.productImg}  
                                alt={item.productName}
                                /><br/>
                                {item.productName}<br/>
                                {item.productPrice} ₽<br/>
                                {item.productCount} шт.
                            </div>
                        )             
                    })}
                </div>
                <CreateProduct
                newProductName = {this.state.newProductName}
                newProductPrice = {this.state.newProductPrice}
                newProductCount = {this.state.newProductCount}
                newProductImg = {this.state.newProductImg}
        
                submitCreateProduct = {this.submitCreateProduct}
                exitCreateProduct = {this.exitCreateProduct}

                handleInputChange = {this.handleInputChange}

                inputFile = {this.inputFile}
                ></CreateProduct>
                <EditProduct
                newProductName = {this.state.newProductName}
                newProductPrice = {this.state.newProductPrice}
                newProductCount = {this.state.newProductCount}
                newProductImg = {this.state.newProductImg}
        
                editProduct = {this.editProduct}
                submitEditProduct = {this.submitEditProduct}
                exitEditProduct = {this.exitEditProduct}
                deleteProduct = {this.deleteProduct}

                handleInputChange = {this.handleInputChange}
        
                inputFile = {this.inputFile}
                ></EditProduct>
                </div>
    )
  };
};

export default Products;