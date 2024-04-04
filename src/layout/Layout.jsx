import { Outlet } from "react-router-dom"
import Navbar from '../components/navbar/Navbar'
// import LeftSidebar from "../components/sidebar/LeftSidebar"

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <LeftSidebar /> */}
      <Outlet />
    </>
  )
}

export default Layout