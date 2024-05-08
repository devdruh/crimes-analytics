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
import Spinner from "../widget/Spinner";

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);
    const sliderRef = useRef(null);
    const chartRef = useRef('chart-ref');
    const loadingRef = useRef(null);

    useLayerInit();

    useEffect(() => {

        if (mapRef?.current) {

            view.set('container', mapRef?.current);

            fullscreen.set('element', appRef?.current);
            view.ui.add(fullscreen, "top-left");

            slider.set('container', sliderRef?.current);
            view.ui.add(expandLegend, 'bottom-left');

            expandChart.set('content', document.getElementById(chartRef.current));
            view.ui.add(expandChart, "top-right");

            view.ui.add(loadingRef.current, "top-right");

            return () => { mapRef.current = null; view; fullscreen; appRef.current = null; loadingRef.current = null; };
        }

    }, []);

    return (
        <>
            <SliderContainer sliderRef={sliderRef} />
            <MapView appRef={appRef} mapRef={mapRef} />
            <Chart id={chartRef.current} />
            <Spinner loadingRef={loadingRef} />
        </>
    )
}

export default MapContainer