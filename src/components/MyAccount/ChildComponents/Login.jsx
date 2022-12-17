import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button2 from '../../buttons/Button_2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ROUTE } from '../../../api/route';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../action/userinfoReducerAction';
import { useNavigate } from "react-router-dom";
import { fetchCartData } from '../../../action/cartReducerAction';

function Login({ changeComponent }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispath = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.userInfo);

    const toastOption = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const onLogin = async () => {
        try {
            const { data } = await axios.post(`${ROUTE}/api/customer/login`, {
                email, password
            });
            if (data.status === true) {
                dispath(fetchUserData(data.result));
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                return navigate("/");
            }
            toast.error("Incorrect email or password", toastOption);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getUserCart = async () => {
            const { data } = await axios.post(`${ROUTE}/api/cart/customer`, {
                customer_id: userInfo.id
            });
            dispath(fetchCartData(data.result))
        }
        if (userInfo) {
            getUserCart();
        }
    }, [userInfo])


    return (
        <Container>
            <div className="container">
                <h1>Login</h1>
                <p>Don't have an account yet? <span onClick={() => changeComponent("register")}>Register</span></p>
                <div className='account'>
                    <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button2 width={"100%"} height={"45px"} onClick={() => onLogin()}>
                    <h2>Login</h2>
                </Button2>
                <span onClick={() => changeComponent("forgot")}>Forgot Password?</span>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default Login

const Container = styled.div`
    .container{
        width: 400px;
        height: 500px;
        background-color: white;
        box-sizing: border-box;
        padding: 20px 40px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 25px;
        box-shadow: 0px 0px 2.5px var(--small-text);
        border-radius: 5px;
        span{
            color: var(--orange);
            cursor: pointer;
        }
        .account{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
        }
        h1{
            font-size: 30px;
            font-weight: 400;
        }
        input{
                height: 50px;
                width: 100%;
                outline: none;
                font-size: 14px;
                box-sizing: border-box;
                padding-left: 10px;
            }
    }
`