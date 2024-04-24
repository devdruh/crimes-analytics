import { useEffect } from 'react'
import map from '../components/map/Map';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { useShallow } from 'zustand/react/shallow'
import formatCategoryQuery from '../utils/formatCategoryQuery';
import { layerMajorCrimeIndicators } from '../utils/layers';

const useLayerInit = () => {

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedCategories,
    } = createLeftSideFilter(useShallow((state) => ({
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

    }, [sqlQuery])

    // return () => { layerMajorCrimeIndicators }
}

export default useLayerInit