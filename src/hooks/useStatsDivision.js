import { useEffect, useState } from 'react'
import { queryDivisionStats } from '../utils/layers';
import { getMaxValue, getMinValue } from '../utils/formatters';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import useGetUniqueFieldValues from './useGetUniqueFieldValues';
import toast from 'react-hot-toast';

const useStatsDivision = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { selectedYear } = createLeftSideFilter();

    const categories = useGetUniqueFieldValues('MCI_CATEGORY');
    const divisions = useGetUniqueFieldValues('DIVISION');

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
                    const response = await queryDivisionStats(where);
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
                    name: getMaxValue(divisions.data).label,
                    label: getMaxValue(divisions.data).label,
                    value: getMaxValue(divisions.data).value,
                    desc: `Highest Total Offences`,
                    icon: 1
                });

                statsData.push({
                    name: getMinValue(divisions.data).label,
                    label: getMinValue(divisions.data).label,
                    value: getMinValue(divisions.data).value,
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
        if (selectedYear !== '' && !categories.loading && !divisions.loading) {
            fetchData();
        }

    }, [selectedYear, categories.data, categories.loading, divisions.data, divisions.loading]);

    return { loading, data }
}

export default useStatsDivision