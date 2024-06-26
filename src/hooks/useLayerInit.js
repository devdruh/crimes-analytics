import { useEffect } from 'react'
import map from '../components/map/Map';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { useShallow } from 'zustand/react/shallow';
import { layerMajorCrimeIndicators, layerPopupTemplate } from '../utils/layers';
import { formatCategoryQuery } from '../utils/formatters';
import createActiveTab from '../zustand/createActiveTab';

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

    const { activeTab } = createActiveTab(useShallow((state) => ({ activeTab: state.activeTab })));

    let sqlQuery = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? sqlQuery += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? sqlQuery += ` AND OCC_DAY = '${selectedDay}'` : '';

    if (selectedCategories.length > 0) {
        const formattedCategory = formatCategoryQuery(selectedCategories);
        sqlQuery += formattedCategory;
    }

    if (activeTab === 2 || activeTab === 3 || activeTab === 4) {
        sqlQuery = `OCC_YEAR='${selectedYear}'`;
    }

    useEffect(() => {

        layerMajorCrimeIndicators.definitionExpression = sqlQuery;
        layerMajorCrimeIndicators.popupTemplate = layerPopupTemplate;

        map.layers.removeAll();
        map.layers.add(layerMajorCrimeIndicators);

    }, [sqlQuery])

}

export default useLayerInit