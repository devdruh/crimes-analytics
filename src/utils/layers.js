import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { API_MCI_ARRESTED, API_MCI_DIVISION, API_MCI_ENDPOINT, API_MCI_NEIGHBOURHOOD, API_MCI_POLICE_FACILITIES, API_YTD_CRIME_WM, DEFAULT_LAYER_EXTENT, MONTHS_OF_THE_YEAR } from './constants';
import { convertTo12Hour, formatCategoryQuery, formatDaysOrder, formatHour12, formatMonthToNumber, formatSingleQuotedString } from './formatters';
import { viewGoToExtent, viewWhenLayerView } from './views';
import { mapAddLayer, mapRemoveAllLayers, mapRemoveLayer } from './maps';

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

export const layerNeighbourhood = new FeatureLayer({
    id: 'neighbourhood_158',
    url: API_MCI_NEIGHBOURHOOD,
    outFields: "*",
});

export const layerDivision = new FeatureLayer({
    id: 'division-17',
    url: API_MCI_DIVISION,
    outFields: "*",
});

export const layerPoliceFacilities = new FeatureLayer({
    id: 'police-facilities',
    url: API_MCI_POLICE_FACILITIES,
    outFields: '*',
});

export const layerArrestedChargedPersons = new FeatureLayer({
    id: 'patrol-zones',
    url: API_MCI_ARRESTED,
    outFields: '*',
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
    } else if (params.tab === 4) {
        sqlQuery = `OCC_YEAR = '${params.year}'`
    } else {
        sqlQuery = `OCC_YEAR = '${params.year}'`
    }

    layerMajorCrimeIndicators.definitionExpression = sqlQuery;

    mapRemoveLayer(layerDivision);
    mapRemoveLayer(layerNeighbourhood);
    const layerCallback = () => {
        viewGoToExtent(DEFAULT_LAYER_EXTENT);
    };
    viewWhenLayerView(layerMajorCrimeIndicators, layerCallback);
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

export const queryDivisionStats = async (where) => {

    let sqlQuery = `OCC_YEAR = '${where.year}'`;
    where.category !== '' ? sqlQuery += ` AND MCI_CATEGORY = '${where.category}'` : '';

    const response = await layerStatsQuery(sqlQuery, ['DIVISION']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.DIVISION,
            value: element.attributes.count
        });
    }

    return data;

}

export const queryByDivision = (params) => {

    let sqlQuery;

    if (!params.isUndefined) {
        sqlQuery = `OCC_YEAR = '${params.year}' AND DIVISION = '${params.name}'`;
        mapRemoveAllLayers();
        mapAddLayer(layerDivision);
        mapAddLayer(layerMajorCrimeIndicators);
        layerDivision.definitionExpression = `DIV = '${params.name}'`;
        layerDivision.featureEffect = {
            filter: {
                where: `DIV = '${params.name}'`
            },
            includedEffect: "bloom(0.9 0.6pt 0)",
            excludedEffect: "blur(2.25pt) opacity(0.5)"
        };
        const boundaryRenderer = {
            type: "simple",
            symbol: {
                color: "#0ca5b0",
                type: "simple-line",
                style: "solid"
            },
        };
        layerDivision.renderer = boundaryRenderer;
        layerDivision.queryExtent().then(function (results) {
            if (results.extent !== null) {
                viewGoToExtent(results.extent);
            }
        });
    } else {
        sqlQuery = `OCC_YEAR = '${params.year}'`;
        viewGoToExtent(DEFAULT_LAYER_EXTENT);
        mapRemoveLayer(layerDivision);
        mapRemoveLayer(layerNeighbourhood);
    }

    layerMajorCrimeIndicators.definitionExpression = sqlQuery;

}

export const queryDrillDownDivisionData = async (event) => {

    const division = formatSingleQuotedString(event.point.name);
    const where = `OCC_YEAR = '${event.point.id.substring(event.point.id.length - 4)}' AND DIVISION = '${division}'`;
    const response = await queryDivisionNeighbourhood(where);

    return response;
}

export const querySumArrestedChargedPersons = async (params) => {

    let where;

    if (params.tab === 2) {
        where = `ARREST_YEAR = '${params.year}' AND DIVISION = '${params.name}'`;
    } else if (params.tab === 4) {
        where = `ARREST_YEAR = '${params.year}' AND HOOD_158 = '${params.name}'`;
    } else {
        where = `ARREST_YEAR = '${params.year}'`;
    }

    let query = layerArrestedChargedPersons.createQuery();
    query.where = where;
    query.outFields = '*';

    let sumArrested = {
        onStatisticField: "ARREST_COUNT",
        outStatisticFieldName: "TOTAL_ARRESTED",
        statisticType: "sum"
    };
    query.outStatistics = [sumArrested];

    let result = await layerArrestedChargedPersons.queryFeatures(query);

    return result;
}

export const queryDivisionNeighbourhood = async (where) => {

    const response = await layerStatsQuery(where, ['NEIGHBOURHOOD_158']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.NEIGHBOURHOOD_158,
            value: element.attributes.count
        });
    }

    return data;

}

export const queryNeighbourhoodStats = async (where) => {

    let sqlQuery = `OCC_YEAR = '${where.year}'`;
    where.category !== '' ? sqlQuery += ` AND MCI_CATEGORY = '${where.category}'` : '';

    const response = await layerStatsQuery(sqlQuery, ['NEIGHBOURHOOD_158']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.NEIGHBOURHOOD_158,
            value: element.attributes.count
        });
    }

    return data;

}

export const queryDrillDownNeighbourhoodData = async (event) => {

    const neighbourhood = formatSingleQuotedString(event.point.name);
    const where = `OCC_YEAR = '${event.point.id.substring(event.point.id.length - 4)}' AND NEIGHBOURHOOD_158 = '${neighbourhood}'`;
    const response = await queryNeighbourhoodPremises(where);

    return response;
}

export const queryNeighbourhoodPremises = async (where) => {

    const response = await layerStatsQuery(where, ['PREMISES_TYPE']);
    const data = [];

    for (let index = 0; index < response.features.length; index++) {
        const element = response.features[index];
        data.push({
            label: element.attributes.PREMISES_TYPE,
            value: element.attributes.count
        });
    }

    return data;

}


export const queryNeighbourhoodId = async (params) => {

    const neighbourhood = formatSingleQuotedString(params.name);
    const where = `AREA_NAME LIKE '${neighbourhood}%'`;

    let query = layerNeighbourhood.createQuery();
    query.where = where;
    query.returnGeometry = false;
    query.outFields = '*';

    const result = await layerNeighbourhood.queryFeatures(query);

    return result;
}

export const queryByNeighbourhood = (params) => {

    let sqlQuery;

    if (!params.isUndefined) {
        const neighbourhood = formatSingleQuotedString(params.name);
        sqlQuery = `OCC_YEAR = '${params.year}' AND NEIGHBOURHOOD_158 = '${neighbourhood}'`;
        mapRemoveAllLayers();
        mapAddLayer(layerNeighbourhood);
        mapAddLayer(layerMajorCrimeIndicators);
        layerNeighbourhood.definitionExpression = `AREA_NAME = '${neighbourhood}'`;
        layerNeighbourhood.featureEffect = {
            filter: {
                where: `AREA_NAME = '${neighbourhood}'`
            },
            includedEffect: "bloom(0.9 0.6pt 0)",
            excludedEffect: "blur(2.25pt) opacity(0.5)"
        };
        const boundaryRenderer = {
            type: "simple",
            symbol: {
                color: "#0ca5b0",
                type: "simple-line",
                style: "solid"
            },
        };
        layerNeighbourhood.renderer = boundaryRenderer;
        layerNeighbourhood.queryExtent().then(function (results) {
            if (results.extent !== null)
                viewGoToExtent(results.extent);
        });
    } else {
        sqlQuery = `OCC_YEAR = '${params.year}'`;
        viewGoToExtent(DEFAULT_LAYER_EXTENT);
        mapRemoveLayer(layerNeighbourhood);
    }
    layerMajorCrimeIndicators.definitionExpression = sqlQuery;

}