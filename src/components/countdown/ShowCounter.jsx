import styled from "styled-components";
import DateTimeDisplay from "./DateTimeDisplay";
// import "./style.css";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <Contaniner className="show-counter">
            <div className="counter-container">
                <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
            </div>
        </Contaniner>
    );
};

export default ShowCounter

const Contaniner = styled.div`
    width: 100%;
.counter-container{
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    box-sizing: border-box;
    padding: 10px 15px;
    border-radius: 5px;
}

.show-counter .countdown {
    line-height: 1.25rem;
    padding: 0 0.75rem 0 0.75rem;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.show-counter .countdown.danger {
    color: #ff0000;
}

.show-counter .countdown>p {
    margin: 0;
}

.show-counter .countdown>span {
    text-transform: uppercase;
    font-size: 0.75rem;
    line-height: 1rem;
}
`