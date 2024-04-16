import { useEffect, useRef } from "react";
import useLayerInit from "../../hooks/useLayerInit";
import view from "./View";

const MapContainer = () => {

    const mapRef = useRef(null);

    useLayerInit();

    useEffect(() => {

        if (mapRef?.current) {

            view.set('container', mapRef?.current);

            return () => mapRef.current = null && view;
        }

    }, []);

    return (
        <div className="map-container">
            <div id="viewDiv" ref={mapRef}></div>
        </div>
    )
}

export default MapContainer