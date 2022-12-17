import React from 'react'
import styled from 'styled-components'

function Contact() {
    return (
        <Container>
            <h1>Contact</h1>
        </Container>
    )
}

export default Contact

const Container = styled.div`
    width: 100%;
    height: 80vh;
    background-color: var(white);
    display: flex;
    align-items: center;
    justify-content: center;
    h1{
        font-size: 40px;
    }
`