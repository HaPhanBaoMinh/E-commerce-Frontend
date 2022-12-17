import React from 'react'
import styled from 'styled-components'
import ProductDetail from '../../components/productDetail/ProductDetail'
import ProductTable from '../../components/productList/ProductTable'

function Product() {
    return (
        <Container>
            <ProductDetail />
        </Container>
    )
}

export default Product
const Container = styled.div`
    width: 100%;
    /* height: 95vh; */
    h1{
        font-size: 30px;
        text-align: center;
    }
`