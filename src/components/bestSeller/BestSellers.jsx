import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { ROUTE } from '../../api/route';
import ProductTable from '../productList/ProductTable'

function BestSellers() {
    const [bestSellersProducts, setBestSellersProducts] = useState([]);
    const productList = useSelector(state => state.productList)

    useEffect(() => {
        const getBestSsaler = async () => {
            const { data } = await axios.get(`${ROUTE}/api/product/bestsellers`);
            if (data.status) {
                const tmpArr = productList.reduce((acc, curr) => {
                    if (data.result.includes(curr.sku)) {
                        return [...acc, curr]
                    } return acc
                }, []);

                setBestSellersProducts(tmpArr);
            }
        }
        getBestSsaler();
    }, [productList])

    return (
        <Container>
            <h3>Start With The Best</h3>
            <h1>Best Sellers</h1>
            <br />
            <ProductTable products={bestSellersProducts} />
        </Container>
    )
}

export default BestSellers

const Container = styled.div`
    width: 100%;
    /* background-color: aqua; */
    padding: 0 var(--padding);
    padding-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    box-sizing: border-box;
    h3{
        font-size: 18px;
        font-weight: 500;
        color: var(--orange);
    }

    h1{
        font-size: 60px;
    }

   
    
`