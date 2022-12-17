import React from 'react'
import styled from 'styled-components'
import CartDetail from '../../components/cartDetail/CartDetail'
import OrderList from '../../components/orderDetail/OrderList'
import TotalOrder from '../../components/orderDetail/TotalOrder'

function Cart() {
    return (
        <Container>
            <OrderList />
            <TotalOrder />
        </Container>
    )
}

export default Cart

const Container = styled.div`
    width: 100%;
    min-height: 70vh;
    box-sizing: border-box;
    padding: 0px var(--padding);
    display: grid;
    grid-template-columns: 70% 30%;
    margin: 50px 0;
    @media only screen and (max-width: 450px) {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
`