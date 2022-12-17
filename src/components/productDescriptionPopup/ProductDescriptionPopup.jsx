import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductDetail from '../productDetail/ProductDetail'
import { AiOutlineClose } from 'react-icons/ai';
import src from "../../utils/86a408c-6bbc-4454-be20-83931848d7f9.jpg"
import Button2 from '../buttons/Button_2';
import formatMoney from '../../utils/function/formatMoney';
import { ROUTE } from '../../api/route';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemToCartData } from '../../action/cartReducerAction';
import axios from 'axios';
import isObjectEmpty from '../../utils/function/isEmptyObject';

function ProductDescriptionPopup({ onShowPopup, product }) {
    const [isSaleProduct, setisSaleProduct] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [quantity, setquantity] = useState(1);
    const dispath = useDispatch();
    const userInfo = useSelector(state => state.userInfo);


    const onIncreaseQuantity = () => {
        setquantity(pre => pre + 1)
    }

    const onDecreaseQuantity = () => {
        if (quantity > 1) {
            setquantity(pre => pre - 1)
        }
    }

    const onAddToCart = async () => {
        if (product) {
            dispath(addNewItemToCartData({
                sku: product.sku,
                quantity: quantity
            }))

            if (!isObjectEmpty(userInfo)) {
                await axios.post(`${ROUTE}/api/cart`, {
                    customer_id: userInfo.id,
                    sku: product.sku,
                    quantity: quantity
                })
            }
        }

    }

    useEffect(() => {
        if (product) {
            const saleDate = Date.parse(product.day_end_discount)
            if (saleDate > Date.now()) {
                setisSaleProduct(true);
                const discount = 100 - (Number(product.discount_price) / Number(product.price) * 100);
                setDiscountPercent(discount);
            }
        }
    }, [])

    return (
        <Container >
            <div className="popup-container" >
                <div className="action">
                    <AiOutlineClose onClick={() => onShowPopup()} />
                </div>
                <div className='product-detail'>
                    <div className="product-img">
                        <div className="current-img">
                            <img src={`${ROUTE}/images/${product.images[1]}`} alt="" />
                        </div>
                    </div>

                    <div className="product-decription">
                        <div className="decription-box">
                            <h5 className='product-sku'>sku: {product.sku} </h5>
                            <h1 className='product-name'> {product.name} </h1>
                            <div className='product-price'>
                                {
                                    isSaleProduct ?
                                        <>
                                            <h4 className='price'>
                                                {formatMoney(product.discount_price)}
                                            </h4>
                                            <h4 className='sale-price'>
                                                {formatMoney(product.price)}
                                            </h4>
                                            <span className='sale-percent'>
                                                -{Number(discountPercent).toFixed(2)}%

                                            </span>
                                        </>
                                        : <h4 className='price'>
                                            {formatMoney(product.price)}
                                        </h4>
                                }
                            </div>
                            <div className="add-to-cart">
                                <div className="input-quantity">
                                    <span onClick={() => onDecreaseQuantity()} >-</span>
                                    <input type="number" value={quantity} onChange={(e) => setquantity(e.target.value)} />
                                    <span onClick={() => onIncreaseQuantity()}>+</span>
                                </div>
                                <Button2 width={"60%"} height={"90%"} onClick={() => onAddToCart()}>
                                    <h2>Add to cart</h2>
                                </Button2>
                            </div>
                            <p>
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProductDescriptionPopup

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background-color: rgba(178, 178, 178, 0.2);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .action{
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        svg{
            font-size: 25px;
            cursor: pointer;
            @media only screen and (max-width: 500px) {
                font-size: 20px;
            }
        }
    }
    .popup-container{
        width: 60%;
        max-height: 700px;
        background-color: white;
        box-sizing: border-box;
        padding: 10px;
        @media only screen and (max-width: 500px){
            width: 80%;
        }
        .product-detail{
            width: 100%;
            display: grid;
            min-height: 500px;
            grid-template-columns: 50% 50% ;
            padding: 0 var(--padding);
            box-sizing: border-box;
            @media only screen and (max-width: 500px) {
                margin-top: 5px;
                display: block;
            }
            .product-img{
                width: 80%;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                @media only screen and (max-width: 500px) {
                    width: 100%;
                }
                .current-img{
                    height: 80%;
                    width: 100%;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            }
        }
        .product-decription{
            width: 100%;
            height: 90%;
            /* background-color: var(--green); */
            display: flex;
            align-items: center;
            .decription-box{
                width: 100%;
                height: 70%;
                display: flex;
                justify-content: space-around;
                /* background-color: aqua; */
                flex-direction: column;
                @media only screen and (max-width: 500px) {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    box-sizing: border-box;
                    padding-top: 15px;
                }
                p{
                    width: 100%;
                    line-height: 22px;
                    color: var(--small-text);
                    @media only screen and (max-width: 500px){
                        display: none;
                    }
                }
                .add-to-cart{
                    align-items: center;
                    width: 100%;
                    height: 50px;
                    display: flex;
                    gap: 20px;
                    padding: 20px 0;
                    .input-quantity{
                    display: flex;
                    height: 50px;
                    input {
                        height: 100%;
                        text-align: center;
                        outline: none;
                        width: 50px;
                        font-size: 17px;
                        outline: none;
                        border: none;
                        border-top: 1px solid var(--line) ;
                        border-bottom: 1px solid var(--line) ;
                        box-sizing: border-box;
                    }
                    span {
                        width: 40px;
                        display: block;
                        height: 70%;
                        box-sizing: border-box;
                        border: 1px solid var(--line) ;
                        display: flex;
                        font-size: 17px;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        background-color: var(--white);
                        cursor: pointer;
                        transition: 0.2s ease;
                            &:hover{
                            background-color: #dbdbdb93;
                            transition: 0.2s ease;
                        }
                    }
                }
                }
                .product-sku{
                    font-size: 15px;
                    @media only screen and (max-width: 500px){
                        font-size: 12px;
                        font-weight: 300;
                    }
                }
                .product-name{
                    font-size: 30px;
                    @media only screen and (max-width: 500px) {
                        font-size: 20px;
                    }
                }
                .product-price{
                display: flex;
                gap: 20px;
                margin-top: 15px;
                align-items: flex-end;
                @media only screen and (max-width: 500px){
                    gap: 7px;
                    flex-wrap: wrap;
                }
                .price{
                    font-size: 30px;
                }
                .sale-price{
                    font-size: 18px;
                    color: var(--small-text);
                    text-decoration: line-through;
                }
                .sale-percent{
                    padding: 5px 10px;
                    color: var(--white);
                    border-radius: 50px;
                    background-color: var(--orange);
                    font-size: 14px;
                }
            }
            }
        }
    }
`