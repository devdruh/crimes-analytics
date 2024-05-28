/* eslint-disable react/prop-types */

import { getIconSort } from "../../utils/icons"

const NeighbourhoodPanel = ({ data }) => {
    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                data.map((item, i) => (
                    <div className={`stat border-r border-l-0 last:border-r-0 
                    ${i === 10 ? 'max-sm:order-1' :
                            i === 11 ? 'max-md:order-2' :
                                i === 0 ? 'max-lg:order-3' :
                                    i === 1 ? 'max-lg:order-4' :
                                        i === 2 ? 'max-lg:order-5' :
                                            i === 3 ? 'max-lg:order-6' :
                                                i === 4 ? 'max-lg:order-7' :
                                                    i === 5 ? 'max-lg:order-8' :
                                                        i === 6 ? 'max-lg:order-9' :
                                                            i === 7 ? 'max-lg:order-10' :
                                                                i === 8 ? 'max-lg:order-11' :
                                                                    i === 9 ? 'max-lg:order-12' :
                                                                        ''}  }`} key={i + 1}>
                        <div className="stat-figure text-primary"> {getIconSort(item.icon)} </div>
                        <div className="stat-title text-base-content"> {item.label} </div>
                        <div className="stat-value max-sm:font-medium max-md:text-xl text-primary"> {item.value} </div>
                        <div className="stat-desc truncate">
                            {
                                item.value === 0 ? 'No available data' :
                                    <p className="truncate ...">
                                        {item.desc}
                                    </p>
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default NeighbourhoodPanel