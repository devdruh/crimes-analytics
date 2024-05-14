/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import FrequencyHighCharts from '../chart/FrequencyHighCharts'
import createSelectedFrequency from '../../zustand/createSelectedFrequency';
import useGetFrequency from '../../hooks/useGetFrequency';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';

const FrequencyChart = ({ id }) => {

    const { selectedFrequency } = createSelectedFrequency();
    const { selectedYear } = createLeftSideFilter();
    const { data } = useGetFrequency();

    useEffect(() => {

    }, [selectedFrequency, selectedYear, data]);

    return (
        <div id={id} className="bg-base-100">
            {selectedYear !== '' && selectedFrequency !== '' && data.length > 0 && <FrequencyHighCharts items={data} />}
        </div>
    )
}

export default FrequencyChart