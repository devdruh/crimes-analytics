import { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView.js";
import map from "./Map";
import useLayerMemo from "../../hooks/useLayerMemo";
// import useLayerMajorCrimeIndicators from "../../hooks/useLayerMajorCrimeIndicators";

const MapContainer = () => {

    // const { layerMajorCrimeIndicators } = useLayerMajorCrimeIndicators();

    const mapRef = useRef(null);

    useLayerMemo();
    // useMemo(() => {
    //     map.layers.removeAll();
    //     map.addMany([layerMajorCrimeIndicators])
    // }, [layerMajorCrimeIndicators])

    useEffect(() => {

        if (mapRef?.current) {

            const view = new MapView({
                container: mapRef?.current,
                map: map,
                center: [-79.34600830076083, 43.755225053060066],
                zoom: 10
            });

            // return () => view && map.layers.removeAll();
            return () => { view }
        }

    }, []);

    return (
        <div className="map-container">
            <div id="viewDiv" ref={mapRef}></div>
        </div>
    )
}

export default MapContainer