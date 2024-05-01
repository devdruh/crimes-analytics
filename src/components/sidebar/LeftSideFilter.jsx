import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectYearList from "./SelectYearList";
import SelectMonthList from "./SelectMonthList";
import SelectDayList from "./SelectDayList";
import SelectInputList from "./SelectInputList";
import SkeletonSelectInputList from "../../skeleton/SkeletonSelectInputList";
import useGetAttributeUniqueValues from "../../hooks/useGetAttributeUniqueValues";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";
import { getDaysArray, getLastFiveYearsArray, getMonthsArray } from "../../utils/formatters";
import { API_MCI_CATEGORY, API_MCI_ENDPOINT } from "../../utils/constants";

// eslint-disable-next-line react/prop-types
const LeftSideFilter = () => {

    const [isLoading, setIsLoading] = useState(true);

    const {
        setSelectedYear,
        setSelectedMonth,
        setSelectedDay,
        selectedYear,
        selectedMonth,
        selectedDay,
        setSelectedCategories,
    } = createLeftSideFilter();

    const navigate = useNavigate();

    const handleChangeYear = (value) => {
        setSelectedYear(value);

        if (selectedMonth === '' && selectedDay === '') {
            navigate(`/filter/${value}`, { state: { key: value } });
        } else if (selectedMonth !== '' && selectedDay === '') {
            navigate(`/filter/${value}/${selectedMonth}`, { state: { key: value } });
        } else if (selectedMonth !== '' && selectedDay !== '') {
            navigate(`/filter/${value}/${selectedMonth}/${selectedDay}`, { state: { key: value } });
        }

    };

    const handleChangeMonth = (value) => {
        setSelectedMonth(value);

        if (value === '') { 
            setSelectedDay('');
            navigate(`/filter/${selectedYear}`, { state: { key: value } });
        } else {

            if (selectedDay === '') {
                navigate(`/filter/${selectedYear}/${value}`, { state: { key: value } });
            } else {
                navigate(`/filter/${selectedYear}/${value}/${selectedDay}`, { state: { key: value } });
            }
        }

    };

    const handleChangeDay = (value) => {
        setSelectedDay(value);
        navigate(`/filter/${selectedYear}/${selectedMonth}/${value}`, { state: { key: value } });
    };

    const handleChangeCategory = (value) => {
        setSelectedCategories(value);
    }

    const yearsArray = getLastFiveYearsArray();
    const [years, setYears] = useState(yearsArray);
    const { year, month, day } = useParams();

    const months = getMonthsArray();
    const findMonthValue = months.find(month => month.label === selectedMonth);
    const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));

    const { attributeValues } = useGetAttributeUniqueValues(API_MCI_CATEGORY, API_MCI_ENDPOINT);
    const [categoryOption, setCategoryOption] = useState([]);

    useEffect(() => {

        if (year) {
            const lastFiveYears = getLastFiveYearsArray();
            const isYearIncludes = lastFiveYears.some((i) => i.value === parseInt(year));
            if (!isYearIncludes) {
                setYears(() => [
                    ...lastFiveYears,
                    {
                        value: parseInt(year),
                        label: parseInt(year)
                    }
                ]);
            }
            setSelectedYear(year);
        }

        if (month) {
            setSelectedMonth(month);
        }
        if (day) {
            setSelectedDay(day);
        }

        if (attributeValues.length > 0) {
            setCategoryOption(attributeValues)
        }

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);

    }, [attributeValues, year, month, day, setSelectedYear, setSelectedMonth, setSelectedDay]);

    return (
        <>
            <div className="flex flex-col justify-between 2xl:flex-row max-sm:flex-row gap-2 pb-5">

                {
                    isLoading && (
                        <>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                        </>
                    )
                }
                {
                    !isLoading && selectedYear.length > 0 && (
                        <>
                            <div>
                                <SelectYearList options={years} onChange={handleChangeYear} selected={selectedYear} />
                            </div>
                            <div>
                                <SelectMonthList options={months} onChange={handleChangeMonth} selected={selectedMonth} />
                            </div>
                            <div>
                                <SelectDayList options={days} onChange={handleChangeDay} selected={selectedDay} />
                            </div>
                        </>
                    )
                }
            </div>
            <div className="flex gap-2 justify-between">
                <div className="w-full">
                    {
                        !isLoading && categoryOption && categoryOption.length > 0 && (
                            <SelectInputList options={categoryOption} onChange={handleChangeCategory} labelText={'Category'} />
                        )
                    }
                    {
                        isLoading && (
                            <div className="pt-3">
                                <SkeletonSelectInputList />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default LeftSideFilter