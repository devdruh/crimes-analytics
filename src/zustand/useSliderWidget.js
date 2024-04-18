import { create } from "zustand";

const useSliderWidget = create((set) => ({
    sliderValue: '',
    setSliderValue: (sliderValue) => set({ sliderValue })
}))

export default useSliderWidget