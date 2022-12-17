import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import Button1 from '../buttons/Button_1'
import { ROUTE } from '../../api/route.js';


function ProductDescription() {
    const banner = useSelector(state => state.store);
    return (
        <>
            <Container>
                {/* <h1 className='description-sale' > {banner ? banner.sale_span[1] : <p>loading...</p>} </h1> */}
                <div className="product-description">

                    <div className="description-img">
                        <div className="description-background">
                            {banner ? <img src={`${ROUTE}/images/${banner.img_2}`} alt="" /> : <p>loading...</p>}
                        </div>
                    </div>

                    <div className="description-content">
                        <div className="description-form">
                            <h1 className='description-title'> {banner ? banner.title_2 : <p>loading...</p>} </h1>
                            <p>{banner ? banner.description_2 : <p>loading...</p>}</p>

                            <br />
                            <div className="description-value">
                                <h1 className='description-value-box'>
                                    <p className='description-value-name'> {banner ? banner.span_title_2 : <p>loading...</p>} </p>
                                    <p className='description-value-number'>{banner ? banner.span_value_2 : <p>loading...</p>}</p>
                                </h1>

                                <h1 className='description-value-box'>
                                    <p className='description-value-name'> {banner ? banner.span_title_1 : <p>loading...</p>} </p>
                                    <p className='description-value-number'>{banner ? banner.span_value_1 : <p>loading...</p>}</p>
                                </h1>

                            </div>
                            <Link to='/products'>

                                <Button1 width={"25%"} height={"15%"} >
                                    <h2>Shop Now</h2>
                                </Button1>
                            </Link>
                        </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 1921 273" >
                        <polygon fill="rgba(255, 255, 255, 1)" points="0,273 1921,273 1921,0 "></polygon>
                    </svg>
                </div>
            </Container>
        </>
    )
}

export default ProductDescription

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 10% 90%;
    margin-top: 50px;
    @media only screen and (max-width: 450px) {
        height: fit-content;
        grid-template-rows: none;

    }
    @media only screen and (max-width: 650px) and (min-width: 450px) {
        height: fit-content;
        grid-template-rows: none;
    }

    svg{
        transform: rotateX(180deg) rotateY(180deg);
        position: absolute;
        top: 0;
    } 
    .description-sale{
        padding: 0 var(--padding);
        box-sizing: border-box;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product-description{
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: var(--green);
    display: grid;
    grid-template-columns: 45% 55%;
        @media only screen and (max-width: 450px) {
            display: block;
            height: fit-content;
        }
        @media only screen and (max-width: 650px) and (min-width: 450px) {
            display: block;
            height: fit-content;

        }
    .description-content{
        height: 100%;
        width: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: var(--padding);
        box-sizing: border-box;
        @media only screen and (max-width: 450px) {
            padding: 0;
        }
        @media only screen and (max-width: 650px) and (min-width: 450px) {
            padding: 0;
        }
        .description-form{
            width: 90%;
            height: 70%;
            display: flex;
            flex-direction: column;
            /* gap: 30px; */
            justify-content: space-evenly;
            /* background-color: aqua; */
            @media only screen and (max-width: 450px) {
                button{
                    width: 100% !important;
                    height: 40px !important;
                }
                gap: 15px;
            }

            @media only screen and (max-width: 650px) and (min-width: 450px) {
                button{
                    width: 100% !important;
                    height: 40px !important;
                }
                gap: 15px;
            }
                
            .description-value{
                width: 100%;
                display: flex;
                gap: 30%;
                .description-value-box{
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    
                    .description-value-name{
                        font-weight: 400;
                    }
                    .description-value-number{
                        font-size: 35px;
                        font-weight: 500;
                    }
                }
                
            }
            .description-title{
                font-size: 48px;
                font-weight: 700;
                @media only screen and (max-width: 450px) {
                    font-size: 30px;
                    margin-bottom: 15px;
                }
                @media only screen and (max-width: 650px) and (min-width: 450px) {
                    font-size: 40px;
                    margin-bottom: 15px;

                }
            }
            p{
                color: var(--small-text)
            }
        }
    }
    .description-img{
        padding-left: var(--padding);
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
        /* background-color: aquamarine; */
        z-index: 1;
        @media only screen and (max-width: 450px) {
            padding: 0;
        }
        @media only screen and (max-width: 650px) and (min-width: 450px) {
            padding: 0;
        }
        .description-background{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("https://content.app-sources.com/s/65227832491034842/uploads/Images/orange-circle-small-0966143.png");
            background-repeat: no-repeat;
            background-position: center;
            img{
                width: 100%;
                height: auto;
            }
        }
    }
   }
`