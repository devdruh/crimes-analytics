import { useEffect, useRef } from "react";
import view from "./View";
import MapView from "./MapView";
import fullscreen from "../widget/Fullscreen";
import slider from "../widget/Slider";
import expandLegend from "../widget/ExpandLegend";
import SliderContainer from "../slider/SliderContainer";
import useLayerInit from "../../hooks/useLayerInit";
import expandChart from "../widget/ExpandChart";
import Chart from "../widget/Chart";

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);
    const sliderRef = useRef(null);
    const chartRef = useRef('chart-ref');

    useLayerInit();

    useEffect(() => {

        if (mapRef?.current) {

            fullscreen.set('element', appRef?.current);
            view.ui.add(fullscreen, "top-left");

            slider.set('container', sliderRef?.current);
            view.ui.add(expandLegend, 'bottom-left');

            expandChart.set('content', document.getElementById(chartRef.current));
            view.ui.add(expandChart, "top-right");

            view.set('container', mapRef?.current);

            return () => { mapRef.current = null; view; fullscreen; appRef.current = null; };
        }

    }, []);

    return (
        <>
            <SliderContainer sliderRef={sliderRef} />
            <MapView appRef={appRef} mapRef={mapRef} />
            <Chart id={chartRef.current} />
        </>
    )
}

export default MapContainer