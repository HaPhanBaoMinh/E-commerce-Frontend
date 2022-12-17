import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button1 from '../buttons/Button_1'
import CountdownTimer from '../countdown/CountdownTimer'
import imgSrc from "../../utils/86a408c-6bbc-4454-be20-83931848d7f9.jpg"
import formatMoney from '../../utils/function/formatMoney'
import { ROUTE } from '../../api/route'
import { Link } from 'react-router-dom'

function DealsProduct({ product }) {
    const [isSaleProduct, setisSaleProduct] = useState(false);

    useEffect(() => {
        if (product) {
            const saleDate = Date.parse(product.day_end_discount)
            if (saleDate > Date.now()) {
                setisSaleProduct(true);
            }
        }
    }, [])

    const DAYS_IN_MS = new Date(product.day_end_discount).getTime() - Date.now()
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + DAYS_IN_MS;
    return (
        <Container>
            <div className='product-img'>
                <img src={`${ROUTE}/images/${product.images[1]}`} alt="" />
            </div>
            <h3 className='product-name'> {product.name} </h3>
            <div className="product-price">
                {
                    isSaleProduct ? <>
                        <h2 className='sale-price'> {formatMoney(product.discount_price)} </h2>
                        <h2 className='origin-price'>{formatMoney(product.price)}</h2>

                    </> : <>
                        <h2 className='sale-price'> {formatMoney(product.price)} </h2>

                    </>
                }
            </div>
            <CountdownTimer targetDate={dateTimeAfterThreeDays} />

            <Link to={`/products/${product.sku}`}>
                <Button1 width={"60%"} height={"50px"}>
                    <h2>Grab the deals</h2>
                </Button1>
            </Link>
        </Container>
    )
}

export default DealsProduct

const Container = styled.div`
            width: 90%;
            background-color: #ffffff;
            height: 100%;
            border-radius: 10px;
            border: 1px solid var(--line_2);
            max-width: 400px;
            box-sizing: border-box;
            padding: 25px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            @media only screen and (max-width: 450px) {
                width: 100%;
                max-width: 100%
            }    
            @media only screen and (max-width: 750px) and (min-width: 450px) {
                max-width: 90%;
                width: 100%;

            }
            .product-img{
                width: 60%;
                height: 35%;
                /* background-color: aqua; */
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    max-width: 100%;
                    height: auto;
                }
            }
            .product-name{
                font-size: 25px;
                width: 95%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
            }
            .product-price{
                display: flex;
                gap: 18px;
                align-items: center;
                .sale-price{
                    font-size: 19px;
                    color: var(--orange);
                }
                .origin-price{
                    text-decoration: line-through;
                    font-size: 15px;
                }
            }
            .product-description{
                width: 80%;
                text-align: center;
                font-size: 15px;
                color: var(--small-text);
                line-height: 20px;
            }
        
`