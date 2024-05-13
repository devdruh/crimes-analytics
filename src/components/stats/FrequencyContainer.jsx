import useStatsFrequency from '../../hooks/useStatsFrequency';
import SkeletonFrequencyPanel from '../../skeleton/SkeletonFrequencyPanel';
import FrequencyPanel from './FrequencyPanel'

// eslint-disable-next-line react/prop-types
const FrequencyContainer = () => {

    const { data, loading } = useStatsFrequency();

    return (
        <div className="shadow-md grid grid-cols-4 max-sm:grid-cols-2">
            {
                loading && <SkeletonFrequencyPanel data={data} />
            }
            {
                !loading && <FrequencyPanel data={data} />
            }
        </div>
    )
}

export default FrequencyContainer