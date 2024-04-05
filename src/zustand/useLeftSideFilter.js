import { create } from "zustand";

const useLeftSideFilter = create((set) => ({
    selectedYear: '2024',
    setSelectedYear: (selectedYear) => set({ selectedYear }),
    selectedMonth: '',
    setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
    selectedDay: '',
    setSelectedDay: (selectedDay) => set({ selectedDay }),
    selectedCategory: '',
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}))

export default useLeftSideFilter;