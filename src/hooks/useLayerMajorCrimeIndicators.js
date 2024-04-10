import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import getLayerUrl from '../utils/getLayerUrl';

const useLayerMajorCrimeIndicators = () => {

    const { mci } = getLayerUrl();

    const layerMajorCrimeIndicators = new FeatureLayer({
        id: 'major-crime-indicators',
        url: mci,
        // definitionExpression: `OCC_YEAR='2024' AND OCC_MONTH = 'January' AND OCC_DAY = '1'`,
        outFields: "*"
    });

    return { layerMajorCrimeIndicators };
}

export default useLayerMajorCrimeIndicators
