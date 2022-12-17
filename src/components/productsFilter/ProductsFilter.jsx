import { React, useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from '@mui/material/Slider';
import formatMoney from '../../utils/function/formatMoney';
import { useDispatch, useSelector } from 'react-redux';
import updateFilter from '../../action/filterReducerAction';

function ProductsFilter() {
    const [value, setValue] = useState([0, 10000000]);
    const category = useSelector(state => state.categoryList);
    const filters = useSelector(state => state.productFilter);
    const [currentChoise, setcurrentChoise] = useState(filters.categoryId);
    const dispath = useDispatch();

    useEffect(() => {
        let canceled = false;

        if (!canceled) {
            dispath(updateFilter({
                minPrice: value[0],
                maxPrice: value[1],
                categoryId: currentChoise
            }))
        }
        return () => canceled = true;

    }, [value, currentChoise])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <div className="filter">
                <h1 className='filter-title'>Category</h1>
                <ul className='category-list'>
                    <li className={`category-item ${currentChoise === 'all' && "selected"}`} onClick={() => setcurrentChoise('all')} >
                        <span></span>
                        <h4>All Products</h4>
                    </li>

                    {category.map((cate, index) => {
                        return (
                            <li key={cate.id} className={`category-item ${currentChoise === cate.id && "selected"}`} onClick={() => setcurrentChoise(cate.id)}  >
                                <span></span>
                                <h4> {cate.name} </h4>
                            </li>
                        )
                    })}

                </ul>
            </div>
            <div className="filter">
                <h1 className='filter-title'>Price (Initial price)</h1>
                <br />
                <Slider
                    defaultValue={0}
                    onChange={handleChange}
                    value={value}
                    disableSwap
                    min={0}
                    max={10000000}
                    step={100000}
                    sx={{
                        height: 2,
                        color: 'rgba(255, 177, 41, 1)',
                        marginLeft: "10px",
                        width: "initial",
                    }}
                />
                <div className="filter-price">
                    <h2>{formatMoney(value[0])}</h2>
                    <h2>{formatMoney(value[1])}</h2>
                </div>
            </div>
        </Container >
    )
}

export default ProductsFilter

const Container = styled.div`
    /* background-color: aqua; */
    box-sizing: border-box;
    padding: 0 5%;
    @media only screen and (max-width: 450px) {
        padding: 0;
    }
    .filter{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        .filter-price{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-left: 5px;
        }
        .filter-title{
            font-size: 18px;
            font-weight: 500;
            height: 40px;
            display: flex;
            align-items: center;
            border-bottom: 2px solid var(--line_2);
        }
        .category-list{
            width: 100%;
            /* background-color: aquamarine; */
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
            
            .category-item{
                transition: 0.2s ease;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
                &:hover{
                    color: var(--orange);
                    transition: 0.2s ease;
                }
                &:hover span{
                    background-color: var(--orange);
                    transition: 0.2s ease;
                }
                h4{
                    font-weight: 400;
                }
                span{
                    height: 15px;
                    width: 15px;
                    display: block;
                    background-color: var(--line);
                    border-radius: 50px;
                    transition: 0.2s ease;

                }
            }
            .selected {
                color: var(--orange);
                span {
                    background-color: var(--orange);
                }
            }
        }
    }
`