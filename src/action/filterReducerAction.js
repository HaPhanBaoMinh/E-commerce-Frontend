const updateFilter = (data) => {
    const action = {
        type: "UPDATE_FILTER_DATA",
        payload: data
    }
    return action;
}

export default updateFilter;