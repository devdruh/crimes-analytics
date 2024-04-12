import { create } from "zustand"

const useThemeSelector = create((set) => ({

    isDark: JSON.parse(localStorage.getItem('isDark')) || window.matchMedia('(prefers-color-scheme: dark)').matches,
    setIsDark: (isDark) => set({ isDark }),

}))

export default useThemeSelector