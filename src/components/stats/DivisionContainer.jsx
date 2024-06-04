import { useEffect, useState } from 'react'
import SkeletonDivisionPanel from '../../skeleton/SkeletonDivisionPanel';
import DivisionPanel from './DivisionPanel';
import useStatsDivision from '../../hooks/useStatsDivision';

const DivisionContainer = () => {

    const { data, loading } = useStatsDivision();
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
                isLoading && <SkeletonDivisionPanel data={data} />
            }
            {
                !isLoading && data.length > 0 && <DivisionPanel data={data} />
            }
        </div>
    )
}

export default DivisionContainer