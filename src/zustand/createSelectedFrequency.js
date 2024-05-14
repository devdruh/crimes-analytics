import { create } from "zustand";

const createSelectedFrequency = create((set) => ({
    selectedFrequency: '',
    setSelectedFrequency: (selectedFrequency) => set({ selectedFrequency }),
}))

export default createSelectedFrequency;