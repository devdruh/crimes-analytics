import MapContainer from "../../components/map/MapContainer"
import LeftSidebar from "../../components/sidebar/LeftSidebar"

const Home = () => {
  return (
    <div className="flex flex-row w-full gap-2">
      <div className="basis-1/6">
        <LeftSidebar />
      </div>
      <div className="basis-10/12">
        <MapContainer />
      </div>
    </div>
  )
}

export default Home