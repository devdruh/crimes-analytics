
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { useEffect, useState } from 'react'
import { queryNeighbourhoodStats } from '../utils/layers';

const useGetNeighbourhood = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedYear } = createLeftSideFilter();

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            let prevYear = selectedYear - 1;
            let whereCurr = { year: selectedYear, category: '' };
            let wherePrev = { year: prevYear, category: '' };

            let responseCurr = await queryNeighbourhoodStats(whereCurr);
            let responsePrev = await queryNeighbourhoodStats(wherePrev);

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

export default useGetNeighbourhood