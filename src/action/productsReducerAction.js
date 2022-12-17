const fetchProductsData = (data) => {
    const action = {
        type: "FETCH_PRODUCTS_DATA",
        payload: data
    }
    return action;
}

export default fetchProductsData;