import { useEffect, useRef, lazy } from "react";
import useLayerInit from "../../hooks/useLayerInit";
import view from "./View";
import fullscreen from "../widget/Fullscreen";
import slider from "../widget/Slider";
const SliderContainer = lazy(() => import('../slider/SliderContainer'));

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);
    const sliderRef = useRef(null);

    useLayerInit();

    useEffect(() => {

        if (mapRef?.current) {

            view.set('container', mapRef?.current);
            fullscreen.set('element', appRef?.current);
            view.ui.add(fullscreen, "top-right");

            slider.set('container', sliderRef?.current);

            return () => mapRef.current = null && view && fullscreen && appRef;
        }

    }, []);

    return (
        <>
            <SliderContainer sliderRef={sliderRef} />
            <div id="app-map-container" className="app-map-container" ref={appRef}>
                <div className="map-container">
                    <div id="viewDiv" ref={mapRef}></div>
                </div>
            </div>
        </>
    )
}

export default MapContainer