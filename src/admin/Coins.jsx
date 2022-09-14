
import React, { Component } from 'react';
import CreateCoin from './CoinCreate.jsx';
import EditCoin from './CoinEdit.jsx';

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCoinPar: "",
      newCoinCount: "",
      newCoinMaxCount: "",

      indexEditCoin: 0
    };
  };

  handleInputChange = (event) => {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    // if (Number.isInteger(event.target.value))
        // if (value.toString().includes())

    // Варианты ввода только цифр для создания монеты:
    // 1) запретить ввод не цифр с помощью HTML5 (type = 'number') - плохо, потому что дает ввести точку для дробных значений
    // 2) приводить введенную строчку к числу с помощью Number() - не очень удобно для пользователя
    // 3) проверять ввод на наличие не цифр и в таком случае не давать ввести - плохо, потому что будет возможно ввести значение 00 или 01, что не может являться номиналом
    // 4) удалять все вводимые не цифры при вводе - самое подходящее решение

    let onlyNumbers = Number(event.target.value.toString().replace(/[^0-9]/g, ''))
    
    this.setState({
      [event.target.name]: onlyNumbers
    });
  }

  isCoinUse = () => {
    for (let i = 0; i < this.props.coins.length; i++) {
      if (Number(this.state.newCoinPar) === Number(this.props.coins[i].coinPar))
        return false // монета с таким номиналом уже существует
    }
    return true // монеты с таком номиналом нет
  }

  createCoin = () => {
    let array = Array.from(document.querySelectorAll('div[id="modalCreateCoin"]'))
    array[0].style.display = 'block'
  }

  submitCreateCoin = () => {
    // сделать проверку на пустые значения в полях
    // приведение к числу можно убрать
    // 
    if (this.isCoinUse()
      && this.state.newCoinCount <= this.state.newCoinMaxCount
      && this.state.newCoinCount >= 0
      && Number(this.state.newCoinPar) !== 0) {
      let newCoin = { "coinPar": Number(this.state.newCoinPar), "coinCount": Number(this.state.newCoinCount), "coinMaxCount": Number(this.state.newCoinMaxCount) }
      // let masCoin = this.props.coins.concat(newCoin).sort((a, b) => a.coinPar - b.coinPar)
      // this.props.addCoin(masCoin)
      this.props.addCoin(newCoin)
    }
    this.exitCreateCoin()
  }

  exitCreateCoin = () => {
    let array = Array.from(document.querySelectorAll('div[id="modalCreateCoin"]'))
    array[0].style.display = 'none'
    this.setState({
      newCoinPar: "",
      newCoinCount: "",
      newCoinMaxCount: ""
    });
  }

  editCoin = (index) => {
    this.setState({
      newCoinPar: this.props.coins[index].coinPar,
      newCoinCount: this.props.coins[index].coinCount,
      newCoinMaxCount: this.props.coins[index].coinMaxCount,
      indexEditCoin: index
    });

    let array = Array.from(document.querySelectorAll('div[id="modalEditCoin"]'))
    array[0].style.display = 'block'
  }

  submitEditCoin = () => {
    if ((this.isCoinUse()
      || this.state.newCoinPar === this.props.coins[this.state.indexEditCoin].coinPar)
      && this.state.newCoinCount <= this.state.newCoinMaxCount
      && this.state.newCoinCount >= 0
      && this.state.newCoinPar !== 0)
      this.props.editCoin(this.state.indexEditCoin, this.state.newCoinPar, this.state.newCoinCount, this.state.newCoinMaxCount)
    this.exitEditCoin()
  }

  exitEditCoin = () => {
    let array = Array.from(document.querySelectorAll('div[id="modalEditCoin"]'))
    array[0].style.display = 'none'
    this.setState({
      newCoinPar: "",
      newCoinCount: "",
      newCoinMaxCount: ""
    });
  }

  deleteCoin = () => {
    // this.props.addCoin(this.props.withoutIndex(this.props.coins, this.state.indexEditCoin))
    // this.exitEditCoin()

    this.props.deleteCoin(this.state.indexEditCoin)
    this.exitEditCoin()
  };

  render() {
    return (
      <div>
        <div className='coins'>
          <div className="coin">
            <div
              className="ruble"
              onClick={() => this.createCoin()}
              data-title="Создать монету"
            >
              <div
                className="createCoin"
              >+</div>

            </div>
          </div>
          {this.props.coins.map((item, index) => {
            if (item.coinCount === item.coinMaxCount)
              var coinOneOpacity = { opacity: 0.2 }
            else coinOneOpacity = {}
            return (
              <div
                key={index}
                className="coin">
                <div
                  className="ruble"
                  style={coinOneOpacity}
                  onClick={() => this.editCoin(index)}
                >{item.coinPar}₽</div>
                <div>{item.coinCount} из {item.coinMaxCount}</div>
                <div className="coinProgress">
                  <div
                    id="coinBar"
                    className="coinBar"
                  />
                  {/* {this.props.coins[index].coinCount/this.props.coins[index].coinMaxCount*100}% */}
                </div>
              </div>
            )
          })}
        </div>

        <CreateCoin
          newCoinPar={this.state.newCoinPar}
          newCoinCount={this.state.newCoinCount}
          newCoinMaxCount={this.state.newCoinMaxCount}

          handleInputChange={this.handleInputChange}

          createCoin={this.createCoin}
          submitCreateCoin={this.submitCreateCoin}
          exitCreateCoin={this.exitCreateCoin}

          inputFile={this.inputFile}
        ></CreateCoin>

        <EditCoin
          newCoinPar={this.state.newCoinPar}
          newCoinCount={this.state.newCoinCount}
          newCoinMaxCount={this.state.newCoinMaxCount}

          indexEditCoin={this.state.indexEditCoin}

          handleInputChange={this.handleInputChange}

          editCoin={this.editCoin}
          submitEditCoin={this.submitEditCoin}
          exitEditCoin={this.exitEditCoin}
          deleteCoin={this.deleteCoin}
        ></EditCoin>
      </div>
    )
  };
};

export default Coins;