import React from 'react'
import styled from 'styled-components'


function Button2({ height, width, radius = "5px", children, onClick }) {
    return (
        <button style={{ height: height, width: width, padding: 0, border: 0, borderRadius: radius, overflow: "hidden" }} onClick={onClick}>
            <Container>
                {children}
            </Container>
        </button>
    )
}

export default Button2

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
    ::before{
        content: "";
        width: 200px;
        height: 90%;
        background-color: #ffffffac;
        position: absolute;
        top: 0;
        left: -50vw;
        transform: rotate(-45deg) ;
        transition: 0.5s ease;
            }
                    
                &:hover{
        }
            &:hover::before{
            transition: 0.5s ease;
            left: 100%;
    }
`

