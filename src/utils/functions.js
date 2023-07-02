export function sortingProducts(source = [], sortName) {
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

export function sortingCoins(source = [], sortName) {
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

export function addElementToDOM(container, rootId = 'portal') {

    // const appendChild = (parent, child) => {
    //     if (Array.isArray(child))
    //       child.forEach(nestedChild => appendChild(parent, nestedChild));
    //     else
    //       parent.appendChild(child.nodeType ? child : document.createTextNode(child));
    //   };

    let root = document.getElementById(rootId)
    if (!root) { // createAlterRoot
        root = Object.assign(document.createElement('div'), { id: rootId })
        root.appendChild(container)
        document.body.appendChild(root)
    } else {
        root.appendChild(container)
    }

}