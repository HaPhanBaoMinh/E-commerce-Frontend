import React from 'react'
import styled from 'styled-components'
import Header from './Header'

function HeaderOnly({ children }) {
    return (
        <Container>
            <Header />
            {children}
        </Container>
    )
}

export default HeaderOnly

const Container = styled.div`
    width: 100%;
    height: 100vh;
`