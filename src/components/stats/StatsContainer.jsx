import { useEffect } from 'react'
import getRandomStatsIcon from '../../utils/getRandomStatsIcon';

import useGetAttributeUniqueValues from '../../hooks/useGetAttributeUniqueValues';
import getLayerUrl from '../../utils/getLayerUrl';

const StatsContainer = () => {

    const { mci } = getLayerUrl();
    const { loading, attributeValues } = useGetAttributeUniqueValues('MCI_CATEGORY', mci);

    useEffect(() => {

    }, [attributeValues]);

    return (
        <>
            <div className="stats shadow">

                {
                    !loading && attributeValues && attributeValues.map((category, i) => (

                        <div className="stat" key={i}>
                            <div className="stat-figure text-primary">
                                {getRandomStatsIcon()}
                            </div>
                            <div className="stat-title">{category.value}</div>
                            <div className="stat-value text-primary">{category.count}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default StatsContainer