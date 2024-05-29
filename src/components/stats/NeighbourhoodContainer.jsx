import useStatsNeighbourhood from "../../hooks/useStatsNeighbourhood";
import NeighbourhoodPanel from "./NeighbourhoodPanel";
import SkeletonNeigbourhoodPanel from "../../skeleton/SkeletonNeigbourhoodPanel";
import { useEffect, useState } from "react";

const NeighbourhoodContainer = () => {

    const { data, loading } = useStatsNeighbourhood();
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
                isLoading && <SkeletonNeigbourhoodPanel data={data} />
            }
            {
                !isLoading && data.length > 0 && <NeighbourhoodPanel data={data} />
            }
        </div>
    )
}

export default NeighbourhoodContainer