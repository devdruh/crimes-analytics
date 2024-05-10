
// eslint-disable-next-line react/prop-types
const SkeletonFrequencyPanel = ({ data }) => {

    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                data && data.map((item) => (
                    <div className="stat" key={item.value}>
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="skeleton w-16 h-16 max-sm:w-12 max-sm:h-12 rounded-full"></div>
                            </div>
                        </div>
                        <div className="stat-title"><div className="skeleton h-3 w-1/3 mt-2 max-md:h-4 max-md:mt-1"></div></div>
                        <div className="stat-value"><div className="skeleton h-8 w-1/2 mt-2 max-md:h-5"></div></div>
                        <div className="stat-desc"><div className="skeleton h-2 w-5/6 mt-2 mb-1"></div></div>
                    </div>
                ))
            }

            {
                // eslint-disable-next-line react/prop-types
                data.length === 0 && [...Array(5)].map((_, index) => (

                    <div className="stat" key={index}>
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="skeleton w-16 h-16 max-sm:w-12 max-sm:h-12 rounded-full"></div>
                            </div>
                        </div>
                        <div className="stat-title"><div className="skeleton h-3 w-1/3 mt-2 max-md:h-4 max-md:mt-1"></div></div>
                        <div className="stat-value"><div className="skeleton h-8 w-1/2 mt-2 max-md:h-5"></div></div>
                        <div className="stat-desc"><div className="skeleton h-2 w-5/6 mt-2 mb-1"></div></div>
                    </div>
                ))
            }
        </>
    )
}

export default SkeletonFrequencyPanel