import React from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import styled from 'styled-components'
import Button2 from '../../buttons/Button_2'

function ForgotPassword({ changeComponent }) {
    return (
        <Container>
            <div className="container">
                <h1>Forgot Password?</h1>
                <p>Enter your email address and we'll send you a recovery link.</p>
                <div className='account'>
                    <input type="text" placeholder='Email Address' />
                </div>
                <Button2 width={"100%"} height={"45px"}>
                    <h2>Submit</h2>
                </Button2>
                <span className='back' onClick={() => changeComponent("login")}>
                    <BsArrowLeftShort />
                    Back
                </span>
            </div>
        </Container>
    )
}

export default ForgotPassword

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