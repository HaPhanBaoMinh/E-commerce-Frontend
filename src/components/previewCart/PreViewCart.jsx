import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button2 from '../buttons/Button_2'
import OrderItem from '../cartDetail/OrderItem'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatMoney from '../../utils/function/formatMoney';


function PreViewCart() {
    const isShowPreviewCart = useSelector(state => state.showPreviewCart);
    const cartList = useSelector(state => state.cartList);
    const productList = useSelector(state => state.productList);
    const [totalOrder, setTotalOrder] = useState(0);
    const dispath = useDispatch();

    const onClose = () => {
        dispath({ type: "CLOSE_PREVIEW_CART" });
    }

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
        <Container style={isShowPreviewCart ? { transform: "translateX(0)" } : {}}>
            <h1>
                Shopping Cart
                <AiOutlineClose onClick={() => onClose()} />
            </h1>
            <div className='list'>
                {cartList.map(item => <OrderItem item={item} key={item.sku} cartList={cartList} />)}
            </div>
            <h1 className='total'>Total: {formatMoney(totalOrder)} </h1>
            <Link to='/cart' onClick={() => onClose()}>
                <button>
                    View Cart
                </button>
            </Link>
            <Link to='/checkout'>
                <Button2 onClick={() => onClose()}>
                    <h2>Checkout</h2>
                </Button2>
            </Link>
        </Container>
    )
}

export default PreViewCart

const Container = styled.div`
    height: 100vh;
    width: 30vw;
    background-color: #ffffff;
    box-shadow: 1px 1px 6px 1px;;
    position: fixed;
    top: 0;
    right: -5px;
    z-index: 999;
    box-sizing: border-box;
    padding: 20px 20px;
    gap: 15px;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: 0.3s ease;
    @media only screen and (max-width: 450px) {
        width: 102%;
    }

    @media only screen and (max-width: 850px) and (min-width: 450px) {
        width: 102%;
    }

    h1{
        font-size: 20px;
        border-bottom: 2px solid var(--line_2);
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
       
        svg{
            font-size: 25px;
            cursor: pointer;
        }
    }
    .list{
        width: 100%;
        height: 70%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 13px;
        padding-right: 10px;
    }
    .total{
        text-align: right;
       
    }
    button{
        display: block;
        height: 40px;
        background-color: var(--blur);
        width: 70%;
        margin: 0 auto;
        cursor: pointer;
    }
`