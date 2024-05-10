import { create } from "zustand";

const createActiveTab = create((set) => ({
    activeTab: 1,
    setActiveTab: (activeTab) => set({ activeTab })
}))

export default createActiveTab;