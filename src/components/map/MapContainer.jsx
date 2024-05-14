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
import FrequencyChart from "../widget/FrequencyChart";
import expandFrequencyChart from "../widget/ExpandFrequencyChart";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);
    const sliderRef = useRef(null);
    const chartRef = useRef('chart-ref');
    const frequencyChartRef = useRef('frequency-ref');
    const loadingRef = useRef(null);

    const { selectedYear } = createLeftSideFilter();

    useLayerInit();

    useEffect(() => {

        if (selectedYear !== '') {

            if (mapRef?.current) {

                view.set('container', mapRef.current);

                fullscreen.set('element', appRef?.current);
                view.ui.add(fullscreen, "top-left");

                slider.set('container', sliderRef?.current);
                view.ui.add(expandLegend, 'bottom-left');

                expandChart.set('content', document.getElementById(chartRef.current));
                view.ui.add(expandChart, "top-right");

                expandFrequencyChart.set('content', document.getElementById(frequencyChartRef.current));
                view.ui.add(expandFrequencyChart, "top-right");

                view.ui.add(loadingRef.current, "top-right");

                return () => { mapRef.current = null; view; fullscreen; appRef.current = null; loadingRef.current = null; chartRef.current = null; };
            }
        }

    }, [selectedYear]);

    return (
        <>
            <SliderContainer sliderRef={sliderRef} />
            <MapView appRef={appRef} mapRef={mapRef} />
            <Chart id={chartRef.current} />
            <FrequencyChart id={frequencyChartRef.current} />
            <Spinner loadingRef={loadingRef} />
        </>
    )
}

export default MapContainer