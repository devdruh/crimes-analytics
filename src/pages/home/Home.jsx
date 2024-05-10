import MapContainer from "../../components/map/MapContainer"
import LeftSidebar from "../../components/sidebar/LeftSidebar"
// import DivisionContent from "../../components/tab/DivisionContent"
import FrequencyContent from "../../components/tab/FrequencyContent"
import AnalysisContent from "../../components/tab/AnalysisContent"
import TabContainer from "../../components/tab/TabContainer"

const Home = () => {
    const tabItems = [
        {
            id: 1,
            title: 'Analysis',
            content: <AnalysisContent />,
        },
        // {
        //     id: 2,
        //     title: 'Division',
        //     content: <DivisionContent />,
        // },
        {
            id: 3,
            title: 'Frequency',
            content: <FrequencyContent />,
        }
    ];

    return (
        <div className="flex max-sm:flex-col gap-2">
            <div className="w-1/5 md:only:w-1/4 max-sm:w-full">
                <LeftSidebar />
            </div>
            <div className="w-4/5 md:only:w-3/4 max-sm:w-full">
                <TabContainer items={tabItems} />
                <MapContainer />
            </div>
        </div>
    )
}

export default Home