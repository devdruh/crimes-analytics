import { useEffect, useState } from 'react'
import { queryDaysStats, queryMonthsStats, queryWeeksStats } from '../utils/layers';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import createSelectedFrequency from '../zustand/createSelectedFrequency';

const useGetFrequency = () => {

    const [data, setData] = useState([]);
    const { selectedYear } = createLeftSideFilter();
    const { selectedFrequency } = createSelectedFrequency();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
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
                setLoading(false);
            } else {
                setData([{
                    name: selectedYear.toString(),
                    data: responseCurr,
                }, {
                    name: prevYear.toString(),
                    data: responsePrev,
                }]);
                setLoading(false);
            }

            return () => { setData([]); setLoading(false); };

        }

        if (selectedFrequency !== '' && selectedYear !== '') {
            fetchData();
        }

    }, [selectedFrequency, selectedYear]);

    return { data, loading }
}

export default useGetFrequency