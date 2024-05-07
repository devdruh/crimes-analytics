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
        const hasSlider = fullscreen.element.previousElementSibling.classList.contains('visible');

        if (state === 'ready') {
            mapContainer.setAttribute('class', `${hasSlider ? 'map-container-slider' : 'map-container ease-out duration-300'}`);
            view.set('zoom', 10);
        } else if (state === 'active') {
            mapContainer.setAttribute('class', 'h-screen w-screen');
            view.set('zoom', 11);
        }
    },
);

fullscreen.addHandles(handleFullscreen);

export default fullscreen