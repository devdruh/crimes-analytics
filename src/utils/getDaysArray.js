const getDaysArray = (year, month) => {

    if (isNaN(month) && isNaN(year)) return
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push({ value: i, label: i });
    }

    return daysArray;
}

export default getDaysArray