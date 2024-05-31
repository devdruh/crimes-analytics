/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import { formatDrilldownData, formatNeighbourhoodChartData } from '../../utils/formatters';
import { queryByNeighbourhood, queryDrillDownNeighbourhoodData } from '../../utils/layers';
import { viewClosePopup } from '../../utils/views';
import { CHART_NOTE_CAPTION } from '../../utils/constants';

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
                        title = visibleSeries[0].substring(visibleSeries[0].length - 4);
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
            color: 'var(--fallback-bc,oklch(var(--bc)/0.8))'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: 'var(--fallback-bc,oklch(var(--bc)/0.7))',
            marginBottom: '20px',
        },
    },
    caption: {
        text: '',
        verticalAlign: 'top'
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
            color: 'var(--fallback-bc,oklch(var(--p)))',
            fontWeight: 'bold',
            fontSize: '20px',
            top: '5%',
            align: 'center',
            verticalAlign: 'top'
        },
        style: {
            backgroundColor: 'var(--fallback-b3,oklch(var(--b3)))'
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
                enabled: true,
                style: {
                    textOutline: 'none'
                }
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
            fontWeight: 'normal',
            color: 'var(--fallback-bc,oklch(var(--bc)/0.8))',
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
            showFullPath: false
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

        if (chartRef.current) {
            setOptions((data) => ({
                ...data,
                drilldown: {
                    ...data.drilldown,
                    series: []
                },
                series: [],
            }));

            // drill up chart
            chartRef.current.chart.drilldown.drillUp();
        }

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
            caption: {
                ...data.caption,
                text: CHART_NOTE_CAPTION,
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
            chart: {
                ...data.chart,
                events: {
                    ...data.chart.events,
                    drilldown: async function (event) {
                        if (!event.seriesOptions) {

                            // close popup on change tab
                            viewClosePopup();

                            // update layer based on selected series
                            const params = {
                                name: event.point.name,
                                year: event.point.drilldown.substring(event.point.drilldown.length - 4),
                                isUndefined: false,
                            };
                            queryByNeighbourhood(params);

                            const chart = this;

                            try {

                                chart.showLoading('Loading ...');

                                // Fetch drilldown data
                                const drilldownSeriesData = await queryDrillDownNeighbourhoodData(event);
                                const drillDownData = formatDrilldownData(drilldownSeriesData);

                                // Prepare new drilldown series
                                const series = {
                                    name: event.point.name,
                                    id: event.point.drilldown,
                                    data: drillDownData,
                                    dataLabels: {
                                        enabled: true,
                                        color: 'var(--fallback-bc,oklch(var(--bc)))',
                                    },
                                };

                                // Add new series as drilldown after a delay
                                const timeId = setTimeout(() => {
                                    chart.setTitle({ text: 'Crimes occurred by Premises' });
                                    chart.setCaption({ text: '' });
                                    chart.setSize(null, 400, undefined);
                                    chart.addSeriesAsDrilldown(event.point, series);
                                }, 1000);

                                return () => { clearTimeout(timeId); };

                            } catch (error) {
                                console.log(error);
                            } finally {
                                setTimeout(() => {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }
                    },
                    drillup: function () {
                        const chart = this;
                        chart.setTitle({ text: chartTitle });
                        chart.setCaption({ text: CHART_NOTE_CAPTION });
                        chart.setSize(null, 2500, undefined);

                        // close popup on change tab
                        viewClosePopup();

                        // update layer based on selected year
                        const params = { isUndefined: true, year: selectedYear };
                        queryByNeighbourhood(params);
                    }
                }
            },
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