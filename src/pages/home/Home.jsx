import MapContainer from "../../components/map/MapContainer"
import LeftSidebar from "../../components/sidebar/LeftSidebar"

const Home = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="basis-1/6 max-sm:basis-full">
        <LeftSidebar />
      </div>
      <div className="basis-10/12 max-sm:basis-full">
        <MapContainer />
      </div>
    </div>
  )
}

export default Home