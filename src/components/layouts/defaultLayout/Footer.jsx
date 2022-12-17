import React from 'react'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button1 from '../../buttons/Button_1'

function Footer() {
    return (
        <Container>
            <div className="footer-contact">
                <div className="contact-title">
                    <h2>
                        <span>
                            Start Browsing Our Awesome Products
                        </span>
                    </h2>
                    <div className='contact-button'>
                        <Link to='/products'>

                            <Button1 width={"100%"} height={"100%"} radius={"0px"}  >
                                <h2>Shop Now</h2>
                            </Button1>
                        </Link>
                    </div>
                </div>
                <div className="contact-items">
                    <div className='company-contact'>
                        <h1>Company</h1>
                        <p>A few lines about your products or company...</p>
                        <div className='footer-logo'>
                            <a href='/' className='contact-icon'>
                                <FaFacebookF />
                            </a>
                            <a href='/' className='contact-icon'>
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    <div className='page-contact'>
                        <h1>Main</h1>
                        <div className="page-contact-items">
                            <h4>Home</h4>
                            <h4>Details</h4>
                            <h4>Contact Us</h4>
                            <h4>About Us</h4>
                            <h4>Blog</h4>
                        </div>
                    </div>


                    <div className='page-contact'>
                        <h1>Other</h1>
                        <div className="page-contact-items">
                            <h4>Pricing Plans</h4>
                            <h4>FAQ</h4>
                            <h4>Quiz/Survey</h4>
                        </div>
                    </div>


                    <div className='page-contact'>
                        <h1>Legal</h1>
                        <div className="page-contact-items">
                            <h4>Shipping & Terms</h4>
                            <h4>Primacy Plicy</h4>
                        </div>
                    </div>


                </div>
            </div>
            <div className="copyright">
                <h4>©Baominh copyright</h4>
            </div>
        </Container>
    )
}

export default Footer

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 90% 10%;
    @media only screen and (max-width: 450px) {
        height: 145vh;
    }    
    .footer-contact{
        background-color: var(--green);
        box-sizing: border-box;
        padding: 0 var(--padding);
        display: grid;
        grid-template-rows: 35% 65%;
        @media only screen and (max-width: 450px) {
            grid-template-rows: 20% 80%;
        }    
        .contact-title{
            height: 100%;
            width: 100%;
            /* background-color: aqua; */
            border-bottom: 2px solid var(--line_2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media only screen and (max-width: 450px) {
                flex-direction: column;
                justify-content: space-around;
            }    
            h2{
                width: 60%;
                @media only screen and (max-width: 450px) {
                    width: 100%;
                }    
                span {
                    font-size: 48px;
                    @media only screen and (max-width: 450px) {
                        font-size: 30px;
                    }
                }
            }
            .contact-button{
                height: 30%;
                width: 15%;
                @media only screen and (max-width: 450px) {
                    height: 40px;
                    width: 100%;
                }    
                h1{
                    font-size: 22px;
                }
            }
        }
        .contact-items{
            box-sizing: border-box;
            padding-top: 90px;
            display: grid;
            grid-template-columns: 50% 16.5% 16.5% 16.5%;
            @media only screen and (max-width: 450px) {
                display: flex;
                flex-direction: column;
                padding-top: 20px;
            }
            @media only screen and (max-width: 650px) and (min-width: 450px) {

            }
            .company-contact{
                display: flex;
                flex-direction: column;
                gap: 10%;
                @media only screen and (max-width: 450px) {
                    gap: 20px;
                }
                p {
                    color: var(--small-text);
                }
                h1{
                    width: 150px;
                    height: 50px;
                    color: var(--black);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 25px;
                    background-color: var(--orange);
                }

                .footer-logo{
                    display: flex;
                    gap: 5px;
                    .contact-icon{
                        color: var(--black);
                        height: 40px;
                        width: 40px;
                        display: block;
                        background-color: var(--blur);
                        border-radius: 6px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        svg{
                            font-size: 17px;
                        }
                        cursor: pointer;
                        :hover{
                            background-color: var(--orange);
                        }
                    }
                }
            }
            .page-contact{
                @media only screen and (max-width: 450px) {
                    margin: 10px 0;
                }    
                h1{
                    width: 60%;
                    font-size: 20px;
                    height: 45px;
                    border-bottom: 2px solid var(--line_2);
                }
                .page-contact-items{
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    padding-top: 25px;
                    h4{
                        font-weight: 400;
                        cursor: pointer;
                        width: 60%;
                        padding-bottom: 7px;
                        position: relative;
                        overflow: hidden;
                        ::before{
                            position: absolute;
                            content: "";
                            width: 100%;
                            height: 2px;
                            background-color: var(--orange);
                            bottom: 0;
                            transform: translateX(-100%);
                            transition: 0.3s ease;
                        }
                        &:hover::before{
                            transform: translateX(0);
                            transition: 0.3s ease;
                        }
                    }
                }
            }
        }
    }
    .copyright{
        background-color: var(--black);
        display: flex;
        justify-content: center;
        align-items: center;
        h4{
            font-size: 17px;
            font-weight: 300;
            color: var(--blur);
        }
    }
`