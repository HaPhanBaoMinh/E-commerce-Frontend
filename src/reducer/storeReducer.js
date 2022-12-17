const reducer = (store = null, action) => {

    switch (action.type) {
        case ("FETCH_STORE_DATA"):
            return action.payload;

        default:
            return store
    }

}

export default reducer