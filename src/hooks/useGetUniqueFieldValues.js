import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import uniqueValues from '@arcgis/core/smartMapping/statistics/uniqueValues';
import { useEffect, useState } from 'react'
import { API_MCI_ENDPOINT } from '../utils/constants';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import toast from 'react-hot-toast';

const useGetUniqueFieldValues = (field) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { selectedYear } = createLeftSideFilter();

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const controller = new AbortController();
                const signal = controller.signal;
                const layer = new FeatureLayer({ url: API_MCI_ENDPOINT, outFields: "*", });
                const sqlQuery = `OCC_YEAR = '${selectedYear}'`;
                const response = await uniqueValues({ layer: layer, field: field, sqlWhere: sqlQuery, signal: signal });

                if (response.error) {
                    throw new Error(response.error);
                }

                const result = response.uniqueValueInfos;

                let items = [];
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    items.push({
                        label: element.value,
                        value: element.count
                    });
                }

                setData(items);

            } catch (error) {
                toast.error(error.message, { position: "bottom-right" });
            } finally {
                setLoading(false);
            }
        }

        if (selectedYear !== '') {
            fetchData();
        }

    }, [selectedYear, field]);

    return { data, loading }
}

export default useGetUniqueFieldValues