
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDBProducts, editProduct, addProduct, deleteProduct } from '../../utils/server';
import { setProducts } from '../../store/actions/actionCreator';
import { bindActionCreators } from 'redux';
import FormTable from '../generic/FormTable';

class ProductForm extends Component {

  state = {
    newProductName: '',
    newProductPrice: '',
    newProductCount: '',
    newProductImg: '',
    editingMode: false,
    buttons: <></>
  }

  componentDidMount() {
    const product = this.props.source
    // const firstBtn = <button onClick={()=>{if (this.state.editingMode) {this.submitEditProduct()} else {this.submitCreateProduct()}}}>{this.state.editingMode ? 'Изменить':'Сохранить'}</button>
    // const secondBtn = <button onClick={()=>{if (this.state.editingMode) {this.deleteProduct()} else {this.props.closeForm()}}}>{this.state.editingMode ? 'Удалить':'Отменить'}</button>

    if (product) {
      const buttons = <div>
        <button onClick={this.submitEditProduct}>Изменить</button>
        <button onClick={this.deleteProduct}>Удалить</button>
      </div>
      this.setState({
        productId: product.id,
        newProductName: product.productName,
        newProductPrice: product.productPrice,
        newProductCount: product.productCount,
        newProductImg: product.productImg,
        editingMode: true,
        buttons: buttons
      }
        , () => { this.setTableSource() }
      )
    } else {
      const buttons = <>
        <button onClick={this.submitCreateProduct}>Сохранить</button>
        {/* <button onClick={() => { this.props.closeForm() }}>Отменить</button> */}
      </>
      this.setState({
        buttons: buttons
      }
        , () => { this.setTableSource() }
      )
    }

  }

  setTableSource = () => {
    const tableSource = [
      {
        name: 'Название',
        value: <input
          name="newProductName"
          placeholder="Наименование продукта"
          value={this.state.newProductName}
          onChange={this.handleInputChange}
        />
      },
      {
        name: 'Цена',
        value: <input
          name="newProductPrice"
          placeholder="Стоимость продукта"
          value={this.state.newProductPrice}
          onChange={this.handleInputChange}
        />
      },
      {
        name: 'Кол-во',
        value: <input
          name="newProductCount"
          placeholder="Кол-во продукта в автомате"
          value={this.state.newProductCount}
          onChange={this.handleInputChange}
        />
      },
      {
        name: 'Изображение',
        value: <input
          name="newProductImg"
          placeholder="Изображение"
          value={this.state.newProductImg}
          onChange={this.handleInputChange}
        />
      },
    ]
    this.setState({ tableSource: tableSource })
  }

  handleInputChange = (event) => {
    // console.log(event)
    // console.log(event.target)
    this.setState({
      [event.target.name]: event.target.value
    }, () => { this.setTableSource() });
  }

  inputFile = (e) => {
    // можно использовать в случае, если изображение находится в папке images данного проекта
    // const image = "/images/" + e.target.files[0].name;
    // this.setState({newProductImg: image});

    // можно использовать с изображениями, находящимися в любой директории ПК
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target.result;
      this.setState({ newProductImg: image });
    };
    reader.readAsDataURL(e.target.files[0])
  };

  isProductNameUse = () => {
    return this.props.products.some(product => product.productName.toLowerCase() === this.state.newProductName.toLowerCase())
  }

  isFormValid = () => {
    const newProductCount = this.state.newProductCount
    const newProductPrice = this.state.newProductPrice
    const numberValid = newProductCount >= 0 && newProductPrice > 0
    if (this.state.editingMode) {
      return (!this.isProductNameUse() || this.state.newProductName === this.props.products.find(item => item.id === this.state.productId).productName) && numberValid
    } else {
      return !this.isProductNameUse() && numberValid
    }
  }

  submitCreateProduct = () => {
    if (this.isFormValid()) {
      const newProduct = { 
        "productName": this.state.newProductName, 
        "productCount": Number(this.state.newProductCount), 
        "productPrice": Number(this.state.newProductPrice), 
        "productImg": this.state.newProductImg 
      }
      // let masProduct = this.props.product.concat(newProduct)//.sort((a, b) => a.productName - b.productName)
      addProduct(newProduct)
        .then((res) => console.log(res))
        .catch((error) => console.log("SOMETHING WENT WRONG with CreateProduct", error))
        .finally(() => {
          getDBProducts()
            .then(res => {
              this.props.setProducts(res.data)
            })
            .catch((error) => {
              console.log("SOMETHING WENT WRONG with Get-Request", error)
            })
          this.props.closeForm()
        })
    } else { console.log('Create form Error') }
  }

  submitEditProduct = () => {
    if (this.isFormValid()) {
      const product = {
        "id": this.state.productId,
        "productName": this.state.newProductName, // .trim() - убираем пробелы в начале и конце .replace(/ +(?= )/g,'') - меняем множественные пробелы на один
        "productCount": Number(this.state.newProductCount), // .replace(/\s+/g, '') - убираем все пробелы
        "productPrice": Number(this.state.newProductPrice),
        "productImg": this.state.newProductImg
      }
      editProduct(product)
        .then((res) => console.log(res))
        .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
        .finally(() => {
          getDBProducts()
            .then(res => {
              // this.setState({
              //   product: res.data//.sort((a, b) => a.productName - b.productName),
              // });
              this.props.setProducts(res.data)
            })
            .catch((error) => {
              console.log("SOMETHING WENT WRONG with Get-Request", error)
            })
          this.props.closeForm()
        })
    } else {
      console.log("Edit form Error")
    }
  }

  deleteProduct = () => {
    deleteProduct(this.state.productId)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
      .finally(() => {
        getDBProducts()
          .then(res => {
            // this.setState({
            //   product: res.data//.sort((a, b) => a.productName - b.productName),
            // });
            this.props.setProducts(res.data)
          })
          .catch((error) => {
            console.log("SOMETHING WENT WRONG with Get-Request", error)
          })
      })
    this.props.closeForm()
  };

  render() {
    // const button = this.state.editingMode ?
    //   <div><button onClick={this.submitEditProduct}>Изменить</button> <button onClick={this.deleteProduct}>Удалить</button></div>
    //   : <div><button onClick={this.submitCreateProduct}>Сохранить</button> <button onClick={this.props.closeForm}>Отменить</button></div>

    // const tableSource = [
    //   // Номер параметра объекта будет равен номеру столбца в таблице, т.е.
    //   // значение поля name будет в первом столбце таблицы
    //   // значение поля inputComponent будет во втором столбце таблицы.
    //   // По сути, не имеет значения, как называется параметр объекта и есть ли этот параметр в другом объекте,
    //   // важен его порядковый номер среди прочих параметров объекта.
    //   // Проще было бы использовать массив, но в объекте легче ориентироваться на названия параметров при просмотре кода
    //   {
    //     name: 'Название',
    //     inputComponent: <input
    //       name="newProductName"
    //       placeholder="Наименование продукта"
    //       value={this.state.newProductName}
    //       onChange={this.handleInputChange}
    //     />
    //   },
    //   {
    //     name: 'Цена',
    //     inputComponent: <input
    //       name="newProductPrice"
    //       placeholder="Стоимость продукта"
    //       value={this.state.newProductPrice}
    //       onChange={this.handleInputChange}
    //     />
    //   },
    //   {
    //     name: 'Кол-во',
    //     inputComponent: <input
    //       name="newProductCount"
    //       placeholder="Кол-во продукта в автомате"
    //       value={this.state.newProductCount}
    //       onChange={this.handleInputChange}
    //     />
    //   },
    //   {
    //     name: 'Изображение',
    //     inputComponent: <input
    //       name="newProductImg"
    //       placeholder="Изображение"
    //       value={this.state.newProductImg}
    //       onChange={this.handleInputChange}
    //     />
    //   },
    // ]

    return (
      <div>
        <FormTable source={this.state.tableSource} />
        {/* <table>
          <thead>
            <tr>
              <td>Название</td>
              <td>
                <input
                  name="newProductName"
                  placeholder="Наименование продукта"
                  value={this.state.newProductName}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Цена</td>
              <td>
                <input
                  name="newProductPrice"
                  placeholder="Стоимость продукта"
                  value={this.state.newProductPrice}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Кол-во</td>
              <td>
                <input
                  name="newProductCount"
                  placeholder="Кол-во продукта в автомате"
                  value={this.state.newProductCount}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Изображение</td>
              <td>
                <input
                  name="newProductImg"
                  placeholder="Изображение"
                  value={this.state.newProductImg}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
          </thead>
        </table> */}
        или<br />
        <input
          type="file"
          className="input"
          accept=".jpg,.png"
          onChange={(e) => this.inputFile(e)}
        /><br />
        {/* {button} */}
        {/* <button onClick={firstBtnAction}>{firstBtnText}</button> 
          <button onClick={secondBtnAction}>{secondBtnText}</button> */}
        {/* <button onClick={() => { if (this.state.editingMode) { this.submitEditProduct() } else { this.submitCreateProduct() } }}>{this.state.editingMode ? 'Изменить' : 'Сохранить'}</button> */}
        {/* <button onClick={() => { if (this.state.editingMode) { this.deleteProduct() } else { this.props.closeForm() } }}>{this.state.editingMode ? 'Удалить' : 'Отменить'}</button> */}
        {this.state.buttons}
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProducts: bindActionCreators(setProducts, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)