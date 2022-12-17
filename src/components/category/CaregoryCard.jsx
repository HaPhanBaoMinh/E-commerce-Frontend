import React, { useState } from 'react'
import styled from 'styled-components'
import { ROUTE } from '../../api/route'
import { useNavigate } from "react-router-dom";
// import src from "../../utils/86a408c-6bbc-4454-be20-83931848d7f9.jpg"
import Button1 from '../buttons/Button_1'
import { useDispatch } from 'react-redux';
import updateFilter from '../../action/filterReducerAction';

function CaregoryCard({ category }) {
    const navigate = useNavigate();
    const dispath = useDispatch();

    const onClickCategory = () => {
        dispath(updateFilter({
            minPrice: 0,
            maxPrice: 100000000,
            categoryId: category.id
        }))
        return navigate("/products");
    }

    return (
        <Contaniner >
            <div className='CaregoryCard-content' >
                <div className='CaregoryCard-img'>
                    <img src={`${ROUTE}/images/${category.image}`} alt="category" />
                </div>
                <h1> {category.name} </h1>
                <p>{category.description}</p>
                <Button1 width={"45%"} height={"45px"} onClick={() => onClickCategory()} >
                    <h2>Explore</h2>
                </Button1>
            </div>
        </Contaniner>
    )
}

export default CaregoryCard

const Contaniner = styled.div`
    height: 80%;
    width: 100%;
    max-width: 330px;
    box-sizing: border-box;
    padding: 0 10px;
    .CaregoryCard-content {
        height: 100%;
        height: 100%;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 0 5px;
        padding-bottom: 30px;
        box-sizing: border-box;
        h1{
            font-size: 25px;
            white-space: nowrap;
        }
        h2{
            font-size: 17px;
        }
        p{
            box-sizing: border-box;
            padding: 0 20px;
            font-size: 15px;
            color: var(--small-text);
        }
        .CaregoryCard-img {
            width: 75%;
            height: 30%;
            /* background-color: aquamarine; */
            display: flex;
            align-items: center;
            
            img {
                width: 100%;
            }
        }
    }
`