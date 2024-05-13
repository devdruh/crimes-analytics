import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectYearList from "./SelectYearList";
import SelectMonthList from "./SelectMonthList";
import SelectDayList from "./SelectDayList";
import SkeletonSelectInputList from "../../skeleton/SkeletonSelectInputList";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";
// import CategoryFilter from "./CategoryFilter";
import { getDaysArray, getLastFiveYearsArray, getMonthsArray } from "../../utils/formatters";
import { API_MCI_CATEGORY, API_MCI_ENDPOINT } from "../../utils/constants";
import useGetAttributeUniqueValues from "../../hooks/useGetAttributeUniqueValues";
import SelectInputList from "./SelectInputList";
import createActiveTab from "../../zustand/createActiveTab";

// eslint-disable-next-line react/prop-types
const LeftSideFilter = ({ urlYear, urlMonth, urlDay }) => {

    const { attributeValues } = useGetAttributeUniqueValues(API_MCI_CATEGORY, API_MCI_ENDPOINT);

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        setSelectedYear,
        setSelectedMonth,
        setSelectedDay,
        setSelectedCategories,
    } = createLeftSideFilter();

    const { activeTab } = createActiveTab();

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
            navigate(`/filter/${selectedYear}`, { state: { key: value } });
            setSelectedDay('');
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
    const [isLoading, setIsLoading] = useState(true);
    const [years, setYears] = useState(yearsArray);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);

    useEffect(() => {

        const monthsArray = getMonthsArray();
        setMonths(monthsArray);

        const findMonthValue = monthsArray.find(month => month.label === selectedMonth);
        const daysArray = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));
        setDays(daysArray);

        if (urlYear) {
            const lastFiveYears = getLastFiveYearsArray();
            const isYearIncludes = lastFiveYears.some((i) => i.value === parseInt(urlYear));
            if (!isYearIncludes) {
                setYears(() => [
                    ...lastFiveYears,
                    {
                        value: parseInt(urlYear),
                        label: parseInt(urlYear)
                    }
                ]);
            }
            setSelectedYear(urlYear);
        }

        if (urlMonth) {
            setSelectedMonth(urlMonth);
        }

        if (urlDay) {
            setSelectedDay(urlDay);
        }

        if (attributeValues.length > 0) {
            setCategoryOption(attributeValues);
        }

        const timeId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => { clearTimeout(timeId); setSelectedMonth(''); setSelectedDay(''); setSelectedYear(''); setMonths([]); setDays([]); setCategoryOption([]); }

    }, [urlYear, urlMonth, urlDay, selectedDay, selectedMonth, selectedYear, setSelectedYear, setSelectedMonth, setSelectedDay, attributeValues]);

    return (
        <>
            <div className="flex flex-col 2xl:flex-row max-sm:flex-row gap-2 pb-2">

                {
                    isLoading && (
                        <>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                            {
                                activeTab === 1 && (
                                    <>
                                        <div className="pt-3 w-full">
                                            <SkeletonSelectInputList />
                                        </div>
                                        <div className="pt-3 w-full">
                                            <SkeletonSelectInputList />
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
                }
                {
                    !isLoading && years.length > 0 && months.length > 0 && (
                        <>
                            <div className={`${activeTab === 3 && 'w-full'} flex-1`}>
                                <SelectYearList options={years} onChange={handleChangeYear} selected={selectedYear} />
                            </div>
                            {
                                activeTab === 1 && (
                                    <>
                                        <div className="flex-1">
                                            <SelectMonthList options={months} onChange={handleChangeMonth} selected={selectedMonth} />
                                        </div>
                                        <div className="flex-1">
                                            <SelectDayList options={days} onChange={handleChangeDay} selected={selectedDay} />
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
            {
                activeTab === 1 && (
                    <div className="flex gap-2 justify-between">
                        {
                            isLoading && categoryOption && (
                                <div className="pt-3 w-full">
                                    <SkeletonSelectInputList />
                                </div>
                            )
                        }
                        {
                            !isLoading && categoryOption && categoryOption.length > 0 && (
                                <div className="w-full">
                                    <SelectInputList options={categoryOption} onChange={handleChangeCategory} labelText={'Category'} />
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default LeftSideFilter