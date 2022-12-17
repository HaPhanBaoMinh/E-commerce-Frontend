import React from 'react'
import styled from 'styled-components'
import MyAccount from '../../components/MyAccount/MyAccount'

function Login() {
    return (
        <Container>
            <MyAccount />
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100%;
    padding: 0 var(--padding);
    box-sizing: border-box;
`