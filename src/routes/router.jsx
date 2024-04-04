import Home from "../pages/home/Home"
import NotFound from "../pages/error/NotFound"
import Layout from "../layout/Layout"
// import Root from "./root"

import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout/>,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Home/>,
        }
      ]
    }
  ]
)

export { router }