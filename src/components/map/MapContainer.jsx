import { useEffect, useRef } from "react";
import view from "./View";
import MapView from "./MapView";
import fullscreen from "../widget/Fullscreen";
import slider from "../widget/Slider";
import expandLegend from "../widget/ExpandLegend";
import SliderContainer from "../slider/SliderContainer";
import useLayerInit from "../../hooks/useLayerInit";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);
    const sliderRef = useRef(null);
    const { selectedMonth } = createLeftSideFilter();

    useLayerInit();

    useEffect(() => {

        if (mapRef?.current) {

            view.set('container', mapRef?.current);
            fullscreen.set('element', appRef?.current);
            view.ui.add(fullscreen, "top-right");

            slider.set('container', sliderRef?.current);
            view.ui.add(expandLegend, 'bottom-left');

            return () => { mapRef.current = null && view && fullscreen && appRef };
        }

    }, [selectedMonth]);

    return (
        <>
            <SliderContainer sliderRef={sliderRef} />
            <MapView appRef={appRef} mapRef={mapRef} />
        </>
    )
}

export default MapContainer