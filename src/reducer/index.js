import { combineReducers } from "redux";
import showPreviewCart from "./previewCartReducer";
import productList from "./productsReducer";
import categoryList from "./categoryReducer";
import productFilter from "./productsFilterReducer";
import cartList from "./cartReducer";
import userInfo from "./userInfoReducer";
import store from "./storeReducer";

export default combineReducers({
    showPreviewCart,
    productList,
    categoryList,
    productFilter,
    cartList,
    userInfo,
    store
});
