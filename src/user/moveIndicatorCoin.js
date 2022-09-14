import store from '../store/store'

export const moveAllIndicatorCoin = () => {
    const coinsStore = store.getState().coins
    for (let i = 0; i < coinsStore.length; i++)
        moveIndicatorCoin(i)
}

export const moveIndicatorCoin = (index) => { // определяем заполненность автомата монетой определенного номинала
    const coinsStore = store.getState().coins
    let array = Array.from(document.querySelectorAll('div[id="coinBar"]'))
    // if (this.props.coins[index].coinCount !== "..." && this.props.coins[index].coinMaxCount !== "...") 
    // {
    let indicator = coinsStore[index].coinCount / coinsStore[index].coinMaxCount * 100
    array[index].style.width = indicator + "%"

    if (indicator === 100)
        array[index].style.backgroundColor = 'red'
    else if (indicator >= 80)
        array[index].style.backgroundColor = 'orange'
    else array[index].style.backgroundColor = 'yellowgreen'
    // }
}