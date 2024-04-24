import { create } from "zustand";

const createSliderWidget = create((set) => ({
    sliderValue: '',
    setSliderValue: (sliderValue) => set({ sliderValue })
}))

export default createSliderWidget