const addNewItemToCartData = (data) => {
    const action = {
        type: "ADDITEM_CART_DATA",
        payload: data
    }
    return action;
}

const fetchCartData = (data) => {
    const action = {
        type: "FETCH_CART_DATA",
        payload: data
    }
    return action;
}

const removeItemFromCartData = (data) => {
    const action = {
        type: "REMOVEITEM_CART_DATA",
        payload: data
    }
    return action;
}

const resetCartData = (data) => {
    const action = {
        type: "RESET_CART_DATA",
    }
    return action;
}

export { addNewItemToCartData, removeItemFromCartData, resetCartData, fetchCartData };