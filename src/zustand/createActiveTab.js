import { create } from "zustand";

const createActiveTab = create((set) => ({
    activeTab: '',
    setActiveTab: (activeTab) => set({ activeTab })
}))

export default createActiveTab;