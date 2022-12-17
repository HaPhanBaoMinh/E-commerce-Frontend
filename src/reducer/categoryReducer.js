const reducer = (categoryList = [], action) => {

    switch (action.type) {
        case ("FETCH_CATEGORY_DATA"):
            return [...action.payload]

        default:
            return categoryList
    }

}

export default reducer