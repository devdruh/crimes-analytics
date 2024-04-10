import { useEffect, useState } from 'react';
import uniqueValues from '@arcgis/core/smartMapping/statistics/uniqueValues';
import useLeftSideFilter from '../zustand/useLeftSideFilter';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import toast from 'react-hot-toast';

const useGetAttributeUniqueValues = (field, url) => {

    const [attributeValues, setAttributeValues] = useState([]);
    const [loading, setLoading] = useState(false)

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
    } = useLeftSideFilter();

    let sqlQuery = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? sqlQuery += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? sqlQuery += ` AND OCC_DAY = '${selectedDay}'` : '';

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        const layer = new FeatureLayer({
            url: url,
            outFields: "*",
        });

        const findValues = async () => {

            try {
                setLoading(true);
                const response = await uniqueValues({ layer: layer, field: field, sqlWhere: sqlQuery, signal: signal })

                if (response.error) {
                    // console.log("Error: " + response.error);
                    throw new Error(result.error)
                }

                const result = response.uniqueValueInfos;
                if (result) {
                    var formatted = [];
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        formatted.push({
                            label: element.value,
                            value: element.value,
                            count: element.count
                        })
                    }
                    setAttributeValues(formatted);
                }

                if (result.length === 0) {

                    toast.success('No available data.', {
                        id: 'no-available-data',
                        position: "bottom-right"
                    });
                    controller.abort();

                }

            } catch (error) {
                toast.error(error, {
                    position: "bottom-right"
                });
            } finally {
                setLoading(false);
            }

            return () => controller.abort()
        }

        findValues();

    }, [sqlQuery, field, url]);

    return { attributeValues, loading }
}

export default useGetAttributeUniqueValues