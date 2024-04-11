import { useEffect, useState } from 'react'
import getLayerUrl from '../../utils/getLayerUrl';
import useGetMCIFeatureCount from '../../hooks/useGetMCIFeatureCount';
import StatsPanel from './StatsPanel';
import useLeftSideFilter from '../../zustand/useLeftSideFilter';
import { useShallow } from 'zustand/react/shallow'
import useGetAttributeUniqueValues from '../../hooks/useGetAttributeUniqueValues';

const StatsContainer = () => {

    const { mci } = getLayerUrl();
    const { attributeValues, prevAttributeValues } = useGetAttributeUniqueValues('MCI_CATEGORY', mci);
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
                    data.length !== 0 && data.length > 0 && (<StatsPanel data={data} featureCount={featureCount} />)
                }

                {
                    // !loading && attributeValues && attributeValues.map((category, i) => (

                    //     <div className="stat" key={i}>
                    //         <div className="stat-figure text-primary">
                    //             {getRandomStatsIcon()}
                    //         </div>
                    //         <div className="stat-title">{category.value}</div>
                    //         <div className="stat-value text-primary">{category.count}</div>
                    //         <div className="stat-desc">21% more than last month</div>
                    //     </div>
                    // ))
                }

                {/* <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <svg
                                    viewBox="0 0 512 512"
                                    fill="currentColor"
                                >
                                    <path d="M144.4 208c0-17.7 14.3-32 32-32 17.6 0 32 14.3 32 32s-14.4 32-32 32c-17.7 0-32-14.3-32-32zm224 0c0 17.7-14.4 32-32 32-17.7 0-32-14.3-32-32s14.3-32 32-32c17.6 0 32 14.3 32 32zM328 328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h144zm184-72c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zM256 464c114.9 0 208-93.1 208-208S370.9 48 256 48 48 141.1 48 256s93.1 208 208 208z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">{featureCount}</div>
                    <div className="stat-title">Total</div>
                    <div className="stat-desc text-secondary">Face Neutral</div>
                </div> */}

            </div>
        </>
    )
}

export default StatsContainer