/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect } from 'react';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import useGetNeighbourhood from '../../hooks/useGetNeighbourhood';
import expandNeighbourhoodChart from './ExpandNeighbourhoodChart';
import createActiveTab from '../../zustand/createActiveTab';
import LoadingSpinner from '../loading/LoadingSpinner';
const NeighbourhoodHighCharts = lazy(() => import('../chart/NeighbourhoodHighCharts'));

const NeighbourhoodChart = ({ id }) => {

    const { selectedYear } = createLeftSideFilter();
    const { data, loading } = useGetNeighbourhood();
    const { activeTab } = createActiveTab();

    useEffect(() => {
        if (activeTab === 4 && data.length > 0 && !loading) {
            expandNeighbourhoodChart.expanded = true;
        }
    }, [data, activeTab, loading]);

    return (
        <div id={id} className="bg-base-100 md:min-w-[620px]">
            {selectedYear !== '' && !loading && data.length > 0 && activeTab === 4 &&
                <Suspense fallback={<LoadingSpinner />}>
                    <NeighbourhoodHighCharts items={data} />
                </Suspense>
            }
        </div>
    )
}

export default NeighbourhoodChart