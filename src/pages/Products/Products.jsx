import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductsFilter from '../../components/productsFilter/ProductsFilter'
import ProductTable from "../../components/productList/ProductTable"
import axios from 'axios';
import { useSelector } from 'react-redux';

function Products() {
    const products = useSelector(state => state.productList);
    const filters = useSelector(state => state.productFilter);
    const [filterProducts, setFilterProducts] = useState([]);


    // useEffect(() => {
    //     setFilterProducts(products)
    // }, [products])

    // console.log(filterProducts);

    useEffect(() => {
        window.scrollTo({
            top: 60,
            left: 0,
            behavior: 'smooth'
        });
        let filterProductsTmp = [];
        if (filters.categoryId === "all") {
            filterProductsTmp = products;
        } else {
            filterProductsTmp = products.filter(product => product.category_id === filters.categoryId);
        }
        filterProductsTmp = filterProductsTmp.filter(product => product.price < filters.maxPrice && product.price > filters.minPrice);
        setFilterProducts(filterProductsTmp);
    }, [filters, products])

    return (
        <Container>
            <ProductsFilter />
            <ProductTable col={3} products={filterProducts} />
        </Container>
    )
}

export default Products

const Container = styled.div`
    width: 100%;
    /* height: 100vh;  */
    padding: 0 var(--padding);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 25% 75%;
    padding-top: 55px;
    margin-bottom: 50px;
    @media only screen and (max-width: 500px) {
        grid-template-columns: none;
    }
`