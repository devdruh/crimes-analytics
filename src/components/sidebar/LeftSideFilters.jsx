import createLeftSideFilter from "../../zustand/createLeftSideFilter";
import LeftSideFilter from "./LeftSideFilter"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { viewClosePopup } from "../../utils/views";

const LeftSideFilters = () => {
    const { year, month, day } = useParams();

    const {
        selectedDay,
        selectedMonth,
        selectedYear,
        setSelectedYear,
        setSelectedMonth,
        setSelectedDay,
    } = createLeftSideFilter();

    useEffect(() => {
        if (year) {
            setSelectedYear(year);
        } else {
            // set current year
            const today = new Date();
            const yearToday = today.getFullYear();
            setSelectedYear(yearToday);
        }

        if (month) {
            setSelectedMonth(month);
        }

        if (day) {
            setSelectedDay(day);
        }

        // close popup on change tab
        viewClosePopup();

    }, [year, month, day, setSelectedYear, setSelectedMonth, setSelectedDay]);

    return selectedYear !== '' && <LeftSideFilter urlYear={selectedYear} urlMonth={selectedMonth} urlDay={selectedDay} />
}

export default LeftSideFilters