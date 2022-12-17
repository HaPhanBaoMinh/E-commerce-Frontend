import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BsBag } from "react-icons/bs";
import { MdOutlineZoomOutMap } from "react-icons/md";
import ProductDescriptionPopup from '../productDescriptionPopup/ProductDescriptionPopup';
import { useState } from 'react';
import formatMoney from '../../utils/function/formatMoney';
import { ROUTE } from '../../api/route';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemToCartData } from '../../action/cartReducerAction';
import { Link } from 'react-router-dom'
import axios from 'axios';
import isObjectEmpty from '../../utils/function/isEmptyObject';

function Item({ width = 100 / 3, index, product }) {
    const [popupItem, setpopupItem] = useState(false);
    const [isSaleProduct, setisSaleProduct] = useState(false);
    const dispath = useDispatch();
    const userInfo = useSelector(state => state.userInfo);

    useEffect(() => {
        if (product) {
            const saleDate = Date.parse(product.day_end_discount)
            if (saleDate > Date.now()) {
                setisSaleProduct(true);
            }
        }
    }, [])

    const onAddToCart = async () => {
        dispath(addNewItemToCartData({
            sku: product.sku,
            quantity: 1
        }))
        // console.log(userInfo);
        if (userInfo) {
            await axios.post(`${ROUTE}/api/cart`, {
                customer_id: userInfo.id,
                sku: product.sku,
                quantity: 1
            })
        }
    }


    const onShowPopup = () => {
        setpopupItem(pre => !pre);
    }

    return (
        <>
            <Container className={`product-item ${index === "last" && "last"} ${index === "first" && "first"}`} style={{ width: width.toString() + "%" }}>
                <div className="product-img">
                    <img src={`${ROUTE}/images/${product.images[0]}`} alt="" />
                    {isSaleProduct && <h1 className='sale-tag'>sale</h1>}

                    <div className='fast-action' onClick={() => onAddToCart()}>
                        <div className="add-to-cart">
                            <BsBag />
                        </div>
                        <div className="detail-popup" onClick={() => onShowPopup()} >
                            <MdOutlineZoomOutMap />
                        </div>
                    </div>
                </div>
                <Link to={`/products/${product.sku}`}>
                    <h2 className='product-name'> {product.name} </h2>
                </Link>
                <h4>

                    {isSaleProduct ?
                        <>
                            <span className='sale-price'>  {formatMoney(product.discount_price)} </span>
                            <span className='price'> {formatMoney(product.price)} </span>
                        </>
                        :
                        <>
                            <span className='sale-price'> {formatMoney(product.price)} </span>
                        </>
                    }
                </h4>
            </Container>
            {popupItem && <ProductDescriptionPopup onShowPopup={onShowPopup} product={product} />}

        </>

    )
}

export default Item
const Container = styled.div`
    cursor: pointer;
    a {
        color: var(--black)
        }
    @media only screen and (max-width: 650px) and (min-width: 450px) {
        width: 50% !important;
    }

    @media only screen and (max-width: 450px) {
        width: 50% !important;
        height: 300px;
        padding: 20px 10px;
    }

    @media only screen and (max-width: 910px) and (min-width: 650px)  {
        width: 33% !important;
    }
    
                /* min-width: 200px; */
                height: 450px;
                box-sizing: border-box;
                padding: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0px 0px 0.5px -0.3px;
                .product-img{
                    height: 82%;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    @media only screen and (max-width: 450px) {
                        height: auto;
                    }
                    .fast-action {
                        height: 60px;
                        width: 50%;
                        background-color: var(--white);
                        position: absolute;
                        bottom: -60px;
                        transition: 0.3s ease;
                        display: grid;
                        grid-template-columns: 50% 50%;
                        font-size: 20px;
                        border: 1px solid var(--line);
                        border-radius: 4px;
                        overflow: hidden;
                        .detail-popup{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            transition: 0.3s ease;
                            &:hover {
                                background-color: var(--line_2);
                                transition: 0.3s ease;
                            }
                        }

                        .add-to-cart{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-right: 1px solid var(--line);
                            transition: 0.3s ease;
                            &:hover {
                                background-color: var(--line_2);
                                transition: 0.3s ease;
                            }
                        }
                    }
                    .sale-tag{
                        height: 15px;
                        background-color: var(--orange);
                        padding: 5px;
                        line-height: 15px;
                        font-size: 12px;
                        position: absolute;
                        color: var(--white);
                        left: 15%;
                        font-weight: 500;
                    }
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                    &:hover .fast-action{
                        transform: translateY(-70px);
                        transition: 0.2s ease;
                    }
                }
                .product-name{
                    font-size: 19px;
                    width: 95%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    @media only screen and (max-width: 450px) {
                        font-size: 17px;
                    }
                }
                .sale-price{
                    font-size: 18px;
                    width: 95%;
                }
                .price{
                    font-size: 14px;
                    width: 90%;
                    text-decoration: line-through;
                    color: var(--small-text);
                }
            
`