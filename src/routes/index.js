import HeaderOnly from "../components/layouts/headerOnly";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Chekout/Checkout";
import Contact from "../pages/Contact/Contact";
import Deals from "../pages/Deals/Deals";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Product from "../pages/Product/Product";
import Products from "../pages/Products/Products";

const RouterComponent = [
    { path: "/", component: Home },
    { path: "/products", component: Products },
    { path: "/products/:sku", component: Product },
    { path: "/deals", component: Deals },
    { path: "/about", component: About },
    { path: "/contact", component: Contact },
    { path: "/cart", component: Cart },
    { path: "/login", component: Login },
    { path: "/checkout", component: Checkout, layout: HeaderOnly },
]

export { RouterComponent }