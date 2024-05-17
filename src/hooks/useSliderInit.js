import { useEffect, useRef } from 'react';
import slider from '../components/widget/Slider';
import createSliderWidget from '../zustand/createSliderWidget';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { layerMajorCrimeIndicators, layerMCIRenderer } from '../utils/layers';
import { formatHour12, getDaysArray, getMonthsArray } from '../utils/formatters';
import { viewCreateTooltip, viewEventPointerMove, viewHitTestLayer, viewWhenLayerView } from '../utils/views';

const useSliderInit = () => {

    const { setSliderValue } = createSliderWidget();
    const { selectedYear, selectedMonth, selectedDay } = createLeftSideFilter();

    let layerSymbol = useRef(null);

    useEffect(() => {

        const today = new Date();
        const months = getMonthsArray();

        const handleSliderValue = (value) => {

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

        const handleThumbDrag = (event) => {
            if (event.state === 'stop') {
                const value = event.value;
                handleSliderValue(value);
            }
        }

        const setupHoverTooltip = (layerview) => {

            let highlight;

            const tooltip = viewCreateTooltip();

            const pointerMoveEvent = (event) => {

                const storeTab = localStorage.getItem('activeTab');
                if (storeTab && storeTab === '1') {

                    // view hit test layer on pointer move
                    viewHitTestLayer(layerMajorCrimeIndicators, event)
                        .then((hit) => {
                            // remove current highlighted feature
                            if (highlight) {
                                highlight.remove();
                                highlight = null;
                            }

                            // highlight the hovered feature
                            // or hide the tooltip
                            if (hit) {
                                const graphic = hit.graphic;
                                const screenPoint = hit.screenPoint;

                                highlight = layerview.highlight(graphic);

                                const today = new Date();
                                today.setHours(graphic.getAttribute("OCC_HOUR"), 0, 0, 0);

                                tooltip.show(screenPoint, selectedMonth !== '' && selectedDay === '' ? "Occurred in day " + graphic.getAttribute("OCC_DAY") : "Occurred at " + formatHour12(today));
                            } else {
                                tooltip.hide();
                            }
                        }, () => { });
                }

                return;

            }

            // add pointer move event listener
            viewEventPointerMove(pointerMoveEvent);

        }

        const sliderInit = () => {

            if (selectedMonth !== '' && selectedDay === '' && selectedYear !== '') {
                const value = today.getDate();
                const findMonthValue = months.find(month => month.label === selectedMonth);
                const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));

                slider.min = 1;
                slider.max = days.length;
                slider.steps = 1;

                if (value > days.length) {
                    slider.values = [Math.floor(value / 2)];
                    setSliderValue('Day-' + Math.floor(value / 2));
                } else {
                    slider.values = [value];
                    setSliderValue('Day-' + value);
                }
            }

            if (selectedDay !== '') {
                const value = today.getHours();

                slider.min = 0;
                slider.max = 23;
                slider.values = [value];
                // slider.viewModel.setValue(0, value);
                setSliderValue(formatHour12(today));
            }

            slider.on("thumb-drag", handleThumbDrag);

            viewWhenLayerView(layerMajorCrimeIndicators, setupHoverTooltip);

            return () => { handleThumbDrag; layerMajorCrimeIndicators.renderer; setSliderValue(''); }

        }

        const initLayerRenderer = layerMajorCrimeIndicators.renderer;

        if (selectedYear !== '') {
            sliderInit();

            if (initLayerRenderer?.visualVariables === null) {
                layerSymbol.current = initLayerRenderer
            }
        }

        if (initLayerRenderer?.visualVariables?.length > 0) {
            layerMajorCrimeIndicators.renderer = layerSymbol.current
        }

        return () => { handleThumbDrag; layerMajorCrimeIndicators.renderer; setSliderValue(''); }

    }, [setSliderValue, selectedYear, selectedMonth, selectedDay]);

}

export default useSliderInit