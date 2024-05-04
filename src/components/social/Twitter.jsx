import TwitterTimeline from "./TwitterTimeline";

const Twitter = () => {

    return (
        <div className="flex justify-evenly gap-5 px-5">
            <div className="flex-auto pb-5 basis-1/2">
                <TwitterTimeline username={'TorontoPolice'} />
            </div>
            <div className="flex-auto pb-5 basis-1/2">
                <TwitterTimeline username={'TPSOperations'} />
            </div>
        </div>
    )
}

export default Twitter