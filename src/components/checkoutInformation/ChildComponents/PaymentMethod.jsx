import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'

function PaymentMethod({ setPayMethod, payMethod }) {
    return (
        <Container>
            <h2>Payment Method</h2>
            <div className="input-info">
                <div className="payment-method">
                    <input type="radio" id="payment" name="payment" value="cod" onClick={() => setPayMethod("cod")} />
                    <label htmlFor="payment">Thanh toán khi giao hàng (COD)</label>
                </div>
                <div className={`method-content ${payMethod === 'cod' ? "select" : ""}`}>
                    <p>- Khách nhận hàng vui lòng thanh toán tiền hàng + tiền ship cho bên vận chuyển.</p>
                    <p>- Shop cam kết hỗ trợ đổi size/giày trong vòng 7 ngày đối với HÀNG MỚI chưa qua sử dụng. Quý khách vui lòng giữ giày sạch khi thử phòng trường hợp phải đổi hàng.</p>
                    <p>- Shop Company HỖ TRỢ CHO XEM HÀNG NHƯNG KHÔNG HỖ TRỢ CHO KHÁCH THỬ GIÀY KHI NHẬN HÀNG</p>
                </div>

                <div className="payment-method">
                    <input type="radio" id="payment" name="payment" value="bank" onClick={() => setPayMethod("bank")} />
                    <label htmlFor="payment">Internet Banking</label>
                </div>
                <div className={`method-content ${payMethod === 'bank' ? "select" : ""}`}>
                    <p>- Quý khách vui lòng chuyển khoản tới một trong những ngân hàng dưới đây theo cú pháp nội dung: (SĐT mua hàng) ck đơn hàng (Mã đơn hàng)</p>
                    <p>Vietinbank <br />
                        Số TK : XXXXXXXX <br />
                        Chủ TK : Hà Phan Bảo MinhMinh <br />
                        Vietcombank Tp. Bảo Lộc
                    </p>
                    {/* <p>- Shop Company HỖ TRỢ CHO XEM HÀNG NHƯNG KHÔNG HỖ TRỢ CHO KHÁCH THỬ GIÀY KHI NHẬN HÀNG</p> */}
                </div>
            </div>
        </Container>
    )
}

export default PaymentMethod

const Container = styled.div`
    width: 100%;
    height: 50%;
    h2{
        font-size: 20px;
        font-weight: 400;
        padding: 10px 0;
    }
    .input-info{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
        .payment-method{
            height: 50px;
            display: flex;
            gap: 10px;
            align-items: center;
            input{
                font-size: 100%;
                /* :checked ~ label{
                    font-size: 200px;
                } */
            }
        }
        .method-content{
            width: 100%;
            /* height: 200px; */
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 10px;
            text-align: left;
            border-radius: 10px;
            flex-direction: column;
            gap: 5px;
            height: 0;
            overflow: hidden;
            transition: 0.2s ease;
            p {
                font-size: 14px;
                line-height: 20px;
            }
        }

        .select{
            height: 200px;
            overflow: hidden;
            transition: 0.2s ease;
        }
    }
`