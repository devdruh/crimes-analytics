import { useParams } from "react-router-dom";
import createActiveTab from "../../zustand/createActiveTab";

// eslint-disable-next-line react/prop-types
const MapView = ({ appRef, mapRef }) => {

    const { month } = useParams();
    const { activeTab } = createActiveTab();

    return (
        <div id="app-map-container" className="app-map-container" ref={appRef}>
            <div className={`${month !== undefined && activeTab === 1 ? 'map-container-slider' : `${activeTab === 3 ? 'map-container-frequency ease-out' : 'map-container ease-out'}`}`}>
                <div id="viewDiv" ref={mapRef}></div>
            </div>
        </div>
    )
}

export default MapView