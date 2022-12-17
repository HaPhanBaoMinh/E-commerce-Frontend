import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import OrderItem from './OrderItem.jsx'
import { v4 as uuidv4 } from 'uuid';
import formatMoney from '../../utils/function/formatMoney.js';

function CartDetail() {
    const cartList = useSelector(state => state.cartList);
    const productList = useSelector(state => state.productList);
    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
        let canceled = false;
        window.scrollTo({
            top: 60,
            left: 0,
            behavior: 'smooth'
        });
        if (!canceled) {
            let total = 0;
            const formatProductList = productList.reduce((acc, curr) => {
                return { ...acc, [curr.sku]: curr }
            }, {})

            cartList.map(item => {
                const saleDate = Date.parse(formatProductList[item.sku].day_end_discount)
                // sale product
                if (saleDate < Date.now()) {
                    total += formatProductList[item.sku].price * item.quantity;
                } else {
                    total += formatProductList[item.sku].discount_price * item.quantity;
                }
            })
            setTotalOrder(total);
        }
        return () => canceled = true;
    }, [cartList])

    return (
        <Container>
            <h1>Shopping Cart</h1>
            <div className='list'>
                {
                    cartList.length > 0 ? cartList.map(item => <OrderItem key={uuidv4()} item={item} cartList={cartList} />) : <p>NO ITEM IN CART</p>
                }
            </div>
            <h1 className='total'> {formatMoney(totalOrder)} </h1>
        </Container>
    )
}

export default CartDetail

const Container = styled.div`
    width:90%;
    background-color: var(--white);
    margin: auto;
    box-sizing: border-box;
    padding: 30px 35px;
    @media only screen and (max-width: 450px) {
        margin: 0;
        width: 100%;
    }
    
    h1{
        font-size: 20px;
        border-bottom: 2px solid var(--line_2);
        padding-bottom: 10px;
    }
    .list{
        width: 100%;
        p{
            font-size: 20px;
            height: 80px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .total{
        text-align: right;
        margin-top: 35px;
    }
`