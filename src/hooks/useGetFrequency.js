import { useEffect, useState } from 'react'
import { queryDaysStats, queryMonthsStats, queryWeeksStats } from '../utils/layers';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import createSelectedFrequency from '../zustand/createSelectedFrequency';

const useGetFrequency = () => {

    const [data, setData] = useState([]);
    const { selectedYear } = createLeftSideFilter();
    const { selectedFrequency } = createSelectedFrequency();

    useEffect(() => {

        const fetchData = async () => {
            let prevYear = selectedYear - 1;
            let whereCurr = `OCC_YEAR = '${selectedYear}'`;
            let wherePrev = `OCC_YEAR = '${selectedYear - 1}'`;

            let responseCurr = [], responsePrev = [];

            if (selectedFrequency === 1) {
                responseCurr = await queryDaysStats(whereCurr);
                responsePrev = await queryDaysStats(wherePrev);
            } else if (selectedFrequency === 2) {
                responseCurr = await queryWeeksStats(whereCurr);
                responsePrev = await queryWeeksStats(wherePrev);

            } else if (selectedFrequency === 3) {
                responseCurr = await queryMonthsStats(whereCurr);
                responsePrev = await queryMonthsStats(wherePrev);
            } else {
                setData([]);
            }

            if (selectedYear === '2014' || selectedYear === 2014) {
                setData([{
                    name: selectedYear,
                    data: responseCurr,
                }]);
            } else {
                setData([{
                    name: selectedYear,
                    data: responseCurr,
                }, {
                    name: prevYear.toString(),
                    data: responsePrev,
                }]);
            }

            return () => { setData([]); };

        }

        if (selectedFrequency !== '' && selectedYear !== '') {
            fetchData();
        }

    }, [selectedFrequency, selectedYear]);

    return { data }
}

export default useGetFrequency