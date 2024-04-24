import { useState } from "react";
import createSliderWidget from "../../zustand/createSliderWidget";
import useSliderInit from "../../hooks/useSliderInit";
import createLeftSideFilter from "../../zustand/createLeftSideFilter";
import PlayPause from "./PlayPause";

// eslint-disable-next-line react/prop-types
const SliderContainer = ({ sliderRef }) => {

    const { sliderValue } = createSliderWidget();
    const { selectedMonth } = createLeftSideFilter();
    const [isPlaying, setIsPlaying] = useState(false)

    // const { createRendererLayerMCI } = useSliderInit();
    useSliderInit();

    const { handleStartAnimation, handleStopAnimation } = PlayPause();
    const handleChange = (e) => {
        setIsPlaying(!isPlaying);
        if (e.target.checked) {
            handleStartAnimation();
        } else {
            handleStopAnimation();
        }
    }

    return (
        <div className={`${selectedMonth !== '' ? 'visible ease-in duration-300 transition -translate-y-3/4' : 'invisible absolute'}`}>
            <div id="sliderContainer" className="esri-widget flex flex-row px-3 translate-y-3/4" >
                <span id="sliderValue" className="text-nowrap flex justify-center flex-col text-center text-xl">{sliderValue}</span>
                <div id="sliderInnerContainer" className="flex flex-col justify-center px-5">
                    <div id="slider" ref={sliderRef} className="w-full"></div>
                </div>
                <label id="playButton" className="swap esri-widget my-3">
                    <input type="checkbox" onChange={handleChange} checked={isPlaying} />
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="swap-off fill-current"
                        width="48"
                        height="48"
                    >
                        <path d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                    </svg>

                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="swap-on fill-current"
                        width="48"
                        height="48"
                    >
                        <path d="M6 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" />
                    </svg>
                </label>
            </div>
        </div>
    )
}

export default SliderContainer