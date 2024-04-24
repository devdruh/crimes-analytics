import Legend from "@arcgis/core/widgets/Legend.js";

import view from "../map/View";

const legend = new Legend({
    view: view
});

export default legend;