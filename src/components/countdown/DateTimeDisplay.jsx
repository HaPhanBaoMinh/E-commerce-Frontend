import React from 'react';
import styled from 'styled-components';
// import "./style.css";


const DateTimeDisplay = ({ value, type }) => {
    return (
        <Contaniner >
            <p className='value'>{value}</p>
            <span className='label'>{type}</span>
        </Contaniner>
    );
};

export default DateTimeDisplay;


const Contaniner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    /* width: 15%; */
    .value{
        font-size: 25px;
        font-weight: 600;
        background-color: var(--line_2);
        padding: 10px;
        border-radius: 2px;
    }
    .label {
        font-size: 13px;
        font-weight: 500;
        color: var(--small-text);
    }
`