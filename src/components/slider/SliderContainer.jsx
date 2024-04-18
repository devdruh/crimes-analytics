import { useEffect } from "react";
import useSliderWidget from "../../zustand/useSliderWidget";
import useSliderInit from "../../hooks/useSliderInit";

// eslint-disable-next-line react/prop-types
const SliderContainer = ({ sliderRef }) => {

    const { sliderValue } = useSliderWidget();

    useSliderInit();

    useEffect(() => {

    }, [sliderValue]);

    return (
        <div id="sliderContainer" className="esri-widget flex flex-row px-3">
            <span id="sliderValue" className="text-nowrap flex justify-center flex-col text-center text-xl">{sliderValue}</span>
            <div id="sliderInnerContainer" className="flex flex-col justify-center px-5">
                <div id="slider" ref={sliderRef} className="w-full"></div>
            </div>
            <div id="playButton" className="esri-widget esri-widget--button toggle-button my-5">
                <div>
                    <span className="toggle-button-icon esri-icon-play" aria-label="play icon"></span>
                    Play
                </div>
                <div>
                    <span className="toggle-button-icon esri-icon-pause" aria-label="pause icon"></span>
                    Pause
                </div>
            </div>
        </div>
    )
}

export default SliderContainer