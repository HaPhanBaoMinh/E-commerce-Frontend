import React from 'react'
import styled from 'styled-components'


function Button1({ height, width, radius = "5px", children, onClick }) {
    return (
        <button style={{ height: height, width: width, padding: 0, border: 0, borderRadius: radius, overflow: "hidden" }} onClick={onClick} >
            <Container>
                {children}
            </Container>
        </button>
    )
}

export default Button1

const Container = styled.div`
    width: 100%;
    height: 100%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    box-shadow: inset 0 0 0 0 red;
    transition: 0.4s ease;
    position: relative;
    cursor: pointer;
    background-color: var(--orange);
    ::before {
        content: "";
        width: 100%;
        height: 100%;
        background-color: var(--black);
        position: absolute;
        transform: translateX(-101%);
        transition: 0.4s ease;
        border-radius: 2px;
    }
    ::before {
        transform: translateX(-101%);
    }
    &:hover::before{
        transform: translateX(0);
        transition: 0.4s ease;
    }
    &:hover h2{
       color: var(--white);
       transition: 0.4s ease;
    }

    &:hover h1{
       color: var(--white);
       transition: 0.4s ease;
    }
   
    h2{
        z-index: 1;
        transition: 0.4s ease;
    }

    h1{
        z-index: 1;
        transition: 0.4s ease;
    }
`

