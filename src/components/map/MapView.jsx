import createLeftSideFilter from "../../zustand/createLeftSideFilter"

// eslint-disable-next-line react/prop-types
const MapView = ({ appRef, mapRef }) => {

    const { selectedMonth } = createLeftSideFilter();

    return (
        <div id="app-map-container" className="app-map-container" ref={appRef}>
            <div className={`${selectedMonth !== '' ? 'map-container-slider' : 'map-container ease-out duration-300'}`}>
                <div id="viewDiv" ref={mapRef}></div>
            </div>
        </div>
    )
}

export default MapView

// < div id = "app-map-container" className = "app-map-container" ref = { appRef } >
//     <div className="map-container">
//         <div id="viewDiv" ref={mapRef}>

//             {
//                 // loading && (
//                 //     <div className="flex absolute justify-end right-2 translate-y-1/2">
//                 //         <span id="map-loading" className="esri-widget loading loading-ring loading-lg"></span>
//                 //     </div>
//                 // )
//             }
//         </div>

//         {
//             // isMapLoading ? <span id="map-loading" className="esri-widget map-loading loading loading-ring loading-lg"></span> : ''
//             // <div className="flex justify-end right-2 top-1/2">
//             //     <span id="map-loading" className="esri-widget loading loading-ring loading-lg"></span>
//             // </div>
//         }


//     </div>
// </div >