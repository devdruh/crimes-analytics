/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: ['selector', '[data-mode="dark"]'],
    daisyui: {
        themes: false,
    },
    plugins: [
        require("daisyui")
    ],
}