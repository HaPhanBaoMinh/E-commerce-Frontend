import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Button2 from '../buttons/Button_2'
import ForgotPassword from './ChildComponents/ForgotPassword'
import Login from './ChildComponents/Login'
import Register from './ChildComponents/Register'

function MyAccount() {
    const [account, setAccount] = useState("login");

    const changeComponent = (child) => {
        setAccount(child);
    }

    return (
        <Container>
            {account === "login" && <Login changeComponent={changeComponent} />}
            {account === "register" && <Register changeComponent={changeComponent} />}
            {account === "forgot" && <ForgotPassword changeComponent={changeComponent} />}
        </Container>
    )
}

export default MyAccount

const Container = styled.div`
    height: 90vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .container{
        width: 400px;
        height: 500px;
        background-color: white;
        box-sizing: border-box;
        padding: 20px 39px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 25px;
        box-shadow: 0px 0px 2.5px var(--small-text);
        border-radius: 5px;
        @media only screen and (max-width: 400px) {
            width: 100%;
        }
        @media only screen and (max-width: 450px) and (min-width: 400px) {
            width: 400px;
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