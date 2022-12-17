import React from 'react'
import styled from 'styled-components'
import { TfiPackage } from 'react-icons/tfi';


function SuccessOrder() {
    return (
        <Container>
            <div className="logo">
                <TfiPackage />
            </div>
            <h1>Thank you !</h1>
            <h4>for your order</h4>
        </Container>
    )
}

export default SuccessOrder

const Container = styled.div`
    width: 100%;
    height: 200px;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    h1{
        text-transform: uppercase;
        font-size: 35px;
    }
    h4{
        text-transform: uppercase;
    }
    .logo {
        height: 70px;
        width: 70px;
        background-color: #ffffff;
        border: 2px solid var(--orange);
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            font-size: 30px;
            color: var(--orange);
        }
    }
    
`