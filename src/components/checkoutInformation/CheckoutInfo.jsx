import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import UserInfo from './ChildComponents/UserInfo';
import Button2 from '../buttons/Button_2';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import ShippingAddress from './ChildComponents/ShippingAddress';
import PaymentMethod from './ChildComponents/PaymentMethod';
import { useState } from 'react';
import SuccessOrder from './ChildComponents/SuccessOrder';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ROUTE } from '../../api/route';
import { resetCartData } from '../../action/cartReducerAction'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client";
import isObjectEmpty from '../../utils/function/isEmptyObject';
import Loading from "../../pages/Loading/Loading"

function CheckoutInfo() {
    const [checkoutStep, setcheckoutStep] = useState(1);
    const cartList = useSelector(state => state.cartList);
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const dispath = useDispatch();
    const socket = useRef();
    const [country, setCountry] = useState("VN");
    const [street, setStreet] = useState("");
    const [distric, setDistric] = useState("");
    const [wards, setWards] = useState("");
    const [city, setCity] = useState("");
    const [detail, setDetail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassWord, setConfirmPassWord] = useState("");
    const [payMethod, setPayMethod] = useState("");
    const [userId, setuserId] = useState("");
    const [addressid, setAddressid] = useState("");
    const [isNewAddress, setIsNewAddress] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const userInfo = useSelector(state => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);


    const toastOption = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        socket.current = io(ROUTE);
    }, [])

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo);
            setFirstName(userInfo.firstname)
            setLastname(userInfo.lastname)
            setEmail(userInfo.email)
            setPhone(userInfo.phone)
            setuserId(userInfo.id)
        }
    }, [userInfo])

    const toNextStep = async () => {
        if (checkoutStep === 1) {
            if (lastname.length < 3 || firstname.length < 3) {
                toast.error("Lastname and firstname should be greater than 3 character", toastOption);
                return;
            }
            if (email.length < 8) {
                toast.error("Email should be greater than 8 character", toastOption);
                return;
            }
            if (phone.length < 10) {
                toast.error("Phone number should be 10-11 character", toastOption);
                return;
            }
        }

        if (checkoutStep === 2) {
            // if (country.length === 0 || street.length === 0 || distric.length === 0 || wards.length === 0 || city.length === 0 || detail.length === 0) {
            //     setPassword("");
            //     setConfirmPassWord("");
            //     toast.error("Invalid address", toastOption);
            //     return;
            // }

            if (password.length !== 0 && password.length < 5) {
                toast.error("Password should be greater than 5 character", toastOption);
                return;
            }

            if (password !== confirmPassWord) {
                toast.error("Incoreect confirm password", toastOption);
                return;
            }
        }

        if (checkoutStep === 3) {
            const body = {
                email,
                phone,
                firstname,
                lastname,
                country,
                street,
                distric,
                wards,
                detail,
                city,
                password,
                pay_method: payMethod,
                items: cartList,
                address_id: addressid
            }
            setIsLoading(true);
            const { data } = await axios.post(`${ROUTE}/api/orders`, body);

            if (data.status) {
                setIsLoading(false);
                setisSuccess(true);
            }

            if (socket.current) {
                socket.current.emit("add-new-order", body);
                dispath(resetCartData())
            }

            // if (data.status === true) {
            //     dispath(resetCartData())
            //     if (!isObjectEmpty(userInfo)) {
            //         await axios.delete(`${ROUTE}/api/cart`, {
            //             customer_id: userInfo.id,
            //         })
            //     }
            // }
            // if (data.status === false) {
            //     toast.error(data.msg, toastOption);
            //     return;
            // }

        }

        if (checkoutStep <= 3) {
            setcheckoutStep(pre => pre + 1);
        }
    }

    const toPreStep = () => {
        if (checkoutStep > 1) {
            setcheckoutStep(pre => pre - 1);
        }
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <Container>
            <div className="order-container">
                <div className="order-map">
                    <h1 className='selected'>Customer Information</h1>
                    <BsFillArrowRightCircleFill />
                    <h1 className={`${checkoutStep >= 2 ? "selected" : ""}`}>Address</h1>
                    <BsFillArrowRightCircleFill />
                    <h1 className={`${checkoutStep >= 3 ? "selected" : ""}`}>Billing Details</h1>
                </div>
                <br />
                {checkoutStep === 1 && <UserInfo
                    isLogin={userInfo ? true : false}
                    setLastname={setLastname}
                    setFirstName={setFirstName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    phone={phone}
                    email={email}
                    firstName={firstname}
                    lastname={lastname} />}
                {checkoutStep === 2 && <ShippingAddress
                    isLogin={userInfo ? true : false}
                    confirmPassWord={confirmPassWord}
                    setIsNewAddress={setIsNewAddress}
                    isNewAddress={isNewAddress}
                    password={password}
                    detail={detail}
                    city={city}
                    userId={userId}
                    setAddressid={setAddressid}
                    addressid={addressid}
                    wards={wards}
                    distric={distric}
                    street={street}
                    setCountry={setCountry}
                    setStreet={setStreet}
                    setDistric={setDistric}
                    setWards={setWards}
                    setCity={setCity}
                    setDetail={setDetail}
                    setConfirmPassWord={setConfirmPassWord}
                    setPassword={setPassword} />}
                {checkoutStep === 3 && <PaymentMethod setPayMethod={setPayMethod} payMethod={payMethod} />}
                {checkoutStep === 4 && isSuccess ? <SuccessOrder /> : undefined}
            </div>
            <div className='button'>
                {cartList.length > 0 &&
                    <span aria-hidden="true" onClick={() => toPreStep()}>
                        <BsArrowLeftShort /> Back
                    </span>}

                {
                    checkoutStep < 4 && cartList.length > 0 &&
                    <Button2 width={"50%"} height={"100%"} onClick={() => toNextStep()} >
                        <h2>Continue <BsArrowRightShort /> </h2>
                    </Button2>
                }
                {
                    cartList.length === 0 &&
                    <Link to='/products'>
                        <Button2 width={"50%"} height={"100%"} >
                            <h2> Shop Now </h2>
                        </Button2>
                    </Link>
                }
            </div>
            <ToastContainer />
        </Container >
    )
}

export default CheckoutInfo

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    @media only screen and (max-width: 450px) {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .button{
        width: 60%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
            width: 100%;
            display: flex;
            justify-content: center;
            height: 100%;
        }
        cursor: pointer;
        span {
            display: flex;
            
        }
        h2 {
            display: flex;
            align-items: center;
        }
    }
    .order-container{
        width: 60%;
        @media only screen and (max-width: 450px) {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .order-map{
            .selected{
                font-weight: 500;
            }
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 15px;
            height: 50px;
            border-bottom: 2px solid var(--line_2);
            box-sizing: border-box;
            align-items: center;
            svg{
                color: var(--small-text);
            }
          h1{
            font-size: 18px;
            font-weight: 300;
          }
        }
    }
`