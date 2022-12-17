import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import imgSrc from "../../utils/86a408c-6bbc-4454-be20-83931848d7f9.jpg"
import { RiDeleteBin7Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import formatMoney from '../../utils/function/formatMoney';
import { addNewItemToCartData, removeItemFromCartData } from '../../action/cartReducerAction';
import { ROUTE } from '../../api/route';
import axios from 'axios';
import isObjectEmpty from '../../utils/function/isEmptyObject';

function OrderItem({ item, cartList }) {
    const currentItem = useSelector(state => state.productList.find(product => product.sku === item.sku));
    // const [currentItem, setcurrentItem] = useState({});
    const [cunrrentQuantity, setcunrrentQuantity] = useState(0);
    const dispath = useDispatch();
    const userInfo = useSelector(state => state.userInfo);

    // console.log(Date.parse(item.day_end_discount) > Date.now());
    // console.log(currentItem);

    useEffect(() => {
        if (item !== undefined) {
            setcunrrentQuantity(item.quantity)
        }
    }, [item])

    // useEffect(() => {
    //     let canceled = false;
    //     if (!canceled) {
    //         if (item !== undefined) {
    //             setcurrentItem(productList.find(product => product.sku === item.sku))
    //         }
    //     }
    //     return () => canceled = true;
    // }, [productList])

    const onIncreaseQuantity = async () => {
        setcunrrentQuantity(num => num + 1)
        dispath(addNewItemToCartData({
            sku: item.sku,
            quantity: 1
        }))
        if (!isObjectEmpty(!isObjectEmpty(userInfo))) {
            await axios.post(`${ROUTE}/api/cart`, {
                customer_id: userInfo.id,
                sku: item.sku,
                quantity: 1
            })
        }
    }

    const onDecreaseQuantity = async () => {
        if (cunrrentQuantity === 1) {
            dispath(removeItemFromCartData(item.sku));
            if (!isObjectEmpty(userInfo)) {
                await axios.put(`${ROUTE}/api/cart`, {
                    customer_id: userInfo.id,
                    sku: item.sku,
                    quantity_remove: cunrrentQuantity
                })
            }
            return;
        };
        setcunrrentQuantity(num => num - 1)
        dispath(addNewItemToCartData({
            sku: item.sku,
            quantity: -1
        }))

        if (!isObjectEmpty(userInfo)) {
            await axios.put(`${ROUTE}/api/cart`, {
                customer_id: userInfo.id,
                sku: item.sku,
                quantity_remove: 1
            })
        }
    }

    const onRemoveItem = async () => {
        dispath(removeItemFromCartData(item.sku))
        if (!isObjectEmpty(userInfo)) {
            await axios.put(`${ROUTE}/api/cart`, {
                customer_id: userInfo.id,
                sku: item.sku,
                quantity_remove: cunrrentQuantity
            })
        }
    }

    useEffect(() => {
        let canceled = false;
        if (!canceled) {
            if (item !== undefined) {
                setcunrrentQuantity(item.quantity)
            }
        }
        return () => canceled = true;
    }, [cartList])


    return (
        <Container>
            {
                item !== undefined ? <>
                    <div className='order-info'>
                        {currentItem.images !== undefined ? <img src={`${ROUTE}/images/${currentItem?.images[0]}`} alt="" /> : <p>Loading...</p>}
                        <div className="order-quantity">
                            <p> {currentItem.name} </p>
                            <div className="input-quantity">
                                <span onClick={() => onDecreaseQuantity()}>-</span>
                                <input type="number" value={cunrrentQuantity} onChange={(e) => setcunrrentQuantity(e.target.value)} />
                                <span onClick={() => onIncreaseQuantity()}>+</span>
                            </div>
                            <div className='order-total'>
                                <h2> {
                                    Date.parse(currentItem.day_end_discount) > Date.now() ? formatMoney(currentItem.discount_price * item.quantity) : formatMoney(currentItem.price * item.quantity)
                                } </h2>
                                <button onClick={() => onRemoveItem()}><RiDeleteBin7Line /></button>
                            </div>
                        </div>
                    </div>

                    <div className='order-total'>
                        <h2>{
                            Date.parse(currentItem.day_end_discount) > Date.now() ? formatMoney(currentItem.discount_price * item.quantity) : formatMoney(currentItem.price * item.quantity)
                        }</h2>
                        <button onClick={() => onRemoveItem()}><RiDeleteBin7Line /></button>
                    </div></> : <p>loading...</p>
            }
        </Container>
    )
}

export default OrderItem

const Container = styled.div`
    height: 120px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .order-info{
        gap: 30px;
        height: 100%;
        display: flex;
        @media only screen and (max-width: 450px) {
            width: 100%;
            gap: 20px;
            justify-content: space-between;
        }
        img {
            height: 100%;
            border-radius: 5px;
            @media only screen and (min-width: 375px) and (max-width: 400px) {
                height: 80%;
            }
        }
        .order-quantity{
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: end;
            justify-content: center;
            h1{
                font-weight: 400;
            }
            .order-total{
                display: none;
                @media only screen and (max-width: 450px) {
                    display: flex;
                }
            }
            .input-quantity{
                display: flex;
                height: 50px;
                input {
                    height: 70%;
                    text-align: center;
                    outline: none;
                    width: 40px;
                    font-size: 17px;
                    outline: none;
                    border: none;
                    border-top: 1px solid var(--line) ;
                    border-bottom: 1px solid var(--line) ;
                    box-sizing: border-box;
                    @media only screen and (min-width: 375px) and (max-width: 400px) {
                        height: 25px;
                        width: 30px;
                    }
                    @media only screen and (max-width: 370px) {
                        height: 25px;
                    }
                }
                span {
                    width: 40px;
                    display: block;
                    box-sizing: border-box;
                    border: 1px solid var(--line) ;
                    display: flex;
                    font-size: 17px;
                    align-items: center;
                    justify-content: center;
                    height: 70%;
                    background-color: var(--white);
                    cursor: pointer;
                    @media only screen and (min-width: 375px) and (max-width: 400px) {
                        width: 30px;
                        height: 25px;
                    }
                    transition: 0.2s ease;
                        &:hover{
                        background-color: #dbdbdb93;
                        transition: 0.2s ease;
                    }
                }
            }
        
        }
    }

    .order-total{
        display: flex;
        gap: 10px;
        align-items: center;
        @media only screen and (max-width: 450px) {
            font-size: 15px;
        }
        @media only screen and (max-width: 450px) {
            display: none;
        }
        button{
            height: 35px;
            width: 35px;
            outline: none;
            border: none;
            background-color: var(--orange);
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s ease;
            color: var(--small-text);
            :hover{
                opacity: 0.8;
                transition: 0.3s ease;
            }
        }
    }
`