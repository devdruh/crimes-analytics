import { useEffect } from 'react'
import useLayerMajorCrimeIndicators from './useLayerMajorCrimeIndicators';
import map from '../components/map/Map';
import useLeftSideFilter from '../zustand/useLeftSideFilter';
import { useShallow } from 'zustand/react/shallow'

const useLayerMemo = () => {

    const { layerMajorCrimeIndicators } = useLayerMajorCrimeIndicators();

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedCategory,
    } = useLeftSideFilter(useShallow((state) => ({
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
        selectedCategory: state.selectedCategory,
    })));

    let sqlQuery = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? sqlQuery += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? sqlQuery += ` AND OCC_DAY = '${selectedDay}'` : '';
    selectedCategory !== '' ? sqlQuery += ` AND MCI_CATEGORY = '${selectedCategory}'` : '';

    useEffect(() => {

        layerMajorCrimeIndicators.definitionExpression = sqlQuery;

        map.layers.removeAll();
        map.layers.add(layerMajorCrimeIndicators);


    }, [layerMajorCrimeIndicators, sqlQuery])

    return () => { layerMajorCrimeIndicators }
}

export default useLayerMemo