/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import { formatDivisionChartData, formatDrilldownData } from '../../utils/formatters';
import { queryByDivision, queryDrillDownDivisionData, querySumArrestedChargedPersons } from '../../utils/layers';
import { viewClosePopup } from '../../utils/views';
import { CHART_NOTE_CAPTION } from '../../utils/constants';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsDrilldown(Highcharts);
}

const chartOptions = {
    chart: {
        type: 'bar',
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
        labels: {
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
            },
        },
        minPadding: 1
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
        // gridLineWidth: 0
    },
    loading: {
        labelStyle: {
            color: 'var(--fallback-bc,oklch(var(--p)))',
            fontWeight: 'bold',
            fontSize: '20px',
            align: 'center',
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

const DivisionHighCharts = ({ items }) => {

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

        const formattedSeries = formatDivisionChartData(items);
        const chartTitle = 'Crimes occurred by Division';

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
                                tab: 2,
                                name: event.point.name,
                                year: event.point.drilldown.substring(event.point.drilldown.length - 4),
                                isUndefined: false,
                            };
                            queryByDivision(params);

                            const chart = this;

                            try {

                                chart.showLoading('Loading ...');

                                // Fetch drilldown data
                                const drilldownSeriesData = await queryDrillDownDivisionData(event);
                                const drillDownData = formatDrilldownData(drilldownSeriesData);

                                // arrested drilldown
                                const getTotalArrested = await querySumArrestedChargedPersons(params)
                                let totalArrested = 0;
                                if (getTotalArrested.features.length > 0 && getTotalArrested.features[0].attributes.TOTAL_ARRESTED !== null) {
                                    totalArrested = getTotalArrested.features[0].attributes.TOTAL_ARRESTED
                                }

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
                                    chart.setTitle({ text: 'Crimes occurred by Neighbourhoods in Division' });
                                    chart.setCaption({
                                        text: totalArrested !== 0 ? `👮🚔🚨 There are a total of <b>${Highcharts.numberFormat(event.point.y, 0, '', ',')}</b> crimes and <b>${Highcharts.numberFormat(totalArrested, 0, '', ',')}</b> persons arrested in ${event.point.name === 'NSA' ? 'a Not Specified Area' : 'this division'}` : '',
                                        verticalAlign: 'bottom',
                                        align: 'center',
                                    });
                                    // chart.setSize(undefined, 400, undefined);
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
                        chart.setCaption({ text: CHART_NOTE_CAPTION, align: 'left' });

                        // close popup on change tab
                        viewClosePopup();

                        // update layer based on selected year
                        const params = { isUndefined: true, year: selectedYear };
                        queryByDivision(params);
                    }
                }
            },
        }));

    }, [selectedYear, items]);

    return (
        <div id="barContainer">
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

export default DivisionHighCharts