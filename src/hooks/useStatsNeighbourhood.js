import { useEffect, useState } from 'react'
import { queryNeighbourhoodStats } from '../utils/layers';
import { getMaxValue, getMinValue } from '../utils/formatters';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import useGetUniqueFieldValues from './useGetUniqueFieldValues';
import toast from 'react-hot-toast';

const useStatsNeighbourhood = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { selectedYear } = createLeftSideFilter();

    const categories = useGetUniqueFieldValues('MCI_CATEGORY');
    const neighbourhoods = useGetUniqueFieldValues('NEIGHBOURHOOD_158');

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                let statsData = [];
                for (let index = 0; index < categories.data.length; index++) {
                    const element = categories.data[index];
                    const where = {
                        year: selectedYear,
                        category: element.label
                    }
                    const response = await queryNeighbourhoodStats(where);
                    statsData.push({
                        name: element.label,
                        label: getMaxValue(response).label,
                        value: getMaxValue(response).value,
                        desc: `Highest ${element.label}`,
                        icon: 1
                    });
                    statsData.push({
                        name: element.label,
                        label: getMinValue(response).label,
                        value: getMinValue(response).value,
                        desc: `Lowest ${element.label}`,
                        icon: 0
                    });
                }

                statsData.push({
                    name: getMaxValue(neighbourhoods.data).label,
                    label: getMaxValue(neighbourhoods.data).label,
                    value: getMaxValue(neighbourhoods.data).value,
                    desc: `Highest Total Offences`,
                    icon: 1
                });

                statsData.push({
                    name: getMinValue(neighbourhoods.data).label,
                    label: getMinValue(neighbourhoods.data).label,
                    value: getMinValue(neighbourhoods.data).value,
                    desc: `Lowest Total Offences`,
                    icon: 0
                });

                setData(statsData);

            } catch (error) {
                toast.error(error.message, { position: "bottom-right" });
            } finally {
                setLoading(false);
            }
        }
        if (selectedYear !== '' && !categories.loading && !neighbourhoods.loading) {
            fetchData();
        }

    }, [selectedYear, categories.data, categories.loading, neighbourhoods.data, neighbourhoods.loading]);

    return { loading, data }
}

export default useStatsNeighbourhood