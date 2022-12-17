import React, { useState } from 'react'
import styled from 'styled-components'
import Button2 from '../../buttons/Button_2'
import { BsArrowLeftShort } from 'react-icons/bs';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { ROUTE } from '../../../api/route';
import { fetchUserData } from '../../../action/userinfoReducerAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Register({ changeComponent }) {
    const [lastname, setLastname] = useState("");
    const [firstname, setFirsname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconFirmPassword] = useState("");
    const dispath = useDispatch();
    const navigate = useNavigate();

    const toastOption = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const onRegister = async () => {
        try {
            const { data } = await axios.post(`${ROUTE}/api/customer`, {
                lastname,
                firstname,
                email,
                phone,
                password
            });

            if (lastname.length < 5) {
                return toast.error("LastName should be greater than 5 character", toastOption);
            }

            if (firstname.length < 5) {
                return toast.error("FirstName should be greater than 5 character", toastOption);
            }

            if (password.length < 5) {
                return toast.error("Password should be greater than 5 character", toastOption);
            }

            if (email.length < 5) {
                return toast.error("Email should be greater than 5 character", toastOption);
            }

            if (phone.length < 10) {
                return toast.error("Email should be 10 character", toastOption);
            }

            if (password !== confirmPassword) {
                return toast.error("Incoreect confirm password", toastOption);
            }

            if (data.status === true) {
                dispath(fetchUserData(data.inserted[0]));
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                return navigate("/");
            }
            toast.error("Email already exists", toastOption);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <div className="container">
                <h1>Register</h1>
                <p>Already have an account? <span onClick={() => changeComponent("login")}>Log in</span></p>
                <div className='account'>
                    <div className="input-address-haft">
                        <input type="text" placeholder='LastName' onChange={(e) => setLastname(e.target.value)} />
                        <input type="text" placeholder='FirstName' onChange={(e) => setFirsname(e.target.value)} />
                    </div>
                    <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                    <div className="input-address-haft">
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder='Confirm Password' onChange={(e) => setconFirmPassword(e.target.value)} />
                    </div>
                </div>
                <Button2 width={"100%"} height={"45px"} onClick={() => onRegister()}>
                    <h2>Submit</h2>
                </Button2>
                <span className='back' onClick={() => changeComponent("login")}>
                    <BsArrowLeftShort />
                    Back
                </span>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default Register

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
        .back{
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        span{
            color: var(--orange);
            cursor: pointer;
        }
        .account{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            .input-address-haft{
                width: 100%;
                display: flex;
                gap: 10px;
                box-sizing: border-box;
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
    }}
`