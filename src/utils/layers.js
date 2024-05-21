import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { API_MCI_ENDPOINT, API_YTD_CRIME_WM, MONTHS_OF_THE_YEAR } from './constants';
import { convertTo12Hour, formatCategoryQuery, formatDaysOrder, formatHour12, formatMonthToNumber } from './formatters';

export const layerMajorCrimeIndicators = new FeatureLayer({
    id: 'major-crime-indicators',
    url: API_MCI_ENDPOINT,
    outFields: "*",
    effect: "bloom(2 0 0.5)",
});

export const layerMajorCrimeYTD = new FeatureLayer({
    id: 'major-crime-ytd',
    url: API_YTD_CRIME_WM,
    outFields: "*",
});

export const layerStatsQuery = async (where, groupStats) => {
    let query = layerMajorCrimeIndicators.createQuery();
    query.where = where;
    query.outStatistics = [
        {
            statisticType: "count",
            onStatisticField: "*",
            outStatisticFieldName: "count"
        }
    ];
    query.groupByFieldsForStatistics = [groupStats];
    query.orderByFields = [groupStats];

    let result = await layerMajorCrimeIndicators.queryFeatures(query);

    return result;
}

export const queryMonthsStats = async (where) => {

    const response = await layerStatsQuery(where, ['OCC_MONTH']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.OCC_MONTH,
            value: element.attributes.count
        });
    }

    MONTHS_OF_THE_YEAR.forEach((month) => {
        const monthExist = data.find((i) => i.label === month);

        if (!monthExist) {
            data.push({
                label: month,
                value: null
            });
        }
    });

    return data.sort((a, b) => formatMonthToNumber(a.label) - formatMonthToNumber(b.label));
}

export const queryWeeksStats = async (where) => {

    const response = await layerStatsQuery(where, ['OCC_DOW']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.OCC_DOW.replace(/\s/g, ''),
            value: element.attributes.count
        });
    }

    return formatDaysOrder(data);

}

export const queryDaysStats = async (where) => {

    const response = await layerStatsQuery(where, ['OCC_DAY']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.OCC_DAY,
            value: element.attributes.count
        });
    }

    return data;

}

export const queryHoursStats = async (where) => {

    const response = await layerStatsQuery(where, ['OCC_HOUR']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            text: convertTo12Hour(element.attributes.OCC_HOUR),
            label: element.attributes.OCC_HOUR,
            value: element.attributes.count
        });
    }

    return data;

}

export const queryDrillDownMonthData = async (event) => {
    const where = `OCC_YEAR = '${event.point.id.substring(event.point.id.length - 4)}' AND OCC_MONTH = '${event.point.name}'`;
    const response = await queryDaysStats(where);

    return response;
}

export const queryDrillDownWeekData = async (event) => {
    const where = `OCC_YEAR = '${event.point.id.substring(event.point.id.length - 4)}' AND OCC_DOW = '${event.point.name}'`;
    const response = await queryHoursStats(where);

    return response;
}

export const queryDrillDownDayData = async (event) => {
    const where = `OCC_YEAR = '${event.point.id.substring(event.point.id.length - 4)}' AND OCC_DAY = '${event.point.name}'`;
    const response = await queryHoursStats(where);

    return response;
}

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

export const queryByTab = (params) => {

    let sqlQuery;

    if (params.tab === 1) {
        sqlQuery = `OCC_YEAR='${params.year}'`;
        params.month !== '' ? sqlQuery += ` AND OCC_MONTH = '${params.month}'` : '';
        params.day !== '' ? sqlQuery += ` AND OCC_DAY = '${params.day}'` : '';

        if (params.categories.length > 0) {
            const formattedCategory = formatCategoryQuery(params.categories);
            sqlQuery += formattedCategory;
        }

    } else if (params.tab === 2) {
        sqlQuery = `OCC_YEAR = '${params.year}'`
    } else if (params.tab === 3) {
        sqlQuery = `OCC_YEAR = '${params.year}'`
    }

    layerMajorCrimeIndicators.definitionExpression = sqlQuery;

}

export const queryByFreq = (params) => {

    let sqlQuery;

    if (!params.isUndefined) {
        if (params.frequency === 1) {
            sqlQuery = `OCC_YEAR = '${params.year}' AND OCC_DAY = '${params.name}'`;
        } else if (params.frequency === 2) {
            sqlQuery = `OCC_YEAR = '${params.year}' AND OCC_DOW = '${params.name}'`;
        } else if (params.frequency === 3) {
            sqlQuery = `OCC_YEAR = '${params.year}' AND OCC_MONTH = '${params.name}'`;
        }
    } else {
        sqlQuery = `OCC_YEAR = '${params.year}'`;
    }

    layerMajorCrimeIndicators.definitionExpression = sqlQuery;

}

export const layerPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Crime Category - {MCI_CATEGORY}",
    content: [
        {
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "expression/format-occurred-date",
                },
                {
                    fieldName: "expression/format-reported-date",
                },
                {
                    fieldName: "OFFENCE",
                    label: "Offence"
                },
                {
                    fieldName: "PREMISES_TYPE",
                    label: "Premises Type"
                },
                {
                    fieldName: "DIVISION",
                    label: "Division"
                },
                {
                    fieldName: "NEIGHBOURHOOD_140",
                    label: "NEIGHBOURHOOD_140"
                },
                {
                    fieldName: "NEIGHBOURHOOD_158",
                    label: "NEIGHBOURHOOD_158"
                },
                {
                    fieldName: "LOCATION_TYPE",
                    label: "Location Type"
                }
            ],
        },
        {
            type: "text",
            text: "NOTE: Due to the offset of occurrence location, the numbers by Division and Neighbourhood may not reflect the exact count of occurrences reported within these geographies. Therefore, the Toronto Police Service does not guarantee the accuracy, completeness, timeliness of the data and it should not be compared to any other source of crime data. <br/><br/><a href='https://www.tps.ca/' rel='noreferrer noopener' target='_blank'>Source: TPS</a>"
        }
    ],
    expressionInfos: [
        {
            expression: `Text(DateOnly($feature.OCC_DATE), 'ddd, MMM D, Y') + ' @ ' + Text(Time($feature.OCC_HOUR,00,00), 'h:mm A')`,
            name: "format-occurred-date",
            title: "Occurred Date and Time",
        },
        {
            expression: `Text(DateOnly($feature.REPORT_DATE), 'ddd, MMM D, Y') + ' @ ' + Text(Time($feature.REPORT_HOUR,00,00), 'h:mm A')`,
            name: "format-reported-date",
            title: "Reported Date and Time"
        }
    ],
    lastEditInfoEnabled: true,
};