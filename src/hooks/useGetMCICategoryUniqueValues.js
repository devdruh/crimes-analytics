import { useEffect, useState } from 'react'
import useLayerMajorCrimeIndicators from './useLayerMajorCrimeIndicators'
import uniqueValues from "@arcgis/core/smartMapping/statistics/uniqueValues.js";
import toast from 'react-hot-toast';

const useGetMCICategoryUniqueValues = () => {

    const { layerMajorCrimeIndicators } = useLayerMajorCrimeIndicators();
    const [uniqueMCICategory, setUniqueMCICategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getMCIUniqueValues = async () => {
            setLoading(true);
            try {
                await uniqueValues({ layer: layerMajorCrimeIndicators, field: 'MCI_CATEGORY' })
                    .then(response => {
                        // if (response.error) throw new Error(response.error);
                        setUniqueMCICategory(response?.uniqueValueInfos);
                    });
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getMCIUniqueValues();

        return () => setUniqueMCICategory([]);

    }, []);

    return { loading, uniqueMCICategory }
}

export default useGetMCICategoryUniqueValues