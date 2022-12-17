import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';
import { ROUTE } from '../../../api/route';


function ShippingAddress({ isLogin, isNewAddress, setIsNewAddress, addressid, setAddressid, setCountry, setStreet, setDistric, setWards, setCity, setDetail, setPassword, setConfirmPassWord, confirmPassWord, password, detail, city, wards, distric, street, userId }) {
    const [createAccount, setcreateAccount] = useState(false);
    const [AddressList, setAddressList] = useState(undefined);

    useEffect(() => {
        const getAddress = async () => {
            const { data } = await axios.get(`${ROUTE}/api/address/${userId}`);
            setAddressList(data.result)
        }
        if (isLogin) {
            getAddress()
        }

    }, [])


    return (
        <Container>
            <div className="header">
                <h2>Shipping Address</h2>
                {isLogin &&
                    <div className="new-address" onClick={() => setIsNewAddress(pre => !pre)}>
                        <AiOutlinePlus />
                    </div>
                }
            </div>
            <div className={isNewAddress || !isLogin ? "hidden select-addess" : "select-addess"}>
                {AddressList && AddressList.map(add =>
                    <div
                        className={add.id === addressid ? `select-item selected` : `select-item`}
                        onClick={() => setAddressid(add.id)
                        }>
                        <h4>Detail: {add.detail}</h4>
                        <p>City: {add.city}</p>
                        <p>Distric: {add.distric}</p>
                        <p>Wards: {add.wards}</p>
                        <p>Street: {add.street}</p>
                    </div>

                )}
            </div>
            <div className={isNewAddress || !isLogin ? "input-container" : "hidden input-container"}>
                <div className="input-address">
                    <input type="text" placeholder='Address' onChange={(e) => setDetail(e.target.value)} value={detail} />
                </div>
                <div className="input-address-haft">
                    <input type="text" placeholder='Distric' onChange={(e) => setDistric(e.target.value)} value={distric} />
                    <input type="text" placeholder='City' onChange={(e) => setCity(e.target.value)} value={city} />
                </div>
                <div className="input-address-haft">
                    <input type="text" placeholder='Wards' onChange={(e) => setWards(e.target.value)} value={wards} />
                    <input type="text" placeholder='Street' onChange={(e) => setStreet(e.target.value)} value={street} />
                </div>
            </div>
            {!isLogin && <>
                <div className="input-address">
                    <button onClick={() => setcreateAccount(bool => !bool)}>
                        {createAccount ? <BsCheckCircleFill /> : <BsCheckCircle />} Create an account for future purchases?
                    </button>
                </div>
                <div className={`input-address-haft ${createAccount ? "password_show" : "password_hinden"}`}>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <input type="password" placeholder='Comfirm' onChange={(e) => setConfirmPassWord(e.target.value)} value={confirmPassWord} />
                </div>
            </>}
        </Container>
    )
}

export default ShippingAddress

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .header{
        display: flex;
        /* justify-content: space-between; */
        gap: 10px;
        align-items: center;
        .new-address{
            height: 30px;
            background-color: var(--orange);
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;
            &:hover{
                outline: 0.5px solid;
            }
            svg{
                font-size: 17px;
            }
        }
    }
    
    .select-addess{
        height: 170px;
        width: 100%;
        border-radius: 5px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        transition: 0.5s ease;
        gap: 5px;
        
        .select-item{
            height: 170px;
            line-height: 30px;
            background-color: #ffff;
            box-sizing: border-box;
            padding: 10px var(--padding);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            cursor: pointer;
            transition: 0.3s ease;
            &:hover{
                opacity: 0.7;
                transition: 0.3s ease;
            }
        }
        .selected{
            background-color: #8e8e8e3c;
        }
    }
    .input-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 160px;
        transition: 0.5s ease;
        overflow: hidden;
    }
    .hidden{
        height: 0px;
        overflow: hidden;
        transition: 0.5s ease;
    }
    .password_hinden{
        height: 0;
        overflow: hidden;
        transition: 0.3s ease;
    }

    .password_show{
        height: 50px;
        overflow: hidden;
        transition: 0.3s ease;
    }
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
        h2{
            font-size: 20px;
            font-weight: 400;
            padding: 10px 0;
        }
        .input-address{
           
        button{
            height: 45px;
            width: 100%;
            outline: none;
            font-size: 14px;
            box-sizing: border-box;
            background-color: white;
            outline: none;
            border: 1px solid rgb(79, 79, 79);
            border-radius: 2px;
            cursor: pointer;
            :hover{
                opacity: 0.9;
            }
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            svg{
                font-size: 20px;
            }
        }
        width: 100%;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: center;
        gap: 8px;
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