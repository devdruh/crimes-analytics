import getMonthsArray from "../../utils/getMonthsArray";
import useLeftSideFilter from "../../zustand/useLeftSideFilter";
import SelectYearList from "./SelectYearList";
import SelectMonthList from "./SelectMonthList";
import getDaysArray from "../../utils/getDaysArray";
import SelectDayList from "./SelectDayList";
import getLastFiveYearsArray from "../../utils/getFiveYearArray";
import SelectInputList from "./SelectInputList";
import useGetMCICategoryUniqueValues from "../../hooks/useGetMCICategoryUniqueValues";
import { useEffect, useState } from "react";

const LeftSideFilter = () => {

    const [categoryOption, setCategoryOption] = useState([]);
    const { setSelectedYear, setSelectedMonth, setSelectedDay, setSelectedCategory, selectedYear, selectedMonth } = useLeftSideFilter();
    const { uniqueMCICategory, loading } = useGetMCICategoryUniqueValues();

    const handleChangeYear = (value) => {
        setSelectedYear(value);
    };

    const handleChangeMonth = (value) => {
        setSelectedMonth(value);
    };

    const handleChangeDay = (value) => {
        setSelectedDay(value);
    };

    const handleChangeCategory = (value) => {
        setSelectedCategory(value);
    }

    const years = getLastFiveYearsArray();
    const months = getMonthsArray();
    const findMonthValue = months.find(month => month.label === selectedMonth);
    const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));


    useEffect(() => {
        var categoryArray = [];
        for (let i = 0; i < uniqueMCICategory?.length; i++) {
            categoryArray.push({
                label: uniqueMCICategory[i].value,
                value: uniqueMCICategory[i].value
            })
        }
        setCategoryOption(categoryArray);
    }, [uniqueMCICategory]);

    return (
        <>
            <div className="flex flex-col justify-between 2xl:flex-row max-sm:flex-row gap-2 pb-5">
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
            <div className="flex gap-2 justify-between">
                <div className="w-full">
                    {
                        !loading && categoryOption?.length > 0 && (
                            <SelectInputList options={categoryOption} onChange={handleChangeCategory} labelText={'Category'} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default LeftSideFilter