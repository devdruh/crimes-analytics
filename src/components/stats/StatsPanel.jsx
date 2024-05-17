import getRandomStatsIcon from '../../utils/getRandomStatsIcon'
import createLeftSideFilter from '../../zustand/createLeftSideFilter';

// eslint-disable-next-line react/prop-types
const StatsPanel = ({ data, featureCount }) => {

    const { selectedDay, selectedMonth } = createLeftSideFilter();

    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                data && data.length > 0 && data.map((item, i) => (

                    <div className="stat" key={i + 1}>
                        <div className="stat-figure text-primary">
                            {getRandomStatsIcon()}
                        </div>
                        <div className="stat-title text-base-content">{item.value}</div>
                        <div className="stat-value max-sm:font-medium max-md:text-xl text-primary">{item.count}</div>
                        <div className="stat-desc truncate">
                            {
                                item.count === 0 ? 'No available data' :
                                    <p className='truncate'> {Math.abs(((item.count - item.prevCount) / (item.prevCount)) * 100).toFixed(2).replace(/\.0+$/, '')}%
                                        {
                                            Math.sign(((item.count - item.prevCount) / (item.prevCount)) * 100).toFixed(2) > 0 ? ' more than ' :
                                                Math.sign(((item.count - item.prevCount) / (item.prevCount)) * 100).toFixed(2) === '0.00' ? ' same as ' : ' less than '
                                        }
                                        {
                                            selectedDay !== '' ? 'yesterday' : selectedMonth !== '' ? 'last month' : 'last year'
                                        }
                                    </p>
                            }
                        </div>
                    </div>
                ))
            }

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-16 max-sm:w-12 rounded-full">
                            <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                            >
                                <path d="M144.4 208c0-17.7 14.3-32 32-32 17.6 0 32 14.3 32 32s-14.4 32-32 32c-17.7 0-32-14.3-32-32zm224 0c0 17.7-14.4 32-32 32-17.7 0-32-14.3-32-32s14.3-32 32-32c17.6 0 32 14.3 32 32zM328 328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h144zm184-72c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zM256 464c114.9 0 208-93.1 208-208S370.9 48 256 48 48 141.1 48 256s93.1 208 208 208z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="stat-value text-secondary max-sm:font-medium max-md:text-xl">{featureCount}</div>
                <div className="stat-title text-base-content">Total</div>
                <div className="stat-desc text-secondary">Face Neutral</div>
            </div>
        </>
    )
}

export default StatsPanel