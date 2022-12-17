import React from 'react'
import styled from 'styled-components'
import Button1 from '../buttons/Button_1'

function Subscriber() {
    return (
        <Container>
            <div className="subcriber-box">
                <div className="subcriber-email">
                    <h3>Subscribe and get a 10% discount right away!</h3>
                    <h1>Save 10% Today</h1>
                    <div className="subcriber-input">
                        <input type="text" id='email' placeholder='Your Email' />

                        <button>
                            <h2>Subscribe</h2>
                        </button>
                    </div>
                </div>
                <div className="subcriber-img">
                    <div className="logo">
                        <h1>Company</h1>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Subscriber

const Container = styled.div`
    width: 100%;
    height: 500px;
    background-color: var(--white);
    box-sizing: border-box;
    padding: 70px var(--padding);
    .subcriber-box{
        width: 100%;
        height: 100%;
        background-color: rgb(28, 28, 40);
        box-sizing: border-box;
        padding: 0 80px;
        display: grid;
        grid-template-columns: 60% 40%;
        @media only screen and (max-width: 450px) {
            padding: 40px 30px;
            grid-template-columns: none;

        }
        @media only screen and (max-width: 650px) and (min-width: 450px) {
            padding: 40px 30px;
            grid-template-columns: none;
            
        }
        .subcriber-email{
            width: 100%;
            height: 100%;
            color: var(--white);
            /* background-color: aqua; */
            display: flex;
            gap: 10%;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            h3{
                font-weight: 400;
                font-size: 20px;
                @media only screen and (max-width: 450px) {
                    font-size: 20px;
                }
                @media only screen and (max-width: 650px) and (min-width: 450px) {
                    font-size: 25px;
                }
            }
            h1{
                font-weight: 600;
                font-size: 60px;
                @media only screen and (max-width: 450px) {
                    font-size: 35px;
                }
                @media only screen and (max-width: 650px) and (min-width: 450px) {
                    font-size: 40px;
                }
            }
            .subcriber-input{
                width: 100%;
                display: flex;
                align-items: center;
                gap: 20px;
                @media only screen and (max-width: 450px) {
                    flex-direction: column;
                }
                @media only screen and (max-width: 650px) and (min-width: 450px) {
                    flex-direction: column;
                }
                button{
                    height: 100%;
                    width: 20%;
                    background-color: var(--orange);
                    color: var(--black);
                    border: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    ::before{
                        content: "";
                        width: 200px;
                        height: 90%;
                        background-color: #ffffffac;
                        position: absolute;
                        top: 0;
                        left: -30vw;
                        transform: rotate(-45deg) ;
                        transition: 0.5s ease;
                    }
                    
                    &:hover{
                    }
                    &:hover::before{
                        transition: 0.5s ease;
                        left: 100%;
                    }
                    @media only screen and (max-width: 450px) {
                        height: 50%;
                        width: 100%;
                        font-size: 15px;
                        ::before{
                        left: -50vw;
                     }
                    }
                    @media only screen and (max-width: 650px) and (min-width: 450px) {
                    }
                }
                input{
                    height: 50px;
                    width: 50%;
                    font-size: 19px;
                    padding-left: 10px;
                    box-sizing: border-box;
                    outline: none;
                    @media only screen and (max-width: 450px) {
                        width: 100%;
                        height: 80px;
                        font-size: 15px;
                    }
                    @media only screen and (max-width: 650px) and (min-width: 450px) {
                    }
                }
            }
        }
        .subcriber-img{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .logo{
                width: 70%;
                background-color: var(--orange);
                height: 30%;
                display: flex;
                align-items: center;
                justify-content: center;
                @media only screen and (max-width: 450px) {
                    display: none;
                }
                @media only screen and (max-width: 650px) and (min-width: 450px) {
                    display: none;
                }
                h1{
                    font-size: 30px;
                    width: 100%;
                    text-align: center;
                    @media only screen and (max-width: 450px) {
                        font-size: 30px;

                    }
                    @media only screen and (max-width: 650px) and (min-width: 450px) {
                    }
                }
            }
        }
    }
`