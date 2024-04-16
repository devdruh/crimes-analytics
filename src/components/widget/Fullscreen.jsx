import view from '../map/View'
import Fullscreen from "@arcgis/core/widgets/Fullscreen.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

const fullscreen = new Fullscreen({
    view: view,
});

const handleFullscreen = reactiveUtils.watch(
    () => fullscreen.viewModel.state,
    (state) => {
        const elem = fullscreen.element;
        const mapContainer = elem.firstElementChild;

        if (state === 'ready') {
            mapContainer.setAttribute('class', 'map-container');
        } else if (state === 'active') {
            mapContainer.setAttribute('class', 'h-screen w-screen');
        }
    },
);

fullscreen.addHandles(handleFullscreen);
view.ui.add(fullscreen, "top-right");

export default fullscreen