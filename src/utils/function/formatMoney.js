const formatMoney = (number) => {
    number = number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    return number
}

export default formatMoney