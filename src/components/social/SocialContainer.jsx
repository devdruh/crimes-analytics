import { Suspense, lazy } from "react"
import LoadingSpinner from "../loading/LoadingSpinner"

const Facebook = lazy(() => import('./Facebook'));
const TikTok = lazy(() => import('./TikTok'));
const Twitter = lazy(() => import('./Twitter'));

const SocialContainer = () => {

    return (
        <div className="flex flex-col">
            <Suspense fallback={<LoadingSpinner />}>
                <section>
                    <Twitter />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
                <section>
                    <TikTok />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
                <section>
                    <Facebook />
                </section>
            </Suspense>
        </div>
    )

}

export default SocialContainer