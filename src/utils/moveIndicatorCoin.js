// import store from '../store/store'

// export const moveAllIndicatorCoin = () => {
//     const coinsStore = store.getState().coins
//     coinsStore.forEach(coin => {
//         moveIndicatorCoin(coin)
//     });
// }

// export const moveIndicatorCoin = (coin) => { // определяем заполненность автомата монетой определенного номинала
//     // const coinsStore = store.getState().coins
//     let coinBarElement = document.querySelector(`div[id="coinBar_${coin.id}"]`)
//     // if (this.props.coins[index].coinCount !== "..." && this.props.coins[index].coinMaxCount !== "...") 
//     // {
//     if (coinBarElement) {
//         // const coin = coinsStore.find(item => item.id === coin.id)
//         const indicator = coin.coinCount / coin.coinMaxCount * 100
//         coinBarElement.style.width = indicator + "%"

//         if (indicator === 100)
//             coinBarElement.style.backgroundColor = 'red'
//         else if (indicator >= 80)
//             coinBarElement.style.backgroundColor = 'orange'
//         else coinBarElement.style.backgroundColor = 'yellowgreen'
//     } else {
//         console.log(`Problem with searching coinBarElement (coinBar_${coin.id}) in moveIndicatorCoin`)
//     }
//     // }
// }