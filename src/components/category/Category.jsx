import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Carousel from 'react-elastic-carousel'
import CaregoryCard from './CaregoryCard'
import axios from 'axios'
import { ROUTE } from '../../api/route'
import { useSelector } from 'react-redux'

function Category() {
    const category = useSelector(state => state.categoryList);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 3 },
        { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
        { width: 1450, itemsToShow: 5 },
        { width: 1750, itemsToShow: 6 },
    ]

    return (
        <Container>
            <div className="category-list">
                {category.length > 0 ?
                    <Carousel
                        itemsToShow={1}
                        itemsToScroll={1}
                        disableArrowsOnEnd={false}
                        showArrows={false}
                        breakPoints={breakPoints}
                    >
                        {category.map(category => <CaregoryCard category={category} key={category.id} />)}
                    </Carousel> :
                    <p className='loading'>Loading...</p>}

            </div>
        </Container>
    )
}

export default Category

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--green);
    padding: 9% var(--padding);
    box-sizing: border-box;
    padding-top: 50px;
    
    @media only screen and (max-width: 450px) {
        height: fit-content;
    }
    @media only screen and (max-width: 650px) and (min-width: 450px) {
        height: fit-content;
    }
    .loading{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }
    .category-list{
        height: 100%;
        width: 100%;
        background-color: var(--white);
        box-sizing: border-box;
        padding: 20px;
        
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

    .rec-carousel-wrapper{
        height: 100%;
    }

`