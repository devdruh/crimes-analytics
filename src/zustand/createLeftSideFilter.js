import { create } from "zustand";

const createLeftSideFilter = create((set) => ({
    selectedYear: '2024',
    setSelectedYear: (selectedYear) => set({ selectedYear }),
    selectedMonth: '',
    setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
    selectedDay: '',
    setSelectedDay: (selectedDay) => set({ selectedDay }),
    selectedCategories: [],
    setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
}))

export default createLeftSideFilter;