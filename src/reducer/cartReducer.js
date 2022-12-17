const reducer = (cartList = [], action) => {

    switch (action.type) {
        case ("FETCH_CART_DATA"):
            return action.payload

        case ("ADDITEM_CART_DATA"):
            const newItem = action.payload;
            let indexOfProduct = 0;
            let isExistItem = false;
            cartList.map((item, index) => {
                if (item.sku === newItem.sku) {
                    isExistItem = true;
                    indexOfProduct = index;
                }
            })

            if (isExistItem) {
                const tmpArr = cartList;
                const item = tmpArr[indexOfProduct];
                item.quantity += newItem.quantity;
                return [...tmpArr];
            } else {
                return [...cartList, action.payload]
            }

        case ("REMOVEITEM_CART_DATA"):
            return cartList.filter(product => product.sku !== action.payload)

        case ("RESET_CART_DATA"):
            return [];

        default:
            return cartList
    }

}

export default reducer