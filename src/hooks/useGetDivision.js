
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { queryDivisionStats } from '../utils/layers';
import { useEffect, useState } from 'react'

const useGetDivision = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedYear } = createLeftSideFilter();

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            let prevYear = selectedYear - 1;
            let whereCurr = { year: selectedYear, category: '' };
            let wherePrev = { year: prevYear, category: '' };

            let responseCurr = await queryDivisionStats(whereCurr);
            let responsePrev = await queryDivisionStats(wherePrev);

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
        if (selectedYear !== '') {
            fetchData();
        }

    }, [selectedYear]);

    return { data, loading }
}

export default useGetDivision