import Slider from "@arcgis/core/widgets/Slider.js";

const slider = new Slider({
    // min: 2000,
    // max: 2030,
    // values: [],
    step: 1,
    visibleElements: {
        labels: true,
        rangeLabels: true
    }
});

export default slider