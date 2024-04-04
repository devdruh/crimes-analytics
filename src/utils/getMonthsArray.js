const getMonthsArray = () => {
    const monthsArray = [];
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let i = 0; i < 12; i++) {
        monthsArray.push({ value: i + 1, label: monthNames[i] });
    }

    return monthsArray;
}

export default getMonthsArray