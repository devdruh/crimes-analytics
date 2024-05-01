export const formatHour12 = (time) => {
    return time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

export const getYearRange = (startYear, endYear) => {

    let years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year)
    }

    return years;
}

export const getDaysArray = (year, month) => {

    if (isNaN(month) && isNaN(year)) return
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push({ value: i, label: i });
    }

    return daysArray;
}

export const getMonthsArray = () => {

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

export const getLastFiveYearsArray = () => {

    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let i = 0; i < 5; i++) {
        yearsArray.push({ value: currentYear - i, label: currentYear - i });
    }

    return yearsArray;
}