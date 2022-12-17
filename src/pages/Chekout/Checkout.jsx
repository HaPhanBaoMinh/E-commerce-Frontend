import React from 'react'
import styled from 'styled-components'
import Button2 from '../../components/buttons/Button_2'
import CartDetail from '../../components/cartDetail/CartDetail'
import CheckoutInfo from '../../components/checkoutInformation/CheckoutInfo'
import OrderList from '../../components/orderDetail/OrderList'

function Checkout() {
    return (
        <Container>
            <CheckoutInfo />
            <CartDetail />
        </Container>
    )
}

export default Checkout

const Container = styled.div`
    width: 100%;
    background-color: rgb(241, 243, 245);
    display: grid;
    min-height: 75%;
    grid-template-columns: 60% 40%;
    padding: 50px var(--padding);
    box-sizing: border-box;
    @media only screen and (max-width: 450px) {
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
    }
`