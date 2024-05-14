import Expand from "@arcgis/core/widgets/Expand.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import view from "../map/View";

const expandFrequencyChart = new Expand({
    // expandIcon: "layers",  // see https://developers.arcgis.com/calcite-design-system/icons/
    // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
    expandIcon: "graph-time-series",
    expandTooltip: 'View Chart',
    view: view,
    iconNumber: 0
});

reactiveUtils.watch(
    () => expandFrequencyChart.expanded,
    (expanded) => {
        if (expanded)
            expandFrequencyChart.iconNumber = 0;
    });

export default expandFrequencyChart
