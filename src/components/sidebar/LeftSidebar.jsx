import createActiveTab from "../../zustand/createActiveTab";
import FrequencyFilters from "./FrequencyFilters"
import LeftSideFilters from "./LeftSideFilters"
// import AdSenseComponent from "../google/AdSenseComponent";

const LeftSidebar = () => {

    const { activeTab } = createActiveTab();

    return (
        <>
            <p className="font-semibold text-center pt-3">Filters</p>
            <div className="divider mt-0 mb-0" />
            <div className="px-2">
                <LeftSideFilters />
            </div>
            <div className="divider mt-5" />
            {/* <div> <AdSenseComponent adClient={'ca-pub-3338467565655011'} adSlot={'9491494907'} adFormat={'auto'} /> </div> */}

            {
                activeTab === 3 &&
                <>
                    <div className="max-sm:px-20 px-10">
                        <FrequencyFilters />
                    </div>
                    <div className="divider mt-3" />
                </>
            }

        </>
    )
}

export default LeftSidebar