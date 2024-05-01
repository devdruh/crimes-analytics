import Home from "../pages/home/Home"
import Layout from "../layout/Layout"
import { createBrowserRouter, json } from "react-router-dom"
import { RootBoundary } from "../pages/error/RootBoundary"
import { getDaysArray, getMonthsArray, getYearRange } from "../utils/formatters"

const months = getMonthsArray();
const today = new Date();
const currentYear = today.getFullYear();
const years = getYearRange(2014, currentYear);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <RootBoundary />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
                    {
                        path: 'filter',
                        element: null,
                        children: [
                            {
                                path: ':year',
                                element: null,
                                loader: async ({ params }) => {

                                    const isYearValid = years.includes(parseInt(params.year));
                                    if (!isYearValid) {
                                        throw json({ data: years, }, { status: 404, statusText: "Invalid year!" });
                                    }
                                    return params.year
                                }
                            },
                            {
                                path: ':year/:month',
                                element: null,
                                loader: async ({ params }) => {

                                    const isYearValid = years.includes(parseInt(params.year));
                                    if (!isYearValid) {
                                        throw json({ data: years, }, { status: 404, statusText: "Invalid year!" });
                                    }

                                    const isMonthValid = months.some((i) => i.label === params.month);
                                    if (!isMonthValid) {
                                        throw json({ data: months, }, { status: 404, statusText: "Invalid month!" });
                                    }
                                    return params.month
                                }

                            },
                            {
                                path: ':year/:month/:day',
                                element: null,
                                loader: async ({ params }) => {

                                    const isYearValid = years.includes(parseInt(params.year));
                                    if (!isYearValid) {
                                        throw json({ data: years, }, { status: 404, statusText: "Invalid year!" });
                                    }

                                    const isMonthValid = months.some((i) => i.label === params.month);
                                    if (!isMonthValid) {
                                        throw json({ data: months, }, { status: 404, statusText: "Invalid month!" });
                                    }

                                    const findMonthValue = months.find(month => month.label === params.month);
                                    const days = getDaysArray(parseInt(params.year), parseInt(findMonthValue?.value));
                                    const isDayValid = days.some((i) => i.value === parseInt(params.day));
                                    if (!isDayValid) {
                                        throw json({ data: days, }, { status: 404, statusText: "Invalid day!" });
                                    }

                                    return params.day
                                }
                            }
                        ]
                    }
                ]
            },
        ]
    }
]);