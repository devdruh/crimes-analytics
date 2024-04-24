import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";
import createSliderWidget from "../../zustand/createSliderWidget";
import { layerMCIRenderer, layerMajorCrimeIndicators } from "../../utils/layers";
import { formatHour12 } from "../../utils/formatters";
import slider from "../widget/Slider";

const PlayPause = () => {

    const { setSliderValue } = createSliderWidget();
    const { selectedMonth, selectedDay } = createLeftSideFilter(useShallow((state) => ({
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
    })));

    const [isPlaying, setIsPlaying] = useState(false);
    const [playValue, setPlayValue] = useState(0);

    useEffect(() => {

        let timeoutId;
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

        return () => {
            clearTimeout(timeoutId);
        };

    }, [isPlaying, selectedDay, selectedMonth, setSliderValue, playValue]);

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