export function filterProducts(source = [], sortName) {
    return source.sort((a, b) => {
        switch (sortName) {
            case 'name_min':
                if (a.productName.toLowerCase() > b.productName.toLowerCase()) { return 1 }
                else { return -1 }
            case 'name_max':
                if (a.productName.toLowerCase() < b.productName.toLowerCase()) { return 1 }
                else { return -1 }
            case 'price_min':
                return a.productPrice - b.productPrice;
            case 'price_max':
                return b.productPrice - a.productPrice;
            case 'count_min':
                return a.productCount - b.productCount;
            case 'count_max':
                return b.productCount - a.productCount;
            default:
                return a.id - b.id;
        }
    })
}

export function filterCoins(source = [], sortName) {
    return source.sort((a, b) => {
        switch (sortName) {
            case 'par_min':
                return a.coinPar - b.coinPar;
            case 'par_max':
                return b.coinPar - a.coinPar;
            case 'count_min':
                return a.coinCount - b.coinCount;
            case 'count_max':
                return b.coinCount - a.coinCount;
            default:
                return a.id - b.id;
        }
    })
}