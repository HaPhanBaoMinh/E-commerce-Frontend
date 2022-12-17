import React from 'react'
import styled from 'styled-components'
import Button1 from '../buttons/Button_1'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTE } from '../../api/route.js';
import { v4 as uuidv4 } from 'uuid';

function ProductBanner() {
    const banner = useSelector(state => state.store);
    return (
        <Container>
            <div className='banner-content'>
                <div className="banner-box">
                    <h1 className='banner-header'>
                        <span>
                            {banner?.title_1}
                        </span>
                    </h1>
                    <h4 className='banner-discription'> {banner?.description_1} </h4>
                    <br />
                    <Link to='/products'>

                        <Button1 width={"150px"} height={"12%"} radius={"5px"}  >
                            <h2>Shop Now</h2>
                        </Button1>
                    </Link>
                    <br />
                    {
                        banner ?
                            banner.span_1.map(span =>
                                <div className='widget' key={uuidv4()}>
                                    <HiOutlineCheckCircle className='check-icons' />
                                    <h3> {span} </h3>
                                </div>
                            ) : <p>loading...</p>
                    }
                </div>
            </div>

            <div className='banner-img'>
                <div className="banner-widget">

                    {banner ? <img src={`${ROUTE}/images/${banner.img_1}`} alt="" /> : <p>loading...</p>}

                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 1921 273" >
                <polygon fill="#ffffff" points="0,273 1921,273 1921,0 "></polygon>
            </svg>
        </Container>


    )
}

export default ProductBanner

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: var(--green);
    display: flex;
    overflow: hidden;
    svg{
        position: absolute;
        bottom: 0;
    }
    .banner-content{
        width: 50%;
        height: 100%;
        padding-left: var(--padding);
        display: flex;
        align-items: center;
        .banner-box{
            width: 80%;
            height: 70%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            .widget{
                display: flex;
                gap: 10px;
            }
            .check-icons{
                position: unset;
                color: var(--orange);
            }
            .banner-header{
                font-size: 72px;
                span{
                    font-weight: 600;
                }
                h2{
                    font-size: 17px;
                }
            }
            .banner-discription{
                font-size: 20px;
                font-weight: 400;
                color: var(--small-text)
            }
        }
    }

    .banner-img{
        width: 50%;
        height: 100%;
        padding-right: var(--padding) ;
        background-color: var(--green);
        position: relative;
        display: flex;
        justify-content: center;
        position: relative;
        align-items: center;
        overflow: hidden;
        .banner-widget{
            width: 60%;
            height: 65%;
            /* background-color: aquamarine; */
            box-sizing: border-box;
            margin-bottom: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("https://content.app-sources.com/s/65227832491034842/uploads/Images/orange-circle-small-0966143.png");
            background-repeat: no-repeat;
            background-position: center;
            img {
                width: 190%;
                height: auto;
            }
        }
    }
    @media only screen and (max-width: 650px) {
        flex-direction: column;
        .banner-content{
            width: 100%;
            .banner-box{
                h1{
                    line-height: 40px;
                    span{
                        line-height: 30px;
                        font-size: 40px;
                        line-height: 10px;
                    }
                }
                button{
                    min-height: 50px;
                }
            }
        }
        .banner-img{
            width: 100%;
            .banner-widget{
                width: 50%;
                background-size: contain;
            }
        }
    }
`