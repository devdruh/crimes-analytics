import { create } from "zustand";

const createSliderWidget = create((set) => ({
    sliderValue: '',
    setSliderValue: (sliderValue) => set({ sliderValue }),
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({ isPlaying }),
}))

export default createSliderWidget