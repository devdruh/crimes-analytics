import LeftSideFilters from "./LeftSideFilters"
// import AdSenseComponent from "../google/AdSenseComponent";

const LeftSidebar = () => {

    return (
        <>
            <p className="font-semibold text-center pt-3">Filters</p>
            <div className="divider mt-0 mb-0" />
            <div className="px-2">
                <LeftSideFilters />
            </div>
            <div className="divider mt-5" />
            {/* <div> <AdSenseComponent adClient={'ca-pub-3338467565655011'} adSlot={'9491494907'} adFormat={'auto'} /> </div> */}
        </>
    )
}

export default LeftSidebar