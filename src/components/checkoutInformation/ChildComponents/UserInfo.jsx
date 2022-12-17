import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function UserInfo({ setLastname, setFirstName, setEmail, setPhone, phone, email, firstName, lastname, isLogin }) {
    return (
        <Container>
            <h2>Customer Information</h2>
            <br />
            <div className="input-info">
                <div className="input-address-haft">
                    <input type="text" placeholder='LastName' onChange={(e) => setLastname(e.target.value)} value={lastname} disabled={isLogin && "disabled"} />
                    <input type="text" placeholder='FirstName' onChange={(e) => setFirstName(e.target.value)} value={firstName} disabled={isLogin && "disabled"} />

                </div>
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLogin && "disabled"} />
                <input type="text" placeholder='Phone' onChange={(e) => setPhone(e.target.value)} value={phone} disabled={isLogin && "disabled"} />
                <p>Already have an account?
                    <Link to='/login' className='contact-my-profile'>
                        <span>Login</span>
                    </Link>
                </p>
            </div>
        </Container>
    )
}

export default UserInfo

const Container = styled.div`
    width: 100%;
    height: 50%;
    h2{
        font-size: 20px;
        font-weight: 400;
        padding: 10px 0;
    }
    .input-info{
        width: 100%;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: center;
        gap: 8px;
        .input-address-haft{
        width: 100%;
        display: flex;
        gap: 10px;
        box-sizing: border-box;
            input{
                height: 45px;
                width: 50%;
                outline: none;
                font-size: 14px;
                box-sizing: border-box;
                padding-left: 10px;
            }
        }
        p {
            display: flex;
            gap: 5px;
        }
        input{
            height: 45px;
            outline: none;
            font-size: 14px;
            box-sizing: border-box;
            padding-left: 10px;
        }
        span{
            display: inline;
            color: var(--orange);
        }
    }
`