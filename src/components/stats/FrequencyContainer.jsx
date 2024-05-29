import { useEffect, useState } from 'react';
import useStatsFrequency from '../../hooks/useStatsFrequency';
import SkeletonFrequencyPanel from '../../skeleton/SkeletonFrequencyPanel';
import FrequencyPanel from './FrequencyPanel'

// eslint-disable-next-line react/prop-types
const FrequencyContainer = () => {

    const { data, loading } = useStatsFrequency();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timeId = setTimeout(() => {
            setIsLoading(loading)
        }, 100);
        return () => clearTimeout(timeId);

    }, [data, loading])

    return (
        <div className="shadow-md grid grid-cols-4 max-sm:grid-cols-2">
            {
                isLoading && <SkeletonFrequencyPanel data={data} />
            }
            {
                !isLoading && data.length > 0 && <FrequencyPanel data={data} />
            }
        </div>
    )
}

export default FrequencyContainer