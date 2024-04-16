import { useEffect, useRef } from "react";
import useLayerInit from "../../hooks/useLayerInit";
import view from "./View";
import fullscreen from "../widget/Fullscreen";

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);

    useLayerInit();

    useEffect(() => {

        if (mapRef?.current) {

            view.set('container', mapRef?.current);
            fullscreen.set('element', appRef?.current);

            return () => mapRef.current = null && view && fullscreen && appRef;
        }

    }, []);

    return (
        <div id="app-map-container" className="app-map-container" ref={appRef}>
            <div className="map-container">
                <div id="viewDiv" ref={mapRef}></div>
            </div>
        </div>
    )
}

export default MapContainer