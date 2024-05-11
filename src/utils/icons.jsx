const stat1 = <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
>
    <path d="M20 12a2 2 0 00-.703.133l-2.398-1.963c.059-.214.101-.436.101-.67C17 8.114 15.886 7 14.5 7S12 8.114 12 9.5c0 .396.1.765.262 1.097l-2.909 3.438A2.06 2.06 0 009 14c-.179 0-.348.03-.512.074l-2.563-2.563C5.97 11.348 6 11.179 6 11c0-1.108-.892-2-2-2s-2 .892-2 2 .892 2 2 2c.179 0 .348-.03.512-.074l2.563 2.563A1.906 1.906 0 007 16c0 1.108.892 2 2 2s2-.892 2-2c0-.237-.048-.46-.123-.671l2.913-3.442c.227.066.462.113.71.113a2.48 2.48 0 001.133-.281l2.399 1.963A2.077 2.077 0 0018 14c0 1.108.892 2 2 2s2-.892 2-2-.892-2-2-2z" />
</svg>

const stat2 = <svg
    viewBox="0 0 979.817 1000"
    fill="currentColor"
    className="w-8 h-8"
>
    <path d="M963.817 118c10.667-14.667 16-13.333 16 4v768h-964c-8 0-13-2.333-15-7s-.333-10.333 5-17l230-288c13.333-14.667 26.667-15.333 40-2l74 66c6.667 5.333 13.667 7.667 21 7 7.333-.667 13-4.333 17-11l158-238c10.667-17.333 23.333-18.667 38-4l112 104c13.333 13.333 26 12 38-4l230-378" />
</svg>

const stat3 =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M4 19v1h18v2H2V2h2v15c3 0 6-2 8.1-5.6 3-5 6.3-7.4 9.9-7.4v2c-2.8 0-5.5 2.1-8.1 6.5C11.3 16.6 7.7 19 4 19z" />
    </svg>

const stat4 = <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    className="w-8 h-8"
>
    <path d="M128 496H48V304h80zM352 496h-80V208h80zM464 496h-80V96h80zM240 496h-80V16h80z" />
</svg>

const stat5 = <svg
    viewBox="0 0 1003.265 1000"
    fill="currentColor"
    className="w-8 h-8"
>
    <path d="M33.75 566c-28-6.667-38.667-25.333-32-56 6.667-28 24.667-38.667 54-32l98 24-52 80-68-16m890 12c9.333-8 20.333-11.667 33-11 12.667.667 23 5.667 31 15 21.333 21.333 20.667 42.667-2 64l-252 226c-8 8-18 12-30 12-9.333 0-18.667-3.333-28-10l-286-220-54-14 50-80 36 8c8 2.667 13.333 5.333 16 8l264 204 222-202m-490-220l-350 550c-8 14.667-20.667 22-38 22-8 0-16-2.667-24-8-10.667-6.667-17.333-16.333-20-29-2.667-12.667-.667-23.667 6-33l374-588c5.333-10.667 14.667-17.333 28-20 12-4 24-2 36 6l246 156 226-326c6.667-10.667 16-17 28-19s23.333 1 34 9c25.333 16 29.333 36.667 12 62l-252 362c-16 24-36.667 28-62 12l-244-156" />
</svg>

const stat6 = <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
>
    <path d="M21 8c-1.5 0-2.3 1.4-1.9 2.5l-3.6 3.6c-.3-.1-.7-.1-1 0l-2.6-2.6c.4-1.1-.4-2.5-1.9-2.5-1.4 0-2.3 1.4-1.9 2.5L3.5 16c-1.1-.3-2.5.5-2.5 2 0 1.1.9 2 2 2 1.4 0 2.3-1.4 1.9-2.5l4.5-4.6c.3.1.7.1 1 0l2.6 2.6c-.3 1 .5 2.5 2 2.5s2.3-1.4 1.9-2.5l3.6-3.6c1.1.3 2.5-.5 2.5-1.9 0-1.1-.9-2-2-2m-6 1l.9-2.1L18 6l-2.1-.9L15 3l-.9 2.1L12 6l2.1.9L15 9M3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9l.5 2z" />
</svg>

const randomIcons = [
    stat1,
    stat2,
    stat3,
    stat4,
    stat5,
    stat6
]

export const getRandomStatsIcon = () => {
    const randomIndex = Math.floor(Math.random() * randomIcons.length);
    return randomIcons[randomIndex]
}


export const iconTimeOutline =
    <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit={10}
            strokeWidth={32}
            d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M256 128v144h96"
        />
    </svg>;

export const iconClockTimeTwelveOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10C6.47 22 2 17.5 2 12S6.5 2 12 2m.5 11.03H11V7h1.5v6.03z" />
    </svg>;

export const iconClockTimeOneOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10C6.47 22 2 17.5 2 12S6.5 2 12 2m3.3 5.8l-3 5.2H11V7h1.5v2.65l1.5-2.6 1.3.75z" />
    </svg>;

export const iconClockTimeTwoOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10C6.47 22 2 17.5 2 12S6.5 2 12 2m.5 11H11V7h1.5v4.26l3.7-2.13.75 1.3L12.5 13z" />
    </svg>;

export const iconClockTimeThreeOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m5 9.5V13h-6V7h1.5v4.5H17z" />
    </svg>;

export const iconClockTimeFourOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m5 11.9l-.7 1.3-5.3-2.9V7h1.5v4.4l4.5 2.5z" />
    </svg>;

export const iconClockTimeFiveOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m3.3 14.2L14 17l-3-5.2V7h1.5v4.4l2.8 4.8z" />
    </svg>;

export const iconClockTimeSixOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 5v10H11V7h1.5z" />
    </svg>;

export const iconClockTimeSevenOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 5v5.2L9.8 17l-1.3-.8 2.5-4.4V7h1.5z" />
    </svg>;

export const iconClockTimeEightOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 10.8l-4.8 2.8-.7-1.4 4-2.3V7h1.5v5.8z" />
    </svg>;

export const iconClockTimeNineOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 5v6H7v-1.5h4V7h1.5z" />
    </svg>;

export const iconClockTimeTenOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 11H11l-4-2.3.8-1.3 3.3 1.9V7h1.5v6z" />
    </svg>;

export const iconClockTimeElevenOutline =
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 5v6H11L8.5 8.6l1.3-.8L11 10V7h1.5z" />
    </svg>;

export const getIconClockTime = (time) => {
    if (time === 0 || time === 12) return iconClockTimeTwelveOutline;
    if (time === 1 || time === 13) return iconClockTimeOneOutline;
    if (time === 2 || time === 14) return iconClockTimeTwoOutline;
    if (time === 3 || time === 15) return iconClockTimeThreeOutline;
    if (time === 4 || time === 16) return iconClockTimeFourOutline;
    if (time === 5 || time === 17) return iconClockTimeFiveOutline;
    if (time === 6 || time === 18) return iconClockTimeSixOutline;
    if (time === 7 || time === 19) return iconClockTimeSevenOutline;
    if (time === 8 || time === 20) return iconClockTimeEightOutline;
    if (time === 9 || time === 21) return iconClockTimeNineOutline;
    if (time === 10 || time === 22) return iconClockTimeTenOutline;
    if (time === 11 || time === 23) return iconClockTimeElevenOutline;

    return iconTimeOutline

}

export const iconBxLineChart =
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        className="w-8 h-8 max-[390px]:h-4 max-[390px]:w-4"
    >
        <path
            fillRule="evenodd"
            d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.9l-3.613 4.417a.5.5 0 01-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 01-.808-.588l4-5.5a.5.5 0 01.758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 01-.5-.5z"
        />
    </svg>;

export const iconBxLineChartDown =
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        className="w-8 h-8 max-[390px]:h-4 max-[390px]:w-4"
    >
        <path
            fillRule="evenodd"
            d="M0 0h1v15h15v1H0V0zm10 11.5a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v2.6l-3.613-4.417a.5.5 0 00-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 00-.808.588l4 5.5a.5.5 0 00.758.06l2.609-2.61L13.445 11H10.5a.5.5 0 00-.5.5z"
        />
    </svg>;

export const getChartLineIcon = (value) => {

    if (value === 0) {
        return iconBxLineChartDown;
    } else {
        return iconBxLineChart;
    }

}

export const iconCalendarMonth =
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        className="w-8 h-8 max-[390px]:h-4 max-[390px]:w-4"
    >
        <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v11a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H2z" />
        <path d="M2.5 4a.5.5 0 01.5-.5h10a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V4zM11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-5 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
    </svg>;

export const iconCalendarWeek =
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        className="w-8 h-8 max-[390px]:h-4 max-[390px]:w-4"
    >
        <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
        <path d="M9 7.5a.5.5 0 01.5-.5H15v2H9.5a.5.5 0 01-.5-.5v-1zm-2 3v1a.5.5 0 01-.5.5H1v-2h5.5a.5.5 0 01.5.5z" />
    </svg>;

export const iconCalendarDay =
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        className="w-8 h-8 max-[390px]:h-4 max-[390px]:w-4"
    >
        <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
        <path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
    </svg>;

