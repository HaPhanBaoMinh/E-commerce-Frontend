import styled from "styled-components";

const ExpiredNotice = () => {
    return (
        <Contaniner className="expired-notice">
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
        </Contaniner>
    );
};

export default ExpiredNotice

const Contaniner = styled.div`
    
    text-align: center;
    padding: 2rem;
    border: 1px solid #ebebeb;
    border-radius: 0.25rem;
    margin: 0.5rem;

.expired-notice>span {
    font-size: 2.5rem;
    font-weight: bold;
    color: red;
}

.expired-notice>p {
    font-size: 1.5rem;
}

`