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
    const { loading, attributeValues, zeroAttributeValues } = useGetAttributeUniqueValues('MCI_CATEGORY', mci);
    const { featureCount } = useGetMCIFeatureCount(mci)
    const { selectedCategories } = useLeftSideFilter(useShallow((state) => ({ selectedCategories: state.selectedCategories })));
    const [data, setData] = useState([]);

    useEffect(() => {

        if (selectedCategories.length > 0) {
            for (let index = 0; index < zeroAttributeValues.length; index++) {
                const element = zeroAttributeValues[index];
                const selectedCategory = selectedCategories.find(item => item.value === element.value);

                if (selectedCategory !== undefined) {
                    const findSelectedCategory = attributeValues.find(item => item.value === selectedCategory.value);
                    zeroAttributeValues[index].count = findSelectedCategory.count;
                }

            }
            setData(zeroAttributeValues);
        } else {
            setData(attributeValues);
        }

    }, [attributeValues, zeroAttributeValues, selectedCategories]);

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