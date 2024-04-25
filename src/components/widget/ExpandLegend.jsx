import Expand from "@arcgis/core/widgets/Expand.js";
import legend from "./Legend";
import view from "../map/View";

const expandLegend = new Expand({
    // expandIcon: "layers",  // see https://developers.arcgis.com/calcite-design-system/icons/
    // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
    expandTooltip: 'View Legend',
    view: view,
    content: legend
});

export default expandLegend;