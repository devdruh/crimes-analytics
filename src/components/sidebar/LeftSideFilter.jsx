import getMonthsArray from "../../utils/getMonthsArray";
import useLeftSideFilter from "../../zustand/useLeftSideFilter";
import SelectYearList from "./SelectYearList";
import SelectMonthList from "./SelectMonthList";
import getDaysArray from "../../utils/getDaysArray";
import SelectDayList from "./SelectDayList";
import getLastFiveYearsArray from "../../utils/getFiveYearArray";

const LeftSideFilter = () => {

    const { setSelectedYear, setSelectedMonth, setSelectedDay, selectedYear, selectedMonth } = useLeftSideFilter();

    const handleChangeYear = (value) => {
        setSelectedYear(value);
    };

    const handleChangeMonth = (value) => {
        setSelectedMonth(value);
    };

    const handleChangeDay = (value) => {
        setSelectedDay(value);
    };

    const years = getLastFiveYearsArray();
    const months = getMonthsArray();
    const findMonthValue = months.find(month => month.label === selectedMonth);
    const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));

    return (
        <div className="flex flex-col justify-evenly 2xl:flex-row max-sm:flex-row gap-2 pb-5">
            <div>
                <SelectYearList options={years} onChange={handleChangeYear} defaultValue={years[0].value} />
            </div>
            <div>
                <SelectMonthList options={months} onChange={handleChangeMonth} />
            </div>
            <div>
                <SelectDayList options={days} onChange={handleChangeDay} />
            </div>
        </div>
    )
}

export default LeftSideFilter