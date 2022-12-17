import React from 'react'
import styled from 'styled-components'
import Item from './Item';

function ProductTable({ col = 4, products }) {
    const widthOfColums = 100 / col;
    return (
        <Container>
            <div className="table">
                {products.map(product =>
                    <Item width={widthOfColums} product={product} key={product.sku} />
                )}
            </div>
        </Container>
    )
}

export default ProductTable

const Container = styled.div`

        width: 100%;
        /* padding: 0 var(--padding); */
        box-sizing: border-box;
        .table {
            width: 100%;
            height: 100%;
            /* border-bottom: 2px solid var(--line);
            border-left: 2px solid var(--line); */
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            box-sizing: border-box;
           
        }
`