import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../loading/LoadingSpinner';
import useThemeSelector from "../../zustand/useThemeSelector";

// eslint-disable-next-line react/prop-types
const TwiiterTimeline = ({ username }) => {

    const [loading, setLoading] = useState(true);
    const elementRef = useRef(null);
    const elementHeight = 600;
    const { isDark } = useThemeSelector();

    useEffect(() => {

        if (elementRef.current !== null) {

            window.twttr.widgets.createTimeline(
                {
                    sourceType: 'profile',
                    screenName: username,
                },
                elementRef.current,
                {
                    theme: isDark ? 'dark' : 'light',
                    related: 'twitterdev,twitterapi',
                    chrome: 'noborders noscrollbar',
                    dnt: true,
                    height: elementHeight,
                    tweetLimit: 2,
                }).then(function () {
                    setLoading(false);
                });
        }

        return () => { elementRef.current = null }

    }, [username, isDark]);

    return (
        <div ref={elementRef}>
            {
                loading &&
                <div className="flex justify-center items-center" style={{ height: elementHeight }}>
                    <LoadingSpinner />
                </div>
            }
        </div>
    )
}

export default TwiiterTimeline

// loading && <div className="flex justify-center">
//     <div className="bottom-1/2 absolute">
//         <LoadingSpinner />
//     </div>
// </div>