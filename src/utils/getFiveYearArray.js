const getLastFiveYearsArray = () => {

    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let i = 0; i < 5; i++) {
        yearsArray.push({ value: currentYear - i, label: currentYear - i });
    }

    return yearsArray;
}

export default getLastFiveYearsArray;
