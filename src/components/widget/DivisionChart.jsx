/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect } from 'react';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import createActiveTab from '../../zustand/createActiveTab';
import LoadingSpinner from '../loading/LoadingSpinner';
import expandDivisionChart from './ExpandDivisionChart';
import useGetDivision from '../../hooks/useGetDivision';
const DivisionHighCharts = lazy(() => import('../chart/DivisionHighCharts'));

const DivisionChart = ({ id }) => {

    const { selectedYear } = createLeftSideFilter();
    const { data, loading } = useGetDivision();
    const { activeTab } = createActiveTab();

    useEffect(() => {
        if (activeTab === 2 && data.length > 0 && !loading) {
            expandDivisionChart.expanded = true;
        }
    }, [data, activeTab, loading]);

    return (
        <div id={id} className="bg-base-100 md:min-w-[620px]">
            {selectedYear !== '' && !loading && data.length > 0 && activeTab === 2 &&
                <Suspense fallback={<LoadingSpinner />}>
                    <DivisionHighCharts items={data} />
                </Suspense>
            }
        </div>
    )
}

export default DivisionChart