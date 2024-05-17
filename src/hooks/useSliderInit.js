import { useEffect, useRef } from 'react';
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";
import createSliderWidget from '../zustand/createSliderWidget';
import createLeftSideFilter from '../zustand/createLeftSideFilter';
import { layerMajorCrimeIndicators, layerMCIRenderer } from '../utils/layers';
import { formatHour12, getDaysArray, getMonthsArray } from '../utils/formatters';
import slider from '../components/widget/Slider';
import view from '../components/map/View';

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

            const tooltip = createTooltip();

            const hitTest = promiseUtils.debounce(async (e) => {
                const hit = await view.hitTest(e);
                const results = hit.results.filter((result) => {
                    return result.graphic.layer === layerMajorCrimeIndicators;
                });

                if (!results.length) {
                    return null;
                }
                return {
                    graphic: results[0].graphic,
                    screenPoint: hit.screenPoint
                };
            });

            const pointerMoveEvent = (event) => {

                const storeTab = localStorage.getItem('activeTab');
                if (storeTab && storeTab === '1') {
                    return hitTest(event)
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

            view.on("pointer-move", pointerMoveEvent);

        }

        function createTooltip() {
            const tooltip = document.createElement("div");
            const style = tooltip.style;

            tooltip.setAttribute("role", "tooltip");
            tooltip.classList.add("tooltip-map");

            const textElement = document.createElement("div");
            textElement.classList.add("esri-widget");
            textElement.classList.add("invisible");
            tooltip.appendChild(textElement);

            view.container.appendChild(tooltip);

            let x = 0;
            let y = 0;
            let targetX = 0;
            let targetY = 0;
            let visible = false;

            // move the tooltip progressively
            function move() {
                x += (targetX - x) * 0.1;
                y += (targetY - y) * 0.1;

                if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
                    x = targetX;
                    y = targetY;
                } else {
                    requestAnimationFrame(move);
                }

                style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(y) + "px, 0)";
            }

            return {
                show: (point, text) => {
                    if (!visible) {
                        x = point.x;
                        y = point.y;
                    }

                    targetX = point.x;
                    targetY = point.y;
                    style.opacity = 1;
                    visible = true;
                    textElement.innerHTML = text;
                    textElement.classList.remove("invisible");

                    move();
                },

                hide: () => {
                    style.opacity = 0;
                    visible = false;
                }
            };
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
            view.whenLayerView(layerMajorCrimeIndicators).then(setupHoverTooltip);

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

    // return { createRendererLayerMCI }
}

export default useSliderInit