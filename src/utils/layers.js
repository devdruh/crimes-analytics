import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { API_MCI_ENDPOINT } from './constants';
import { formatHour12 } from './formatters';

export const layerMajorCrimeIndicators = new FeatureLayer({
    id: 'major-crime-indicators',
    url: API_MCI_ENDPOINT,
    outFields: "*",
    effect: "bloom(2 0 0.5)"
});

export const layerMCIRenderer = (value, selectedDay, selectedMonth) => {

    const opacityStops = [
        {
            opacity: 1,
            value: value
        },
        {
            opacity: 0,
            value: value + 1
        }
    ];

    const dateNow = new Date();
    dateNow.setHours(Math.floor(value), 0, 0, 0);

    const dateNowIn = new Date();
    dateNowIn.setHours(Math.floor(value) - 2, 0, 0, 0);

    const dateNowBefore = new Date();
    dateNowBefore.setHours(Math.floor(value) - 3, 0, 0, 0);

    return {
        type: "simple",
        symbol: {
            type: "simple-marker",
            // color: "rgb(0, 0, 0)",
            outline: null,
            size: 6
        },
        visualVariables: [
            {
                type: "opacity",
                field: selectedMonth !== '' && selectedDay === '' ? "OCC_DAY" : "OCC_HOUR",
                stops: opacityStops,
                legendOptions: {
                    showLegend: false
                }
            },
            {
                type: "color",
                field: selectedMonth !== '' && selectedDay === '' ? "OCC_DAY" : "OCC_HOUR",
                legendOptions: {
                    title: "Crime "
                },
                stops: [
                    {
                        value: value,
                        color: "#0ff",
                        label: selectedMonth !== '' && selectedDay === '' ? 'on day ' + (Math.floor(value)) : 'at ' + formatHour12(dateNow)
                    },
                    {
                        value: value - 1,
                        color: "#f0f",
                        label: selectedMonth !== '' && selectedDay === '' ? 'on day ' + (Math.floor(value) - 2) : 'at ' + formatHour12(dateNowIn)
                    },
                    {
                        value: value - 3,
                        color: "#404",
                        label: selectedMonth !== '' && selectedDay === '' ? 'before day ' + (Math.floor(value) - 3) : 'before ' + formatHour12(dateNowBefore)
                    }
                ]
            }
        ]
    };
}
