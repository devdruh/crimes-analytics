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

export const formatCategoryQuery = (categories) => {

    let categoryQuery = `AND MCI_CATEGORY IN`;
    let categoryItems = ``;

    if (categories) {

        for (let index = 0; index < categories.length; index++) {
            const title = categories[index].value;

            if (index === 0) {
                categoryItems = `'${title}'`;
            } else {
                categoryItems += `, '${title}'`;
            }

        }

        categoryQuery += ` (${categoryItems})`;

    }

    return categories.length > 0 ? categoryQuery : []
}

export const getPreviousMonth = (month) => {

    const months = getMonthsArray();
    let previousMonthIndex = months.findIndex(e => e.label === month) - 1;

    return previousMonthIndex < 0 ? months[months.length - 1] : months[previousMonthIndex];

}