import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBag } from "react-icons/bs";
import Button1 from "../../buttons/Button_1";
import { Link, useLocation } from 'react-router-dom';
import PreViewCart from '../../previewCart/PreViewCart';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Button2 from '../../buttons/Button_2';
import UserInfo from '../../checkoutInformation/ChildComponents/UserInfo';
import { logoutUserData } from '../../../action/userinfoReducerAction';
import { resetCartData } from '../../../action/cartReducerAction';

function Header() {
    const location = useLocation();
    const currentRoute = location.pathname.split("/");
    const dispath = useDispatch();
    const [slideBar, setslideBar] = useState(false);
    const cartList = useSelector(state => state.cartList);
    const [orderQuantity, setorderQuantity] = useState(0);
    const userInfo = useSelector(state => state.userInfo);

    useEffect(() => {
        if (cartList) {
            setorderQuantity(cartList.length);
        }
    }, [cartList])

    const onOpenPreviewCart = () => {
        dispath({ type: "OPEN_PREVIEW_CART" });
    }

    const onOpenSlideBar = () => {
        setslideBar(pre => !pre)
    }

    const onLogout = () => {
        dispath(logoutUserData());
        console.log('logout');
        dispath(resetCartData())
        localStorage.removeItem("email");
        localStorage.removeItem("password");
    }

    return (
        <Container>
            <PreViewCart />
            <div className='header-contact'>
                <div className='contact-icons'>
                    <a href='/' className='contact-icon'>
                        <FaFacebookF />
                    </a>
                    <a href='/' className='contact-icon'>
                        <FaYoutube />
                    </a>
                </div>
                <h4 className='contact-free-ship'>
                    Free Delivery Over $100
                </h4>

                {userInfo ?
                    <div className='userInfo'>
                        {userInfo.lastname && <p>{`${userInfo.lastname} ${userInfo.firstname}`}</p>}
                        {userInfo.lastname && <button onClick={() => onLogout()} >Logout</button>}
                    </div>
                    :
                    <Link to='/login' className='contact-my-profile'>
                        My Profile
                    </Link>}
            </div>
            <div className='header-navigator'>
                <div className='menu' onClick={() => onOpenSlideBar()}>
                    <GiHamburgerMenu />
                </div>
                <div className="header-logo">
                    <h1>
                        <Link to='/'>Company</Link>
                    </h1>
                </div>
                <div className="header-navigator-items" style={slideBar ? { transform: "translateX(0)" } : {}}>
                    <div className='close-bar' onClick={() => onOpenSlideBar()}>
                        <AiOutlineClose />
                    </div>

                    <div className={`navigator-item ${currentRoute.includes("products") && "current-page"}`}>
                        <Link to='/products'>Products</Link>
                    </div>

                    <div className={`navigator-item ${currentRoute.includes("deals") && "current-page"}`}>
                        <Link to='/deals'>Deals</Link>
                    </div>

                    <div className={`navigator-item ${currentRoute.includes("about") && "current-page"}`}>
                        <Link to='/about'>About</Link>
                    </div>

                    <div className={`navigator-item ${currentRoute.includes("contact") && "current-page"}`}>
                        <Link to='/contact'>Contact</Link>
                    </div>
                    <Button1 height={"50px"} width={"150px"} >
                        <h2>Shop Now</h2>
                    </Button1>
                    <div className='contact-icons'>
                        <a href='/' className='contact-icon'>
                            <FaFacebookF />
                        </a>
                        <a href='/' className='contact-icon'>
                            <FaYoutube />
                        </a>
                    </div>
                    <h4>Free Delivery Over $100</h4>
                    <Link to='/login' className='contact-my-profile res'>
                        {userInfo ? <p>{`${userInfo.lastname} ${userInfo.firstname}`}</p> : "My Profile"}
                    </Link>

                </div>
                <div className="header-cart" >
                    <div className='cart-logo' onClick={() => onOpenPreviewCart()}>
                        <h3> {orderQuantity} </h3>
                        <BsBag />
                    </div>
                    <Link to='/products'>
                        <Button1 height={"50%"} width={"150px"} >
                            <h2>Shop Now</h2>
                        </Button1>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default Header

const Container = styled.div`
        grid-template-rows: 35% 65%;
        grid-template-columns: 100%;
        width: 100%;
        height: 170px;
        box-sizing: border-box;
        display: grid;
        .header-contact{
            padding: 0px var(--padding);
            box-sizing: border-box;
            width: 100%;
            background-color: var(--green);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .userInfo {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                button {
                    cursor: pointer;
                    background-color: var(--orange);
                    font-weight: 500;
                    height: 30px;
                    width: 70px;
                    border-radius: 5px;
                    outline: none;
                }
            }
            .contact-my-profile{
                text-decoration: none;
                font-weight: 300;
                cursor: pointer;
                color: var(--black);
                display: block;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                button {
                    cursor: pointer;
                    background-color: var(--orange);
                    font-weight: 500;
                    height: 30px;
                    width: 70px;
                    border-radius: 5px;
                    outline: none;
                }
            }
            .contact-icons{
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
        .header-navigator{
            display: grid;
            grid-template-columns: 30% 40% 30%;
            border-bottom: 1px solid var(--line);
            padding: 0px var(--padding);
            box-sizing: border-box;
            .header-cart{
                button{
                    display: none;
                }
            }
            
            .header-logo{
                display: flex;
                justify-content: start;
                align-items: center;
                h1 {
                    a{
                        color: var(--white);
                        text-decoration: none;
                    }
                    background-color: var(--black);
                    padding: 16px 30px;
                    box-sizing: border-box;
                    max-width: 50%;
                    height: 50%;
                    font-size: 20px;
                }
            }

            .header-navigator-items{
                .close-bar{
                    display: none;
                }
                h4{
                    display: none;
                }
                .res{
                    display: none !important;
                }
                @media only screen and (max-width: 450px) {
                    .res{
                        display: block !important;
                    }
                }
                display: flex;
                transition: 0.2s ease;
                gap: 30px;
                justify-content: center;
                align-items: center;
                .contact-icons{
                    display: none;
                }
                button{
                    display: none;
                }
                .navigator-item{
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    cursor: pointer;
                    transition: 0.2s ease;
                    overflow: hidden;
                    a{
                        color: var(--black);
                        font-size: 17px;
                        text-decoration: none;
                    }
                    &:hover a{
                        transition: 0.2s ease;
                        color: var(--orange);
                    }
                    &:hover::before{
                        transition: 0.2s ease;
                        transform: translateX(0);
                        opacity: 1;
                    }
                    ::before {
                        content: "";
                        width: 80%;
                        height: 2.5px;
                        background-color: var(--orange);
                        position: absolute;
                        bottom: 0;
                        transform: translateX(-100%);
                        transition: 0.2s ease;
                        opacity: 0;
                    }
                }
                .current-page{
                    position: relative;
                    a {
                        color: var(--orange) ;
                    }
                    ::after {
                        content: "";
                        width: 80%;
                        height: 2.5px;
                        background-color: var(--orange);
                        position: absolute;
                        transition: 0.2s ease;
                        bottom: 0;
                    }
                    
                }

            }

            .header-cart{
                display: flex;
                align-items: center;
                justify-content: end;
                cursor: pointer;
            }
            .menu {
                display: none;
            }
        }
        .header-cart{
            display: flex;
            gap: 25px;
            .cart-logo{
                position: relative;
                h3{
                    width: 20px;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--orange);
                    position: absolute;
                    font-size: 13px;
                    border-radius: 50px;
                    color: var(--white);
                    font-weight: 400;
                    top: -10px;
                    right: -10px;
                }
                svg{
                    font-size: 25px;
                }
            }
        }
    @media only screen and (min-width: 650px) and (max-width: 800px) {
        .header-navigator{
            display: grid;
            grid-template-columns: 20% 60% 20%;
            .header-logo{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                h1{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    max-width: 100%;
                }
            }
        }
    }

    @media only screen and (max-width: 650px) {
        grid-template-rows: 100%;
        height: 70px;
        .header-contact{
            display: none;
        }
        
        .header-navigator{
            grid-template-columns: 30% 40% 30%;
            .header-navigator-items{
                transform: translateX(-150%);
                position: relative;
                transition: 0.2s ease;
                .close-bar{
                    display: block;
                    width: 100%;
                    font-size: 30px;
                    display: flex;
                    justify-content: flex-end;
                    position: absolute;
                    left: 25%;
                    cursor: pointer;
                    svg{
                        background-color: var(--blur);
                        border: 1px solid;
                        border-radius: 50px;
                        padding: 7px;
                        color: rgb(85, 85, 85);

                    }
                }
                h4{
                    display: block;
                }
                /* transform: translateX(-100%); */
                box-shadow: 1px 0px 2px 0px;
                position: fixed;
                height: 100vh;
                top: 0;
                width: 240px;
                z-index: 19;
                flex-direction: column;
                background: white;
                left: 0;
                gap: 20px;
                align-items: center;
                justify-content: flex-start;
                box-sizing: border-box;
                padding-top: 30px;
                .contact-icons{
                    display: block;
                    
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
                button{
                    display: block;
                }
                .navigator-item{
                    height: 30px;
                    /* background-color: aqua; */
                }
            }
            .header-logo{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                h1{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    max-width: 100%;
                }
            }
            .menu{
                font-size: 25px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            /* .header-navigator-items{
                display: none;
            } */
        }
        
    }
`