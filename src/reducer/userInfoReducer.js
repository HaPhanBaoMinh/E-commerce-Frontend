const reducer = (userInfo = null, action) => {

    switch (action.type) {
        case ("FETCH_USER_INFO_DATA"):
            return action.payload

        case ("LOGOUT_USER_INFO_DATA"):
            return null

        default:
            return userInfo
    }

}

export default reducer