const fetchCategoryData = (data) => {
    const action = {
        type: "FETCH_CATEGORY_DATA",
        payload: data
    }
    return action;
}

export default fetchCategoryData;