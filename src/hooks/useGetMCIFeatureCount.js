import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import useLeftSideFilter from '../zustand/useLeftSideFilter';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const useGetMCIFeatureCount = (url) => {

    const [featureCount, setFeatureCount] = useState([]);
    const [loading, setLoading] = useState(false)

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedCategory,
    } = useLeftSideFilter();

    let sqlQuery = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? sqlQuery += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? sqlQuery += ` AND OCC_DAY = '${selectedDay}'` : '';
    selectedCategory !== '' ? sqlQuery += ` AND MCI_CATEGORY = '${selectedCategory}'` : '';

    useEffect(() => {

        const layer = new FeatureLayer({
            url: url,
            outFields: "*",
        });

        const getFeatureCount = async () => {

            try {
                setLoading(true);
                const response = await layer.queryFeatureCount({ where: sqlQuery })
                setFeatureCount(response);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getFeatureCount();

    }, [url, sqlQuery]);

    return { loading, featureCount }
}

export default useGetMCIFeatureCount