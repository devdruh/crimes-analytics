/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import { formatNeighbourhoodChartData } from '../../utils/formatters';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsDrilldown(Highcharts);
}

const chartOptions = {
    chart: {
        type: 'bar',
        height: 2500,
        spacingLeft: 20,
        scrollablePlotArea: {
            minWidth: 600, // Minimum width before scrolling is enabled
            scrollPositionX: 1 // Initially scroll to the end of the chart
        },
        backgroundColor: 'var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))',
        events: {
            render: function () {
                var chart = this;

                var visibleSeries = chart.series
                    .filter(series => series.visible)
                    .map(series => series.userOptions.id);

                var title;
                if (visibleSeries.length > 1) {
                    title = visibleSeries.join(', ');
                } else {
                    if (visibleSeries[0]) {
                        title = visibleSeries[0].substring(0, visibleSeries[0].length - 4) + ' ' + visibleSeries[0].substring(visibleSeries[0].length - 4);
                    }
                }

                if (visibleSeries.length > 0) {
                    chart.setTitle(null, { text: 'Date: ' + title }, false);
                } else {
                    chart.setTitle(null, { text: null }, false);
                }
            }
        }
    },
    title: {
        text: '',
        style: {
            color: 'var(--fallback-bc,oklch(var(--bc)/0.9))'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
        }
    },
    xAxis: {
        type: 'category',
        title: {
            text: null
        },
        // gridLineWidth: 1,
        lineWidth: 0,
        labels: {
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
            },
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: null
        },
        labels: {
            format: '{value}',
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
            }
        },
        gridLineColor: 'var(--fallback-bc,oklch(var(--bc)/0.3))',
        gridLineWidth: 0
    },
    loading: {
        labelStyle: {
            color: 'var(--fallback-bc,oklch(var(--p)))', // Text color of the loading message
            fontWeight: 'bold', // Font weight of the loading message
            fontSize: '20px', // Size of the loading message
        },
        style: {
            backgroundColor: 'var(--fallback-b3,oklch(var(--b3)))' // Background color of the loading screen
        },
    },
    tooltip: {
        backgroundColor: 'var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))',
        style: {
            color: 'var(--fallback-bc,oklch(var(--bc)))'
        },
    },
    plotOptions: {
        bar: {
            // borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        itemStyle: {
            color: 'var(--fallback-bc,oklch(var(--bc)/0.8))',
        },
        itemHoverStyle: {
            color: 'var(--fallback-bc,oklch(var(--bc)))',
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
    credits: {
        enabled: false
    },
    accessibility: {
        enabled: false,
    },
    drilldown: {
        activeAxisLabelStyle: {
            textDecoration: 'none',
            color: 'var(--fallback-bc,oklch(var(--bc)))',
        },
        activeDataLabelStyle: {
            textDecoration: 'none',
            color: 'var(--fallback-bc,oklch(var(--bc)))',
        },
        breadcrumbs: {
            position: {
                align: 'right'
            },
            buttonTheme: {
                style: {
                    color: 'var(--fallback-bc,oklch(var(--bc)))',
                },
                states: {
                    hover: {
                        fill: 'transparent',
                    },
                }
            },
        },
        series: [],
    },
    series: []
}

const NeighbourhoodHighCharts = ({ items }) => {

    const { selectedYear } = createLeftSideFilter();
    const [options, setOptions] = useState(chartOptions);
    const chartRef = useRef(null);

    useEffect(() => {

        const formattedSeries = formatNeighbourhoodChartData(items);
        const chartTitle = 'Crimes occurred by Neighbourhood';

        setOptions((data) => ({
            ...data,
            title: {
                ...data.title,
                text: chartTitle
            },
            subtitle: {
                ...data.subtitle,
                text: 'Date: ' + selectedYear
            },
            xAxis: {
                ...data.xAxis,
                labels: {
                    ...data.xAxis.labels,
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            series: formattedSeries,
        }));

    }, [selectedYear, items]);

    return (
        <div id="barContainer" className='h-[400px] overflow-y-scroll'>
            {
                options.series.length > 0 &&
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartRef}
                />
            }
        </div>
    )
}

export default NeighbourhoodHighCharts