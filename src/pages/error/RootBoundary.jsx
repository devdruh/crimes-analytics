import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const RootBoundary = () => {

    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <div className="flex flex-col items-center justify-center h-60 gap-5">
                    <div>
                        {error.statusText || error.message}
                    </div>
                    <div>
                        {
                            error.statusText === 'Invalid year!' && (
                                <>
                                    <span>Possible value : </span>
                                    <div className="flex gap-2">
                                        {
                                            error.data.data.map((data, i) => (
                                                <div key={i}>
                                                    {data}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                        {
                            error.statusText === 'Invalid month!' && (
                                <>
                                    <span>Possible value : </span>
                                    <div className="flex gap-2">
                                        {
                                            error.data.data.map((data, i) => (
                                                <div key={i}>
                                                    {data.label}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                        {
                            error.statusText === 'Invalid day!' && (
                                <>
                                    <span>Possible value : </span>
                                    <div className="flex gap-2">
                                        {
                                            error.data.data.map((data, i) => (
                                                <div key={i}>
                                                    {data.label}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            )
        }

        if (error.status === 401) {
            return (
                <div className='p-4 h-screen flex items-center justify-center'>
                    {error.statusText || error.message}
                </div>
                // <div>You arent authorized to see this</div>
            )
        }

        if (error.status === 503) {
            return <div>Looks like our API is down</div>;
        }

        if (error.status === 418) {
            return <div>🫖</div>;
        }
    }

    return <div className='p-4 h-screen flex items-center justify-center'>Something went wrong</div>;
}
