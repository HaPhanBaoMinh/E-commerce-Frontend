import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import OrderItem from './OrderItem'

function OrderList() {
    const cartList = useSelector(state => state.cartList);

    return (
        <Container>
            <h1>Shopping Cart</h1>
            <div className='list'>
                {cartList.length > 0 ? cartList.map((item, index) => <OrderItem key={index} item={item} cartList={cartList} />) : <p>NO ITEM IN CART</p>}
            </div>
        </Container>
    )
}

export default OrderList

const Container = styled.div`
    width:90%;
    /* height: 70%; */
    background-color: rgb(245, 245, 249);
    margin: auto;
    box-sizing: border-box;
    padding: 30px 35px;
    p{
        margin-top: 10px;
    }
    @media only screen and (max-width: 450px) {
        padding: 20px 25px;
        width: 100%;
        margin: 0;
    }
    h1{
        font-size: 20px;
        border-bottom: 2px solid var(--line_2);
        padding-bottom: 10px;
    }
    .list{
        width: 100%;
        
    }
`