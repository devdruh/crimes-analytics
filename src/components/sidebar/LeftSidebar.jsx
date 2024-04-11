import { useEffect, useState } from "react";
import LeftSideFilters from "./LeftSideFilters"
import LoadingSpinner from "../loading/LoadingSpinner";

const LeftSidebar = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);

    }, [setIsLoading]);

    return (
        <>
            <p className="font-semibold text-center pt-3">Filters</p>
            <div className="divider mt-0 mb-0" />
            <div className="px-2">
                {
                    isLoading ? <LoadingSpinner /> : <LeftSideFilters />
                }
            </div>
            <div className="divider mt-7" />
        </>
    )
}

export default LeftSidebar