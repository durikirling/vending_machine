
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDBProducts, editProduct, addProduct, deleteProduct } from '../../utils/server';
import { setProducts } from '../../store/actions/actionCreator';
import { bindActionCreators } from 'redux';
import Form from '../generic/Form/Form';
import notification from '../../utils/notificaion';
import Input from '../generic/Input';

// const PRODUCT_OBJECT_PARAMS = {
//   id: 'id',
//   productName: 'productName',
//   productPrice: 'productPrice',
//   productCount: 'productCount',
//   productImg: 'productImg'
// }

class ProductForm extends Component {

  state = {
    // id: this.props.source?.id ?? '',
    // productName: this.props.source?.productName ?? '',
    // productPrice: this.props.source?.productPrice ?? '',
    // productCount: this.props.source?.productCount ?? '',
    // productImg: this.props.source?.productImg ?? '',
    editingMode: this.props.source ? true : false
    // id: '',
    // newProductName: '',
    // newProductPrice: '',
    // newProductCount: '',
    // newProductImg: '',
    // editingMode: false
  }

  // getState = () => {
  //   return
  // }

  // componentDidMount() {
  //   // const source = this.props.source
  //   // if (source) {
  //   //   this.setState({
  //   //     productId: source.id,
  //   //     newProductName: source.productName,
  //   //     newProductPrice: source.productPrice,
  //   //     newProductCount: source.productCount,
  //   //     newProductImg: source.productImg,
  //   //     editingMode: true
  //   //   })
  //   // }
  // }

  // handleInputChange = (event) => {
  //   // console.log(event)
  //   // console.log(event.target)
  //   const target = event.target
  //   const name = target.name
  //   // const propsName = name.replace('newP', 'p')
  //   const value = target.value
  //   // console.log(value)
  //   // if (this.state.editingMode) {
  //   //   const style = { backgroundColor: 'orange', opacity: 0.2 }
  //   //   const elementStyle = document.getElementsByName(name)[0].style
  //   //   if (value != this.props.source[propsName]) {
  //   //     // document.getElementsByName(name)[0].style = {backgroundColor: 'orange'}
  //   //     elementStyle.backgroundColor = 'rgba(255, 200, 0, 0.3)'
  //   //     elementStyle.borderColor = 'orange'
  //   //   } else {
  //   //     elementStyle.backgroundColor = ''
  //   //     elementStyle.borderColor = ''
  //   //   }
  //   // }

  //   this.setState({ [name]: value })
  // }

  // inputFile = (e) => {
  //   // можно использовать в случае, если изображение находится в папке images данного проекта
  //   const image = "/images/" + e.target.files[0].name;
  //   this.setState({ productImg: image });

  //   // можно использовать с изображениями, находящимися в любой директории ПК, но назваие будет очень большим
  //   // const reader = new FileReader();
  //   // reader.onload = (e) => {
  //   //   const image = e.target.result;
  //   //   this.setState({ newProductImg: image });
  //   // };
  //   // reader.readAsDataURL(e.target.files[0])
  // };

  isProductNameUse = (newProduct) => {
    return this.props.products.some(product => product.productName.toLowerCase() === newProduct.productName.toLowerCase())
    // &&
    // newProduct.productName === this.props.products.find(item => item.id === newProduct.id)?.productName
  }

  // isFormValid = () => {
  //   const newProductCount = this.state.newProductCount
  //   const newProductPrice = this.state.newProductPrice
  //   const numberValid = newProductCount >= 0 && newProductPrice > 0
  //   if (this.state.editingMode) {
  //     return (!this.isProductNameUse() || this.state.newProductName === this.props.products.find(item => item.id === this.state.productId).productName) && numberValid
  //   } else {
  //     return !this.isProductNameUse() && numberValid
  //   }
  // }

  // submitCreateProduct = () => {
  //   if (this.isFormValid()) {
  //     const newProduct = {
  //       "productName": this.state.newProductName,
  //       "productCount": Number(this.state.newProductCount),
  //       "productPrice": Number(this.state.newProductPrice),
  //       "productImg": this.state.newProductImg
  //     }
  //     addProduct(newProduct)
  //       .then((res) => console.log(res))
  //       .catch((error) => console.log("SOMETHING WENT WRONG with CreateProduct", error))
  //       .finally(() => {
  //         getDBProducts()
  //           .then(res => {
  //             this.props.setProducts(res.data)
  //           })
  //           .catch((error) => {
  //             console.log("SOMETHING WENT WRONG with Get-Request", error)
  //           })
  //         this.props.closeForm()
  //       })
  //   } else { console.log('Create form Error') }
  // }

  // submitEditProduct = () => {
  //   if (this.isFormValid()) {
  //     const product = {
  //       "id": this.state.productId,
  //       "productName": this.state.newProductName, // .trim() - убираем пробелы в начале и конце .replace(/ +(?= )/g,'') - меняем множественные пробелы на один
  //       "productCount": Number(this.state.newProductCount), // .replace(/\s+/g, '') - убираем все пробелы
  //       "productPrice": Number(this.state.newProductPrice),
  //       "productImg": this.state.newProductImg
  //     }
  //     editProduct(product)
  //       .then((res) => console.log(res))
  //       .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
  //       .finally(() => {
  //         getDBProducts()
  //           .then(res => {
  //             this.props.setProducts(res.data)
  //           })
  //           .catch((error) => {
  //             console.log("SOMETHING WENT WRONG with Get-Request", error)
  //           })
  //         this.props.closeForm()
  //       })
  //   } else {
  //     console.log("Edit form Error")
  //   }
  // }

  deleteProduct = () => {
    deleteProduct(this.state.id)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
      .finally(() => {
        getDBProducts()
          .then(res => {
            this.props.setProducts(res.data)
          })
          .catch((error) => {
            console.log("SOMETHING WENT WRONG with Get-Request", error)
          })
      })
    this.props.closeForm()
  };

  // getFormButtons = () => {
  //   const formButtons = [
  //     { label: 'Удалить', onClick: (e) => this.deleteProduct() },
  //     // { label: 'Удалить', onClick: (e) => this.deleteProduct() },
  //     // { label: 'Удалить', onClick: (e) => this.deleteProduct() },
  //   ]
  //   return formButtons
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target.form)
    // const form = new Form(e.target)
    // console.log(form)
    const formData = new FormData(e.target)
    // console.log(Array.from(formData))

    let product = this.props.source ?? {}

    for (let [name, value] of formData) {
      // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
      console.log(name, ":", value)
      if (typeof (value) === 'string') {
        // console.log('value is string', typeof (value))
        product[name] = value.trim().replace(/ +(?= )/g, '')
        // .trim() - убираем пробелы в начале и конце 
        // .replace(/ +(?= )/g,'') - меняем множественные пробелы на один
      }
    }

    console.log(product)

    // if (this.isProductNameUse(product)) {
    //   notification({ text: 'name error', type: 'error' }, 3000)
    //   return null
    // }

    if (this.state.editingMode) {
      this.submitEdit(product)
    } else {
      this.submitCreate(product)
    }

  }

  submitEdit = (product) => {
    console.log(product)
    editProduct(product)
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
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
  }

  submitCreate = (product) => {
    addProduct(product)
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
  }

  // onReset = () => {
  //   if (this.state.editingMode) {
  //     const source = this.props.source
  //     this.setState({
  //       productId: source.id,
  //       newProductName: source.productName,
  //       newProductPrice: source.productPrice,
  //       newProductCount: source.productCount,
  //       newProductImg: source.productImg
  //     })
  //   } else {
  //     this.setState({
  //       newProductName: '',
  //       newProductPrice: '',
  //       newProductCount: '',
  //       newProductImg: '',
  //     })
  //   }
  // }

  render() {
    // const buttonsParams = this.state.editingMode ? this.getFormButtons() : null
    return (
      <Form
        handleSubmit={this.handleSubmit}
        onReset={this.onReset}
        // submitButtonLabel={this.state.editingMode ? 'Сохранить' : 'Создать'}
        // anotherButtons={buttonsParams}
        isHighlightChanges={this.state.editingMode}
      >
        {/* <input
          // style={{backgroundColor: this.state.newProductName === this.props.source.productName ? '' : 'orange'}}
          id='productName'
          label='Название'
          name="productName"
          placeholder="Наименование продукта"
          value={this.state.productName}
          onChange={this.handleInputChange}
          required={true}
          autoComplete="off"
        /> */}
        <Input
          id='productName'
          label='Название'
          name="productName"
          placeholder="Наименование продукта"
          value={this.props.source?.productName}
          // onChange={this.handleInputChange}
          required={true}
          autoComplete="off"
        />
        <Input
          label='Цена'
          name="productPrice"
          placeholder="Стоимость продукта"
          value={this.props.source?.productPrice}
          // onChange={this.handleInputChange}
          type='number'
          required={true}
          min={0}
          autoComplete="off"
          // data-accept="\d"
        />
        {/* <input
          label='Цена'
          name="productPrice"
          placeholder="Стоимость продукта"
          value={this.state.productPrice}
          onChange={this.handleInputChange}
          type='number'
          required={true}
          min={0}
          autoComplete="off"
        /> */}
        <Input
          label='Количество'
          name="productCount"
          placeholder="Кол-во продукта в автомате"
          value={this.props.source?.productCount}
          // onChange={this.handleInputChange}
          type='number'
          required={true}
          min={0}
          autoComplete="off"
        />
        <Input
          label='Изображение'
          name="productImg"
          placeholder="Путь к файлу"
          value={this.props.source?.productImg}
          // onChange={this.handleInputChange}
          type="file"
          accept=".jpg,.png"
          alternativeFileInput={true}
        />
        {/* <Input
          style={{ border: 'none' }}
          label='или'
          type="file"
          className="input"
          accept=".jpg,.png"
          onChange={(e) => this.inputFile(e)}
        /> */}
        <button type='submit'>
          {this.state.editingMode ? 'Сохранить' : 'Создать'}
        </button>
        {this.state.editingMode ?
          <button onClick={(e) => this.deleteProduct()}>
            Удалить
          </button>
          : null
        }
        {/* <input
          label='checkbox'
          type='checkbox'
          name='cb'
        />
        <input
          label='radio'
          type='radio'
          name='radio'
        />
        <input
          label='range'
          type='range'
          name='range'
        />
        <textarea />
        <div>hi</div> */}
      </Form>
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