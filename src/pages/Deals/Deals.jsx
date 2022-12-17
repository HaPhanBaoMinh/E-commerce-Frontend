import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DealsProduct from '../../components/productDeals/DealsProduct'
import Carousel from 'react-elastic-carousel'
import axios from 'axios'
import { ROUTE } from '../../api/route'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
]
function Deals() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const productList = useSelector(state => state.productList)
    const [discountProducts, setDiscountProducts] = useState([]);


    useEffect(() => {
        let canceled = false;
        // fetch products data
        setIsLoading(true);
        (
            async () => {
                const { data } = await axios.get(`${ROUTE}/api/product/discount`);
                if (data.status) {
                    if (!canceled) {
                        const tmpArr = productList.reduce((acc, curr) => {
                            if (data.result.includes(curr.sku)) {
                                return [...acc, curr]
                            } return acc
                        }, [])
                        setDiscountProducts(tmpArr);
                    }
                    setIsLoading(false);
                } else {
                    setIsError(true);
                    setErrorMsg(data.msg)
                    setIsLoading(false);
                }
            }
        )();
        return () => canceled = true;
    }, [productList])

    return (
        <Container>
            <div className="back-ground">
                <h1>Limited Time Deals</h1>
                <p>A small supporting sub headline.</p>
                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 1921 273" >
                    <path fill="rgba(255, 255, 255, 1)" d="M1897,44c-27.225-3.493-36.3-15.483-67-20-36.435-5.361-56.969,8.474-89,16-61.3,14.4-80.376-1.993-139-14-83-17-181,34-638,34-1.329,0-2.665,0-4-.006S957.329,60,956,60C499,60,401,9,318,26c-58.624,12.007-77.7,28.4-139,14-32.031-7.526-52.565-21.361-89-16C59.3,28.517,50.225,40.507,23,44c-18.082,2.32-45.013-.8-81-28V83H1978V16C1942.013,43.2,1915.082,46.32,1897,44Z"></path>
                </svg> */}
            </div>

            <div className="product-cards">
                <Carousel
                    itemsToShow={3}
                    itemsToScroll={1}
                    disableArrowsOnEnd={false}
                    showArrows={false}
                    breakPoints={breakPoints}
                >
                    {discountProducts.map(product => <DealsProduct product={product} key={uuidv4()} />)}
                </Carousel>
            </div>

        </Container>
    )
}

export default Deals

const Container = styled.div`
    height: 120vh;
    width: 100%;
    /* background-color: aquamarine; */
    position: relative;
    @media only screen and (max-width: 450px) {
        height: 132vh;
    }
    .back-ground{
        width: 100%;
        height: 15%;
        background-color: var(--green);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        @media only screen and (max-width: 450px) {
            height: 15%;
        }
        h1{
            font-size: 52px;
            padding: 0 var(--padding);
            @media only screen and (max-width: 450px) {
                font-size: 40px;
            }

            @media only screen and (max-width: 380px) {
                font-size: 30px;
            }
        }
        p{
            font-size: 18px;
            font-weight: 300;
            color: var(--small-text)
        }
        svg {
            position: absolute;
            bottom: -60px;
            height: 85px;
            width: 100%;
        }
    }
    .product-cards{
        /* height: 65%; */
        display: flex;
        margin-top: 15px;
        padding: 0 var(--padding);
        gap: 40px;
        width: 100%;
        position: absolute;
        box-sizing: border-box;
        justify-content: center;
        @media only screen and (max-width: 450px) {
            height: 75%;
            bottom: 5%;
        }
        .rec-dot{
        box-shadow: none;
        background-color: var(--white);
        height: 15px;
        width: 15px;
        border: 1px solid var(--small-text);
    }
    .rec-dot_active {
        background-color: var(--orange);   
    }
    }
`