const fetchUserData = (data) => {
    return {
        type: "FETCH_USER_INFO_DATA",
        payload: data
    }
}

const logoutUserData = () => {
    return {
        type: "LOGOUT_USER_INFO_DATA",
    }
}

export { fetchUserData, logoutUserData }