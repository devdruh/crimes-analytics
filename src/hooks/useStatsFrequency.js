import { useEffect, useState } from 'react'
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { queryDaysStats, queryHoursStats, queryMonthsStats, queryWeeksStats } from '../utils/layers';
import { getMaxValue, getMinValue } from '../utils/formatters';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

const useStatsFrequency = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { selectedYear } = createLeftSideFilter(useShallow((state) => ({ selectedYear: state.selectedYear })));

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
            let where = `OCC_YEAR = '${selectedYear}'`

            const monthData = await queryMonthsStats(where);
            const weekData = await queryWeeksStats(where);
            const dayData = await queryDaysStats(where);
            const hourData = await queryHoursStats(where);


            Promise.all([monthData, weekData, dayData, hourData])
                .then((response) => {
                    let statsData = [];
                    const month = response[0];
                    const week = response[1];
                    const day = response[2];
                    const hour = response[3];

                    statsData.push({
                        name: 'month',
                        label: getMaxValue(month).label,
                        value: getMaxValue(month).value,
                        desc: "Highest Month of " + selectedYear,
                        icon: 1
                    });

                    statsData.push({
                        name: 'week',
                        label: getMaxValue(week).label,
                        value: getMaxValue(week).value,
                        desc: "Highest Day of Week",
                        icon: 1
                    });

                    statsData.push({
                        name: 'day',
                        label: getMaxValue(day).label.toString(),
                        value: getMaxValue(day).value,
                        desc: "Highest Day of Months",
                        icon: 1
                    });

                    statsData.push({
                        name: 'hour',
                        label: getMaxValue(hour).text,
                        value: getMaxValue(hour).value,
                        desc: "Highest Hour of Days",
                        icon: getMaxValue(hour).label
                    });

                    // Lowest
                    statsData.push({
                        name: 'month',
                        label: getMinValue(month).label,
                        value: getMinValue(month).value,
                        desc: "Lowest Month of " + selectedYear,
                        icon: 0
                    });

                    statsData.push({
                        name: 'week',
                        label: getMinValue(week).label,
                        value: getMinValue(week).value,
                        desc: "Lowest Day of Week",
                        icon: 0
                    });

                    statsData.push({
                        name: 'day',
                        label: getMinValue(day).label.toString(),
                        value: getMinValue(day).value,
                        desc: "Lowest Day of Months",
                        icon: 0
                    });

                    statsData.push({
                        name: 'hour',
                        label: getMinValue(hour).text,
                        value: getMinValue(hour).value,
                        desc: "Lowest Hour of Days",
                        icon: getMinValue(hour).label
                    });

                    setData(statsData);
                }).catch((error) => {
                    toast.error(error.message, { position: "bottom-right" });
                }).finally(() => {
                    setLoading(false);
                });

            return () => { setData([]); }

        }

        if (selectedYear !== '') {
            fetchData();
        }


    }, [selectedYear]);

    return { data, loading }
}

export default useStatsFrequency