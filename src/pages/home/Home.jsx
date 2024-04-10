import MapContainer from "../../components/map/MapContainer"
import LeftSidebar from "../../components/sidebar/LeftSidebar"
import StatsContainer from "../../components/stats/StatsContainer"

const Home = () => {
  return (
    <div className="flex max-sm:flex-col gap-2">
      <div className="w-1/5 md:only:w-1/4 max-sm:w-full">
        <LeftSidebar />
      </div>
      <div className="w-4/5 md:only:w-3/4 max-sm:w-full">
        <StatsContainer />
        <MapContainer />
      </div>
    </div>
  )
}

export default Home