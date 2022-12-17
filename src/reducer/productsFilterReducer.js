const defaultFilter = {
    minPrice: 0,
    maxPrice: 100000000,
    categoryId: "all"
}

const reducer = (productFilter = defaultFilter, action) => {

    switch (action.type) {
        case ("UPDATE_FILTER_DATA"):
            return {
                minPrice: action.payload.minPrice,
                maxPrice: action.payload.maxPrice,
                categoryId: action.payload.categoryId,
            }

        default:
            return productFilter
    }

}

export default reducer