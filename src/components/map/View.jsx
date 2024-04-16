import MapView from "@arcgis/core/views/MapView.js";
import map from './Map';

const view = new MapView({
    map: map,
    center: [-79.34, 43.70],
    zoom: 10
});

export default view