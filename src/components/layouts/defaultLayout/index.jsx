import React, { useEffect } from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'

function DefaultLayout({ children }) {
    useEffect(() => {
        window.scrollTo({
            top: 60,
            left: 0,
            behavior: 'smooth'
        });
    }, [])
    return (
        <Container>
            <Header />
            {children}
            <Footer />
        </Container>
    )
}

export default DefaultLayout

const Container = styled.div`
    width: 100%;
    height: 100vh;
    /* overflow-y: unset; */
`