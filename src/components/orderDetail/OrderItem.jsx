import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import imgSrc from "../../utils/86a408c-6bbc-4454-be20-83931848d7f9.jpg"
import { RiDeleteBin7Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemToCartData, removeItemFromCartData } from '../../action/cartReducerAction';
import { ROUTE } from '../../api/route';
import formatMoney from '../../utils/function/formatMoney';
import axios from 'axios';
import isObjectEmpty from '../../utils/function/isEmptyObject';



function OrderItem({ item, cartList }) {
    const productList = useSelector(state => state.productList);
    const [currentItem, setcurrentItem] = useState({});
    const [cunrrentQuantity, setcunrrentQuantity] = useState(0);
    const dispath = useDispatch();
    const userInfo = useSelector(state => state.userInfo);

    useEffect(() => {
        if (item !== undefined) {
            setcunrrentQuantity(item.quantity)
        }
    }, [item])

    useEffect(() => {
        let canceled = false;
        if (!canceled) {
            if (item !== undefined) {
                setcurrentItem(productList.find(product => product.sku === item.sku))
            }
        }
        return () => canceled = true;
    }, [productList])

    const onIncreaseQuantity = async () => {
        setcunrrentQuantity(num => num + 1)
        dispath(addNewItemToCartData({
            sku: item.sku,
            quantity: 1
        }))
        if (!isObjectEmpty(userInfo)) {
            await axios.post(`${ROUTE}/api/cart`, {
                customer_id: userInfo.id,
                sku: item.sku,
                quantity: 1
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

    const onDecreaseQuantity = async () => {
        if (cunrrentQuantity === 1) {
            dispath(removeItemFromCartData(item.sku));
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

    const onRemoveItem = () => {
        dispath(removeItemFromCartData(item.sku))
    }

    return (
        <Container>
            <div className='order-info'>
                {currentItem.images !== undefined ? <img src={`${ROUTE}/images/${currentItem?.images[0]}`} alt="" /> : <p>Loading...</p>}
                <div className="order-quantity">
                    <p> {currentItem.name} </p>
                    <div className="input-quantity">
                        <span onClick={() => onDecreaseQuantity()}>-</span>
                        <input type="number" value={cunrrentQuantity} onChange={(e) => setcunrrentQuantity(e.target.value)} />
                        <span onClick={() => onIncreaseQuantity()} >+</span>
                    </div>
                    <div className='order-total'>
                        <h2>{
                            Date.parse(item.day_end_discount) < Date.now() ? formatMoney(currentItem.price * item.quantity) : formatMoney(currentItem.discount_price * item.quantity)
                        }</h2>
                        <button onClick={() => onRemoveItem()} ><RiDeleteBin7Line /></button>
                    </div>
                </div>
            </div>

            <div className='order-total'>
                <h2>{
                    Date.parse(item.day_end_discount) < Date.now() ? formatMoney(currentItem.price * item.quantity) : formatMoney(currentItem.discount_price * item.quantity)
                }</h2>
                <button onClick={() => onRemoveItem()}><RiDeleteBin7Line /></button>
            </div>
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
            gap: 20px;
            justify-content: inherit;
            width: 100%;
        }
        img {
            height: 100%;
            border-radius: 5px;
        }
        .order-quantity{
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
            justify-content: center;
            justify-content: center;
            align-items: flex-start;
            @media only screen and (max-width: 450px) {
                gap: 7px;
                align-items: flex-end;
            }
            .order-total{
                display: none;
                @media only screen and (max-width: 450px) {
                    display: flex;
                }
            }
            h1{
                font-weight: 400;
            }
            .input-quantity{
                display: flex;
                height: 50px;
                @media only screen and (max-width: 450px) {
                    height: 30px;
                }
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
                    @media only screen and (max-width: 450px) {
                        height: 100%
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
                    transition: 0.2s ease;
                    @media only screen and (max-width: 450px) {
                        height: 100%;
                    }
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