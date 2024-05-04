import FacebookTimeline from "./FacebookTimeline"

// eslint-disable-next-line react/prop-types
const Facebook = () => {
    return (
        <div className="flex justify-evenly px-5">
            <FacebookTimeline username={'TorontoPolice'} title={'Toronto Police Service'} />
        </div>
    )
}

export default Facebook