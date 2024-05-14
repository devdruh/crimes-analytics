/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import FrequencyHighCharts from '../chart/FrequencyHighCharts'
import createSelectedFrequency from '../../zustand/createSelectedFrequency';
import useGetFrequency from '../../hooks/useGetFrequency';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import expandFrequencyChart from './ExpandFrequencyChart';

const FrequencyChart = ({ id }) => {

    const { selectedFrequency } = createSelectedFrequency();
    const { selectedYear } = createLeftSideFilter();
    const { data } = useGetFrequency();

    useEffect(() => {

        if (data.length > 0) {
            // expandFrequencyChart.iconNumber = 1;
            expandFrequencyChart.expanded = true;
        }

    }, [selectedFrequency, selectedYear, data]);

    return (
        <div id={id} className="bg-base-100">
            {selectedYear !== '' && selectedFrequency !== '' && data.length > 0 && <FrequencyHighCharts items={data} />}
        </div>
    )
}

export default FrequencyChart