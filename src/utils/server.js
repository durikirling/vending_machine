import axios from "axios";

const ADMIN_SERVER_URL = "http://localhost:5000/admin/" // -> /trade or /admin -> function_name
const SERVER_URL = "http://localhost:5000/trade/"

export function getDBProducts(sortProperty=null) {
  return axios.get(SERVER_URL + 'products/')//.then(result => {
  //   result.data.sort((a, b) => {
  //     switch (sortProperty) {
  //       case 'name_min':
  //         if (a.productName.toLowerCase() > b.productName.toLowerCase()) { return 1 }
  //         else { return -1 }
  //       case 'name_max':
  //         if (a.productName.toLowerCase() < b.productName.toLowerCase()) { return 1 }
  //         else { return -1 }
  //       case 'price_min':
  //         return a.productPrice - b.productPrice;
  //       case 'price_max':
  //         return b.productPrice - a.productPrice;
  //       case 'count_min':
  //         return a.productCount - b.productCount;
  //       case 'count_max':
  //         return b.productCount - a.productCount;
  //       default:
  //         return a.id - b.id;
  //     }
  //   })
  // })
}

export function addProduct(newProduct) {
  return axios.post(ADMIN_SERVER_URL + 'CreateProduct', newProduct)
}

export function editProduct(editProduct) {
  return axios.post(ADMIN_SERVER_URL + 'EditProduct', editProduct)
}

export function deleteProduct(removeProductId) {
  return axios.delete(ADMIN_SERVER_URL + 'RemoveProduct?id=' + removeProductId)
}

export function getDBCoins() {
  return axios.get(SERVER_URL + 'money/')
}

export function addCoin(newCoin) {
  return axios.post(ADMIN_SERVER_URL + 'CreateCoin', newCoin)
}

export function editCoin(editCoin) {
  return axios.post(ADMIN_SERVER_URL + 'EditCoin', editCoin)
}

export function deleteCoin(removeCoinId) {
  return axios.delete(ADMIN_SERVER_URL + 'RemoveCoin?id=' + removeCoinId)
}

//   addCoin = (newCoin) => { // добавляем в автомат новую монету (нового номинала)
//     let url = "http://localhost:5000/admin/CreateCoin"
//     axios
//       .post(url, newCoin)
//       .then((res) => console.log(res))
//       .catch((error) => console.log("SOMETHING WENT WRONG with CreateCoin", error))
//       .then(() => { this.getDBCoin(); })
//   }

//   editCoin = (indexEditCoin, newCoinPar, newCoinCount, newCoinMaxCount) => { // изменяем данные монеты в автомате
//     // this.setState(prevState => ({
//     //   coins:
//     //     prevState.coins.map((el, key) =>
//     //       key === indexEditCoin? {
//     //         coinPar: newCoinPar,
//     //         coinCount: newCoinCount,
//     //         coinMaxCount: newCoinMaxCount
//     //       } : el).sort((a, b) => a.coinPar - b.coinPar)
//     // }), ()=>this.moveAllIndicatorCoin());

//     let editCoin = { "id": this.state.coins[indexEditCoin].id, "coinPar": Number(newCoinPar), "coinCount": Number(newCoinCount), "coinMaxCount": Number(newCoinMaxCount) }
//     let url = "http://localhost:5000/admin/EditCoin"
//     axios
//       .post(url, editCoin)
//       .then((res) => console.log(res))
//       .catch((error) => console.log("SOMETHING WENT WRONG with EditCoin", error))
//       .then(() => { this.getDBCoin(); })
//   }

//   deleteCoin = (indexDeleteCoin) => {
//     console.log(this.state.coins[indexDeleteCoin].id)
//     let url = "http://localhost:5000/admin/RemoveCoin?id=" + this.state.coins[indexDeleteCoin].id
//     axios
//       .delete(url)
//       .then((res) => console.log(res))
//       .catch((error) => console.log("SOMETHING WENT WRONG with deleteCoin", error))
//       .then(() => { this.getDBCoin(); })
//   }

// addProduct = (newProduct) => { // добавляем в автомат новый продукт
//     // this.setState({product: this.state.product.concat(newProduct)});
//     let url = "http://localhost:5000/admin/CreateProduct"
//     axios
//       .post(url, newProduct)
//       .then((res) => console.log(res))
//       .catch((error) => console.log("SOMETHING WENT WRONG with CreateProduct", error))
//       .then(() => { this.getDBProduct(); })
//   }

//   editProduct = (indexEditProduct, newProductName, newProductImg, newProductCount, newProductPrice) => { // изменяем данные продукта в автомате
//     // this.setState(prevState => ({
//     //   product:
//     //     prevState.product.map((el, key) =>
//     //       key === indexEditProduct? {
//     //         productName: newProductName,
//     //         productImg: newProductImg,
//     //         productCount: newProductCount,
//     //         productPrice: newProductPrice
//     //       } : el)
//     // }));
//     let editProduct = { "id": this.state.product[indexEditProduct].id, "productName": newProductName, "productCount": Number(newProductCount), "productPrice": Number(newProductPrice), "productImg": newProductImg }
//     let url = "http://localhost:5000/admin/EditProduct"
//     axios
//       .post(url, editProduct)
//       .then((res) => console.log(res))
//       .catch((error) => console.log("SOMETHING WENT WRONG with EditProduct", error))
//       .then(() => { this.getDBProduct(); })
//   }

//   deleteProduct = (indexDeleteProduct) => {
//     console.log(this.state.product[indexDeleteProduct].id)
//     let url = "http://localhost:5000/admin/RemoveProduct?id=" + this.state.product[indexDeleteProduct].id
//     axios
//       .delete(url)
//       .then((res) => console.log(res))
//       .catch((error) => console.log("SOMETHING WENT WRONG with deleteProduct", error))
//       .then(() => { this.getDBProduct(); })
//   }