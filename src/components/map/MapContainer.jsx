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
import expandNeighbourhoodChart from "../widget/ExpandNeighbourhoodChart";
import NeighbourhoodChart from "../widget/NeighbourhoodChart";

const MapContainer = () => {

    const mapRef = useRef(null);
    const appRef = useRef(null);
    const sliderRef = useRef(null);
    const chartRef = useRef('chart-ref');
    const frequencyChartRef = useRef('frequency-ref');
    const neighbourhoodChartRef = useRef('neighbourhood-ref');
    const loadingRef = useRef(null);

    useLayerInit();

    useEffect(() => {

        if (mapRef.current) {

            view.set('container', mapRef.current);

            fullscreen.set('element', appRef?.current);
            view.ui.add(fullscreen, "top-left");

            slider.set('container', sliderRef?.current);
            view.ui.add(expandLegend, 'bottom-left');

            view.when(function () {

                expandChart.set('content', document.getElementById(chartRef.current));
                view.ui.add(expandChart, "top-right");

                expandFrequencyChart.set('content', document.getElementById(frequencyChartRef.current));
                view.ui.add(expandFrequencyChart, "top-right");

                expandNeighbourhoodChart.set('content', document.getElementById(neighbourhoodChartRef.current));
                view.ui.add(expandNeighbourhoodChart, "top-right");

                view.ui.add(loadingRef.current, "top-right");

            });

            return () => {
                if (view) {
                    view.container = null;
                    mapRef.current = null;
                    appRef.current = null;
                    loadingRef.current = null;
                }
            };
        }

    }, []);

    return (
        <>
            <SliderContainer sliderRef={sliderRef} />
            <MapView appRef={appRef} mapRef={mapRef} />
            <Chart id={chartRef.current} />
            <FrequencyChart id={frequencyChartRef.current} />
            <NeighbourhoodChart id={neighbourhoodChartRef.current} />
            <Spinner loadingRef={loadingRef} />
        </>
    )

}

export default MapContainer