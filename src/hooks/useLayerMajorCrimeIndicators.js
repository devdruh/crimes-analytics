import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import useLeftSideFilter from '../zustand/useLeftSideFilter';

const useLayerMajorCrimeIndicators = () => {

    const { selectedYear, selectedMonth, selectedDay, selectedCategory } = useLeftSideFilter();

    let definitionExpression = `OCC_YEAR='${selectedYear}'`;
    selectedMonth !== '' ? definitionExpression += ` AND OCC_MONTH = '${selectedMonth}'` : '';
    selectedDay !== '' ? definitionExpression += ` AND OCC_DAY = '${selectedDay}'` : '';
    selectedCategory !== '' ? definitionExpression += ` AND MCI_CATEGORY = '${selectedCategory}'` : '';

    const layerMajorCrimeIndicators = new FeatureLayer({
        url: "https://services.arcgis.com/S9th0jAJ7bqgIRjw/ArcGIS/rest/services/Major_Crime_Indicators_Open_Data/FeatureServer/0",
        definitionExpression: definitionExpression,
        // definitionExpression: `OCC_YEAR='2014' AND OCC_MONTH='January'`,
        outFields: "*"
    });

    return { layerMajorCrimeIndicators };
}

export default useLayerMajorCrimeIndicators
