import { Outlet, useMatches } from "react-router-dom"
import { useEffect } from "react"
import { APP_NAME } from "../utils/constants"
import Navbar from '../components/navbar/Navbar'

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
        }
    }, [title])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout