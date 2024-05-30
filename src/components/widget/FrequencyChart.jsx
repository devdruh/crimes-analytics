/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect } from 'react'
import createSelectedFrequency from '../../zustand/createSelectedFrequency';
import useGetFrequency from '../../hooks/useGetFrequency';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import expandFrequencyChart from './ExpandFrequencyChart';
import createActiveTab from '../../zustand/createActiveTab';
import LoadingSpinner from '../loading/LoadingSpinner';
const FrequencyHighCharts = lazy(() => import('../chart/FrequencyHighCharts'));

const FrequencyChart = ({ id }) => {

    const { selectedFrequency } = createSelectedFrequency();
    const { selectedYear } = createLeftSideFilter();
    const { data } = useGetFrequency();
    const { activeTab } = createActiveTab();

    useEffect(() => {
        if (data.length > 0) {
            // expandFrequencyChart.iconNumber = 1;
            expandFrequencyChart.expanded = true;
        }
    }, [selectedFrequency, selectedYear, data]);

    return (
        <div id={id} className="bg-base-100 md:min-w-[600px]">
            {selectedYear !== '' && selectedFrequency !== '' && data.length > 0 && activeTab === 3 &&
                <Suspense fallback={<LoadingSpinner />}>
                    <FrequencyHighCharts items={data} />
                </Suspense>}
        </div>
    )
}

export default FrequencyChart