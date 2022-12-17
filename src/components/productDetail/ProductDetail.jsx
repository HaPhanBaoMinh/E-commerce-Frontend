import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import src from "../../utils/86a408c-6bbc-4454-be20-83931848d7f9.jpg"
import Button2 from '../buttons/Button_2'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ROUTE } from '../../api/route';
import formatMoney from '../../utils/function/formatMoney';
import { addNewItemToCartData } from '../../action/cartReducerAction';
import isObjectEmpty from '../../utils/function/isEmptyObject';

function ProductDetail() {
    const [quantity, setquantity] = useState(1);
    const { sku } = useParams();
    const [product, setProduct] = useState();
    const [isSaleProduct, setisSaleProduct] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [currentImg, setcurrentImg] = useState("");
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


    useEffect(() => {
        window.scrollTo({
            top: 60,
            left: 0,
            behavior: 'smooth'
        });
        let canceled = false;
        if (!canceled) {
            (async () => {
                const { data } = await axios.get(`${ROUTE}/api/product/${sku}`);
                if (data.status) {
                    setProduct(data.result[0])
                    setcurrentImg(data.result[0].images[0])
                }
                const saleDate = Date.parse(data.result[0].day_end_discount)
                if (saleDate > Date.now()) {
                    setisSaleProduct(true);
                    const discount = 100 - (Number(data.result[0].discount_price) / Number(data.result[0].price) * 100);
                    setDiscountPercent(discount);
                }
            })()
        }
        return () => canceled = true;
    }, [])

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

    return (
        <Container>
            <div div className="product-img" >
                <div className="current-img">
                    <img src={`${ROUTE}/images/${currentImg}`} alt="" />
                </div>
                <ul className='list-img'>
                    {product && product.images.map(img =>
                        <li onClick={() => setcurrentImg(img)}>
                            <img src={`${ROUTE}/images/${img}`} alt="" />
                        </li>
                    )}
                </ul>
            </div>
            <div className="product-decription">
                <div className="decription-box">
                    <h5 className='product-sku'>sku: {product && product.sku}</h5>
                    <h1 className='product-name'>{product && product.name}</h1>
                    <div className='product-price'>
                        {isSaleProduct ?
                            <>
                                <h4 className='price'>  {product && formatMoney(product.discount_price)} </h4>
                                <h4 className='sale-price'> {product && formatMoney(product.price)} </h4>
                                <span className='sale-percent'>
                                    -{Number(discountPercent).toFixed(2)}%
                                </span>
                            </>
                            :
                            <>
                                <h4 className='price'> {product && formatMoney(product.price)} </h4>
                            </>}
                    </div>
                    <div className="add-to-cart">
                        <div className="input-quantity">
                            <span onClick={() => onDecreaseQuantity()} >-</span>
                            <input type="number" value={quantity} onChange={(e) => setquantity(e.target.value)} />
                            <span onClick={() => onIncreaseQuantity()} >+</span>
                        </div>
                        <Button2 width={"60%"} height={"50px"} onClick={() => onAddToCart()}>
                            <h2>Add to cart</h2>
                        </Button2>
                    </div>
                    <p>
                        {product && formatMoney(product.description)}
                    </p>
                </div>
            </div>
        </Container >

    )
}

export default ProductDetail

const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: grid;
    grid-template-columns: 50% 50% ;
    padding: 0 var(--padding);
    box-sizing: border-box;
    margin-bottom: 20px;
    @media only screen and (max-width: 1050px) {
        grid-template-rows: 60% 40% ;
        grid-template-columns: unset;
        height: 120vh;
    }
    .product-img{
        /* background-color: #858585; */
        height: 100%;
        width: 100%;
        padding-top: 50px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        z-index: 1;
        gap: 10px;
       .list-img{
        display: flex;
        gap: 10px;
        
        li{
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            opacity: 0.8;
            cursor: pointer;
            transition: 0.3s ease;
            &:hover{
                opacity: 1;
                transition: 0.3s ease;
            }
            @media only screen and (max-width: 1050px) {
                width: 20%;
                height: 70px;
            }
            img{
                    max-width: 100%;
                    height: auto;
                }
        }
       }
    }
    .current-img{
        height: 70%;
        width: 50%;
        img{
            max-width: 100%;
            height: auto;
        }
        @media only screen and (max-width: 1050px) and (min-width: 500px) {
            height: 60%;
            width: 70%;
            max-width: 240px;
        }

        @media only screen and (max-width: 500px) {
            height: auto;
            width: 55%;
            max-width: 240px;
        }
    }
    .product-decription{
        width: 100%;
        height: 100%;
        background-color: var(--green);
        transform: skewX(-3deg);
        display: flex;
        justify-content: center;
        align-items: center;
        @media only screen and (max-width: 1050px) {
            transform: unset
        }
        .decription-box{
        transform: skewX(+3deg);
        @media only screen and (max-width: 1050px) {
            transform: unset
        }
            .product-sku{
                color: var(--small-text);
                font-weight: 400;
                font-size: 14px;
            }
            p{
                width: 80%;
                line-height: 25px;
                color: var(--small-text);
            @media only screen and (max-width: 1050px) {
                width: 100%;
                margin: auto;
                overflow: auto;
                
            }
            }
            justify-content: center;
            gap: 20px;
            display: flex;
            flex-direction: column;
            width: 70%;
            height: 70%;
            @media only screen and (max-width: 650px) {
                width: 100%;
                height: 100%;
                gap: 10px;
                justify-content: flex-start;
                box-sizing: border-box;
                padding: 20px 15px;
            }
            /* background-color: var(--white); */
            .add-to-cart{
                align-items: center;
                width: 100%;
                height: 100px;
                display: flex;
                gap: 20px;
                padding: 20px 0;
                @media only screen and (max-width: 500px) {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    background-color: #ffff;
                    display: flex;
                    height: 50px;
                    justify-content: center;
                    z-index: 2;
                }
                @media only screen and (min-width: 500px) and (max-width: 1050px) {
                    padding: 0;
                }
            }
            .product-name{
                font-size: 45px;
                text-align: start;
                @media only screen and (max-width: 1050px) {
                    font-size: 20px;
                }
            }
            .product-price{
                display: flex;
                gap: 20px;
                align-items: flex-end;
                flex-wrap: wrap;
                @media only screen and (max-width: 1050px) {
                        gap: 10px;
                }
                .price{
                    font-size: 30px;
                    @media only screen and (max-width: 1050px) {
                        font-size: 20px;
                    }
                }
                .sale-price{
                    font-size: 18px;
                    color: var(--small-text);
                    text-decoration: line-through;
                    @media only screen and (max-width: 1050px) {
                        font-size: 15px;
                    }
                }
                .sale-percent{
                    padding: 5px 10px;
                    color: var(--white);
                    border-radius: 50px;
                    background-color: var(--orange);
                    font-size: 14px;
                    @media only screen and (max-width: 1050px) {
                        font-size: 12px;
                    }
                }
            }
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
    }
`