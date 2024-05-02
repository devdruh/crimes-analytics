import { Outlet, useMatches } from "react-router-dom"
import { useEffect } from "react"
import { APP_NAME } from "../utils/constants"
import Navbar from '../components/navbar/Navbar'
import Footer from "../components/footer/Footer"

const Layout = () => {

    const matches = useMatches();
    const { params } = matches[matches.length - 1];

    let title = '';

    if (params?.year) {
        title = params.year;
    }

    if (params?.month) {
        title = params.month + ', ' + params.year;
    }

    if (params?.day) {
        title = params.month + ' ' + params.day + ', ' + params.year;
    }

    useEffect(() => {
        if (title !== '') {
            document.title = title + ' - ' + APP_NAME
        } else {
            document.title = APP_NAME
        }
    }, [title])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout