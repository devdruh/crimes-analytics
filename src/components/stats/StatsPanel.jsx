import getRandomStatsIcon from '../../utils/getRandomStatsIcon'
import useLeftSideFilter from '../../zustand/useLeftSideFilter';

// eslint-disable-next-line react/prop-types
const StatsPanel = ({ data, featureCount }) => {

    const { selectedCategory } = useLeftSideFilter();

    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                data && data.map((item, i) => (

                    <div className="stat" key={i}>
                        <div className="stat-figure text-primary">
                            {getRandomStatsIcon()}
                        </div>
                        <div className="stat-title">{item.value}</div>
                        {
                            selectedCategory !== '' && item.value === selectedCategory ? (
                                <>
                                    <div className="stat-value text-primary">{featureCount}</div>
                                    <div className="stat-desc">...% more than last month</div>
                                </>
                            ) : (
                                <>
                                    <div className="stat-value text-primary">{item.count}</div>
                                    <div className="stat-desc">{item.count === 0 ? 'No available data' : '...% more than last month'}</div>
                                </>
                            )
                        }

                        {/* <div className="stat-value text-primary">{selectedCategory !== '' && item.value === selectedCategory ? featureCount : item.count}</div> */}
                        {/* <div className="stat-desc">{item.count === 0 ? 'No available data' : '...% more than last month'}</div> */}
                    </div>
                ))
            }
        </>
    )
}

export default StatsPanel