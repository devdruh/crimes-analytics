import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { formatCategoryQuery } from '../utils/formatters';

const useGetMCIFeatureCount = (url) => {

    const [featureCount, setFeatureCount] = useState([]);
    const [loading, setLoading] = useState(false)

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedCategories,
    } = createLeftSideFilter();

    let sqlQuery = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? sqlQuery += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? sqlQuery += ` AND OCC_DAY = '${selectedDay}'` : '';

    if (selectedCategories.length > 0) {
        const formattedCategory = formatCategoryQuery(selectedCategories);
        sqlQuery += formattedCategory;
    }

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

        if (selectedYear !== '') {
            getFeatureCount();
        }

    }, [url, sqlQuery, selectedYear]);

    return { loading, featureCount }
}

export default useGetMCIFeatureCount