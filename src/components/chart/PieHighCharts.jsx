import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import useThemeSelector from '../../zustand/useThemeSelector';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import { useEffect, useState } from 'react';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}
// eslint-disable-next-line react/prop-types
const PieHighCharts = ({ items }) => {

    const { isDark } = useThemeSelector();

    const pieOptions = {
        accessibility: {
            enabled: false,
        },
        chart: {
            type: 'pie',
            // width: 500,
            backgroundColor: 'var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))',
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Crimes occurred by Category',
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.9))'
            }
        },
        subtitle: {
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
            }
        },
        navigation: {
            buttonOptions: {
                theme: {
                    fill: 'transparent',
                    states: {
                        hover: {
                            fill: 'transparent',
                        },
                        select: {
                            fill: 'var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))'
                        }
                    }
                },
                symbolStroke: 'var(--fallback-bc,oklch(var(--bc)/0.8))'
            },
            menuStyle: {
                background: 'var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))',
                boxShadow: 'none',
                border: '1px solid var(--fallback-bc,oklch(var(--bc)/0.1))'

            },
            menuItemStyle: {
                // borderLeft: '2px solid #2caffe',
                // borderRadius: 0,
                color: 'var(--fallback-bc,oklch(var(--bc)))',
            },
            menuItemHoverStyle: {
                background: 'var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))',
            }
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 200,
                            width: null,
                        },
                        title: {
                            style: {
                                fontSize: 'small'
                            }
                        },
                        subtitle: {
                            style: {
                                fontSize: 'x-small'
                            }
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: true,
                                    style: {
                                        fontSize: '0.5em',
                                    }
                                }
                            },
                            series: {
                                dataLabels: [
                                    {
                                        enabled: true,
                                        distance: 10,
                                    },
                                    {
                                        enabled: true,
                                        distance: -20,
                                        format: '{point.percentage:.1f}%',
                                        style: {
                                            // fontSize: '1.2em',
                                            textOutline: 'none',
                                            opacity: 0.7,
                                            color: 'contrast',
                                        },
                                        filter: {
                                            operator: '>',
                                            property: 'percentage',
                                            value: 10
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    padding: 5,
                    connectorPadding: 0,
                    style: {
                        textOutline: 'none',
                        color: 'var(--fallback-bc,oklch(var(--bc)/0.8))'
                    }
                }
            },
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20
                    },
                    {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7,
                            color: 'contrast',
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }
                ]
            }
        },
        tooltip: {
            backgroundColor: 'var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))',
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)))'
            }
        },
        series: [{
            name: 'Total',
            colorByPoint: true,
            data: []
        }]
    }

    const [options, setOptions] = useState(pieOptions);
    const { selectedYear, selectedMonth, selectedDay } = createLeftSideFilter();

    useEffect(() => {

        const colorGreen = ['#1c6e67', '#26938a', '#2fb8ac', '#59c6bd', '#82d4cd', '#ace3de', '#d5f1ee'];
        const colorYellow = ['#664b07', '#99710a', '#cc960e', '#ffbc11', '#ffc941', '#ffd770', '#ffe4a0'];

        setOptions((data) => ({
            ...data,
            series: [
                {
                    ...data.series[0],
                    data: items,
                }
            ]
        }));

        if (selectedMonth === '') {
            setOptions((data) => ({
                ...data,
                subtitle: {
                    text: 'Date: ' + selectedYear,
                }
            }));
        }

        if (selectedMonth !== '') {
            setOptions((data) => ({
                ...data,
                subtitle: {
                    text: 'Date: ' + selectedMonth + ', ' + selectedYear
                }
            }));
        }

        if (selectedDay !== '') {
            setOptions((data) => ({
                ...data,
                subtitle: {
                    text: 'Date: ' + selectedMonth + ' ' + selectedDay + ', ' + selectedYear
                }
            }))
        }

        if (isDark) {
            setOptions((data) => ({
                ...data,
                plotOptions: {
                    ...data.plotOptions,
                    pie: {
                        ...data.plotOptions.pie,
                        colors: colorGreen,
                    },
                }
            }));
        } else {
            setOptions((data) => ({
                ...data,
                plotOptions: {
                    ...data.plotOptions,
                    pie: {
                        ...data.plotOptions.pie,
                        colors: colorYellow,
                    },
                }
            }));
        }

    }, [selectedYear, selectedMonth, selectedDay, items, isDark]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default PieHighCharts