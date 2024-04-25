import { useEffect, useState } from "react";
import useGetAttributeUniqueValues from "../../hooks/useGetAttributeUniqueValues"
import { API_MCI_CATEGORY, API_MCI_ENDPOINT } from "../../utils/constants";
import PieHighCharts from "../chart/PieHighCharts";
import expandChart from "./ExpandChart";

// eslint-disable-next-line react/prop-types
const Chart = ({ id }) => {

    const { attributeValues } = useGetAttributeUniqueValues(API_MCI_CATEGORY, API_MCI_ENDPOINT);

    const [data, setData] = useState([]);

    useEffect(() => {

        if (attributeValues.length > 0) {
            var formattedData = [];
            let maxValue = 0;
            for (let index = 0; index < attributeValues.length; index++) {
                const element = attributeValues[index];

                if (element.count > maxValue) {
                    maxValue = element.count;
                }

                formattedData.push({
                    name: element.label,
                    y: element.count
                });

            }

            const findIndex = formattedData.findIndex(value => value.y === maxValue);
            formattedData[findIndex]['sliced'] = true;
            formattedData[findIndex]['selected'] = true;

            expandChart.iconNumber = 1;
            setData(formattedData);
        }

    }, [attributeValues]);

    return (
        <div id={id} className="bg-base-100">
            {
                data.length > 0 && data && (<PieHighCharts items={data} />)
            }
        </div>
    )
}

export default Chart