import { useEffect, useState } from 'react';
import useStatsFrequency from '../../hooks/useStatsFrequency';
import SkeletonFrequencyPanel from '../../skeleton/SkeletonFrequencyPanel';
import FrequencyPanel from './FrequencyPanel'

const FrequencyContainer = () => {

    const { data, loading } = useStatsFrequency();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timeId = setTimeout(() => {
            setIsLoading(loading)
        }, 100);
        return () => clearTimeout(timeId);

    }, [loading]);

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