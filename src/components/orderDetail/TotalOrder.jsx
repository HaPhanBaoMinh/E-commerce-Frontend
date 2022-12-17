import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import formatMoney from '../../utils/function/formatMoney';
import Button2 from '../buttons/Button_2'

function TotalOrder() {
    const cartList = useSelector(state => state.cartList);
    const productList = useSelector(state => state.productList);
    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
        let canceled = false;
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
            <h2>Subtotal:</h2>
            <h1 className='total'> {formatMoney(totalOrder)} </h1>
            <Link to='/checkout'>
                <Button2 width={"70%"} height={"50px"}>
                    <h1>Checkout</h1>
                </Button2>
            </Link>
            <Link to='/products'>Continue Shopping</Link>
        </Container>
    )
}

export default TotalOrder

const Container = styled.div`
    width: 100%;
    height: 300px;
    background-color: var(--white);
    border-radius: 10px;
    margin: auto;
    box-shadow: 0px 0px 1.55px 0.5px var(--small-text);
    box-sizing: border-box;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9%;
    justify-content: center;
    h2{
        font-size: 20px;
        color: var(--small-text);
    }
    .total {
        font-size: 25px;
    }
`