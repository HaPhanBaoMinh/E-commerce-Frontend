const reducer = (productList = [], action) => {

    switch (action.type) {

        case ("FETCH_PRODUCTS_DATA"):
            return [...action.payload]

        default:
            return productList
    }

}

export default reducer