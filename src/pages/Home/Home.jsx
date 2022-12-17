import React, { useEffect, useRef } from 'react'
import ProductBanner from '../../components/banner/ProductBanner'
import BestSellers from '../../components/bestSeller/BestSellers'
import Button_1 from '../../components/buttons/Button_1'
import Category from '../../components/category/Category'
import ProductDescription from '../../components/productDescription/ProductDescription'
import Subscriber from '../../components/subscribe/Subscriber'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux'

function Home() {
    const userInfo = useSelector(state => state.userInfo);
    const toastOption = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (userInfo) {
            toast.success(`WelcomeBack! ${userInfo.firstname}`, toastOption);
        }
    }, [userInfo])

    return (
        <div>
            <ProductBanner />
            <BestSellers />
            <ProductDescription />
            <Category />
            <Subscriber />
            <ToastContainer />
        </div>
    )
}

export default Home