import { useEffect, useState } from 'react';
import uniqueValues from '@arcgis/core/smartMapping/statistics/uniqueValues';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import toast from 'react-hot-toast';
import getToastNotification from '../utils/getToastNotification';
import { getDaysArray, getMonthsArray, getPreviousMonth } from '../utils/formatters';

const useGetPrevAttributeUniqueValues = (field, url) => {

    const [prevAttributeValues, setPrevAttributeValues] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedCategories,
    } = createLeftSideFilter();

    let sqlQuery = '';

    if (selectedMonth === '' && selectedDay === '') {
        sqlQuery = `OCC_YEAR = '${parseInt(selectedYear) - 1}'`;
    } else if (selectedMonth !== '' & selectedDay === '') {
        const previousMonth = getPreviousMonth(selectedMonth);
        if (selectedMonth === 'January') {
            sqlQuery = `OCC_YEAR = '${parseInt(selectedYear) - 1}' AND OCC_MONTH = '${previousMonth.label}'`;
        } else {
            sqlQuery = `OCC_YEAR = '${selectedYear}' AND OCC_MONTH = '${previousMonth.label}'`;
        }
    } else if (selectedMonth !== '' && selectedDay !== '') {
        if (parseInt(selectedDay) === 1) {
            const previousMonth = getPreviousMonth(selectedMonth);
            const months = getMonthsArray();
            const findMonthValue = months.find(month => month.label === previousMonth.label);
            const day = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value)).length;

            if (selectedMonth === 'January') {
                sqlQuery = `OCC_YEAR = '${parseInt(selectedYear) - 1}' AND OCC_MONTH = '${previousMonth.label}' AND OCC_DAY = '${day}'`;
            } else {
                sqlQuery = `OCC_YEAR = '${selectedYear}' AND OCC_MONTH = '${previousMonth.label}' AND OCC_DAY = '${day}'`;
            }
        } else {
            sqlQuery = `OCC_YEAR = '${selectedYear}' AND OCC_MONTH = '${selectedMonth}' AND OCC_DAY = '${parseInt(selectedDay) - 1}'`;
        }
    }

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        const layer = new FeatureLayer({
            url: url,
            outFields: "*",
        });

        const findValues = async () => {

            try {
                setLoading(true);
                const response = await uniqueValues({ layer: layer, field: field, sqlWhere: sqlQuery, signal: signal })
                if (response.error) {
                    // console.log("Error: " + response.error);
                    throw new Error(response.error)
                }

                const result = response?.uniqueValueInfos;
                if (result.length > 0) {
                    var valueFormatted = [];

                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        valueFormatted.push({
                            label: element.value,
                            value: element.value,
                            count: element.count
                        });

                    }
                    setPrevAttributeValues(valueFormatted);
                }

                if (result.length === 0) {
                    setPrevAttributeValues([]);
                    getToastNotification().noAvailableData;
                    controller.abort();
                }

            } catch (error) {
                toast.error(error, {
                    position: "bottom-right"
                });
            } finally {
                setLoading(false);
            }

            return () => controller.abort() && setPrevAttributeValues([])
        }

        findValues();

    }, [sqlQuery, field, url, selectedCategories]);

    return { prevAttributeValues, loading }
}

export default useGetPrevAttributeUniqueValues