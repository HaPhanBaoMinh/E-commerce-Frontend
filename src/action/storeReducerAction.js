const fetchStoreData = (data) => {
    return {
        type: "FETCH_STORE_DATA",
        payload: data
    }
}

export { fetchStoreData }