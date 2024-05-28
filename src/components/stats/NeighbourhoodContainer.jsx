import useStatsNeighbourhood from "../../hooks/useStatsNeighbourhood";
import NeighbourhoodPanel from "./NeighbourhoodPanel";
import SkeletonNeigbourhoodPanel from "../../skeleton/SkeletonNeigbourhoodPanel";

const NeighbourhoodContainer = () => {

    const { data, loading } = useStatsNeighbourhood();

    return (
        <div className="shadow-md grid grid-cols-4 max-sm:grid-cols-2">
            {
                loading && <SkeletonNeigbourhoodPanel data={data} />
            }
            {
                !loading && <NeighbourhoodPanel data={data} />
            }
        </div>
    )
}

export default NeighbourhoodContainer