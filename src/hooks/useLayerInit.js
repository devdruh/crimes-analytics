import { useEffect } from 'react'
import useLayerMajorCrimeIndicators from './useLayerMajorCrimeIndicators';
import map from '../components/map/Map';
import useLeftSideFilter from '../zustand/useLeftSideFilter';
import { useShallow } from 'zustand/react/shallow'
import formatCategoryQuery from '../utils/formatCategoryQuery';

const useLayerInit = () => {

    const { layerMajorCrimeIndicators } = useLayerMajorCrimeIndicators();

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedCategories,
    } = useLeftSideFilter(useShallow((state) => ({
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
        selectedCategories: state.selectedCategories,
    })));

    let sqlQuery = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? sqlQuery += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? sqlQuery += ` AND OCC_DAY = '${selectedDay}'` : '';

    if (selectedCategories.length > 0) {
        const formattedCategory = formatCategoryQuery(selectedCategories);
        sqlQuery += formattedCategory;
    }

    useEffect(() => {

        layerMajorCrimeIndicators.definitionExpression = sqlQuery;

        map.layers.removeAll();
        map.layers.add(layerMajorCrimeIndicators);

    }, [layerMajorCrimeIndicators, sqlQuery])

    return () => { layerMajorCrimeIndicators }
}

export default useLayerInit