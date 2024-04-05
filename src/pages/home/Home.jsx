import MapContainer from "../../components/map/MapContainer"
import LeftSidebar from "../../components/sidebar/LeftSidebar"

const Home = () => {
  return (
    <div className="flex max-sm:flex-col gap-2">
      <div className="w-1/5 max-sm:w-full">
        <LeftSidebar />
      </div>
      <div className="w-4/5 max-sm:w-full">
        <MapContainer />
      </div>
    </div>
  )
}

export default Home