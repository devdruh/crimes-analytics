import { useEffect, useState } from 'react'
import getLayerUrl from '../../utils/getLayerUrl';
import useGetMCIFeatureCount from '../../hooks/useGetMCIFeatureCount';
import StatsPanel from './StatsPanel';
import useLeftSideFilter from '../../zustand/useLeftSideFilter';
import { useShallow } from 'zustand/react/shallow'
import useGetAttributeUniqueValues from '../../hooks/useGetAttributeUniqueValues';
import SkeletonStatsPanel from '../../skeleton/SkeletonStatsPanel';

const StatsContainer = () => {

    const { mci } = getLayerUrl();
    const { loading, attributeValues, prevAttributeValues } = useGetAttributeUniqueValues('MCI_CATEGORY', mci);
    const { featureCount } = useGetMCIFeatureCount(mci)
    const { selectedCategory } = useLeftSideFilter(useShallow((state) => ({ selectedCategory: state.selectedCategory })));
    const [data, setData] = useState([]);

    useEffect(() => {

        if (attributeValues.length > 0) {
            if (selectedCategory !== '') {
                setData(prevAttributeValues);
            } else {
                setData(attributeValues);
            }
        } else {
            setData(prevAttributeValues);
        }

    }, [attributeValues, prevAttributeValues, selectedCategory]);

    return (
        <>
            <div className="shadow max-[1800px]:grid max-md:grid-cols-2 max-2xl:grid-cols-3 max-[1800px]:grid-cols-3 min-[1800px]:stats min-[1800px]:flex min-[1800px]:justify-between">

                {
                    !loading && data.length !== 0 && data.length > 0 && (<StatsPanel data={data} featureCount={featureCount} />) 
                }
                {
                    loading && data.length !== 0 && data.length > 0 && (<SkeletonStatsPanel data={data} />)
                }

            </div>
        </>
    )
}

export default StatsContainer