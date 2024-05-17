import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";
import createSliderWidget from "../../zustand/createSliderWidget";
import { layerMCIRenderer, layerMajorCrimeIndicators } from "../../utils/layers";
import { formatHour12 } from "../../utils/formatters";
import slider from "../widget/Slider";
import createActiveTab from "../../zustand/createActiveTab";

const PlayPause = () => {

    const { setSliderValue, isPlaying, setIsPlaying } = createSliderWidget();
    const { selectedMonth, selectedDay } = createLeftSideFilter(useShallow((state) => ({
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
    })));

    const [playValue, setPlayValue] = useState(0);
    let layerSymbol = useRef(null);

    const { activeTab } = createActiveTab();

    useEffect(() => {

        let timeoutId;
        const initLayerRenderer = layerMajorCrimeIndicators.renderer;

        const updateSliderValue = (value) => {
            slider.viewModel.setValue(0, value);

            if (selectedMonth !== '' && selectedDay === '') {
                setSliderValue('Day-' + value);
            }

            if (selectedDay !== '') {
                const today = new Date();
                today.setHours(value, 0, 0, 0);
                setSliderValue(formatHour12(today));
            }

            layerMajorCrimeIndicators.renderer = layerMCIRenderer(value, selectedDay, selectedMonth);
        }

        if (isPlaying) {
            updateSliderValue(playValue);
            timeoutId = setTimeout(() => {
                setPlayValue(prev => prev + 1);
                if (playValue >= slider.max) {
                    setPlayValue(slider.min);
                }
            }, 1000);
        }

        // Set to default renderer while playing
        if (selectedMonth === '') {
            setIsPlaying(false);
            if (layerMajorCrimeIndicators.renderer?.visualVariables?.length > 0) {
                layerMajorCrimeIndicators.renderer = layerSymbol.current;
            }
        } else {
            if (initLayerRenderer?.visualVariables === null) {
                layerSymbol.current = initLayerRenderer;
            }
        }

        // Change the layer renderer to default renderer when playing and change tab
        if (activeTab === 3 && layerSymbol.current) {
            setIsPlaying(false);
            layerMajorCrimeIndicators.renderer = layerSymbol.current;
        }

        return () => {
            clearTimeout(timeoutId);
        };

    }, [isPlaying, selectedDay, selectedMonth, setSliderValue, playValue, activeTab, setIsPlaying]);

    return {
        handleStartAnimation: () => {
            setPlayValue(slider.values[0]);
            setIsPlaying(true);
        },
        handleStopAnimation: () => {
            setIsPlaying(false);
        }
    }
}

export default PlayPause