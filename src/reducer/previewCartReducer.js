const reducer = (previewCart = false, action) => {

    switch (action.type) {

        case ("OPEN_PREVIEW_CART"):
            return true

        case ("CLOSE_PREVIEW_CART"):
            return false

        default:
            return previewCart
    }

}

export default reducer