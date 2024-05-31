/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import createSelectedFrequency from '../../zustand/createSelectedFrequency';
import createActiveTab from '../../zustand/createActiveTab';
import { viewClosePopup } from '../../utils/views';
import { formatDrilldownData, formatDrilldownHoursData, formatFrequencyChartData } from '../../utils/formatters';
import { queryByFreq, queryDrillDownDayData, queryDrillDownMonthData, queryDrillDownWeekData } from '../../utils/layers';
import { CHART_NOTE_CAPTION } from '../../utils/constants';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsDrilldown(Highcharts);
}

const chartOptions = {
    chart: {
        type: 'column',
        // type: 'spline',
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
    caption: {
        text: '',
    },
    xAxis: {
        type: 'category',
        // accessibility: {
        //     description: 'Months of the year'
        // },
        labels: {
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
            },
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            format: '{value}',
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
            }
        },
        gridLineColor: 'var(--fallback-bc,oklch(var(--bc)/0.3))'
    },
    loading: {
        labelStyle: {
            color: 'var(--fallback-bc,oklch(var(--p)))', // Text color of the loading message
            fontWeight: 'bold', // Font weight of the loading message
            fontSize: '20px' // Size of the loading message
        },
        style: {
            backgroundColor: 'var(--fallback-b3,oklch(var(--b3)))' // Background color of the loading screen
        },
    },
    // plotOptions: {
    //     spline: {
    //         marker: {
    //             radius: 4,
    //             // lineColor: '#fff',
    //             lineWidth: 1
    //         },
    //     },
    // },
    series: [],
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
            showFullPath: false
        },
        series: [],
    },
    tooltip: {
        crosshairs: true,
        shared: true,
        backgroundColor: 'var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))',
        style: {
            color: 'var(--fallback-bc,oklch(var(--bc)))'
        },
        format: '<span style="font-size: 1em"> {key}</span><br/>' +
            '{#each points}' +
            '<span style="color:{color}">\u25CF</span> ' +
            '{series.name}: <b>{y}</b><br/>' +
            '{/each}',
    },
    legend: {
        symbolWidth: 30,
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
};

const FrequencyHighCharts = ({ items }) => {

    const { selectedYear } = createLeftSideFilter();
    const { selectedFrequency } = createSelectedFrequency();
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

        const frequencyHighLow = formatFrequencyChartData(items);

        if (selectedFrequency === 1) {

            const chartTitle = 'Crimes occurred by Day';
            setOptions((data) => ({
                ...data,
                title: {
                    text: chartTitle
                },
                subtitle: {
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
                caption: {
                    ...data.caption,
                    text: CHART_NOTE_CAPTION,
                },
                series: frequencyHighLow,
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
                                    frequency: selectedFrequency,
                                    isUndefined: false,
                                };
                                queryByFreq(params);

                                const chart = this;

                                try {

                                    chart.showLoading('Loading ...');

                                    // Fetch drilldown data
                                    const drilldownSeriesData = await queryDrillDownDayData(event);
                                    const drillDownData = formatDrilldownHoursData(drilldownSeriesData);

                                    // Prepare new drilldown series
                                    const series = {
                                        name: event.point.name,
                                        id: event.point.drilldown,
                                        data: drillDownData
                                    };

                                    // Add new series as drilldown after a delay
                                    const timeId = setTimeout(() => {
                                        chart.setTitle({ text: 'Crimes occurred by hours on day ' + event.point.name });
                                        chart.setCaption({ text: '' });
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

                            // close popup on change tab
                            viewClosePopup();

                            // update layer based on selected year
                            const params = { isUndefined: true, year: selectedYear };
                            queryByFreq(params);
                        }
                    }
                },
            }));

        } else if (selectedFrequency === 2) {

            const chartTitle = 'Crimes occurred by day of week';
            setOptions((data) => ({
                ...data,
                title: {
                    text: chartTitle
                },
                subtitle: {
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
                            return this.value.substring(0, 3);
                        }
                    }
                },
                series: frequencyHighLow,
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
                                    frequency: selectedFrequency,
                                    isUndefined: false,
                                };
                                queryByFreq(params);

                                const chart = this;

                                try {

                                    chart.showLoading('Loading ...');

                                    // Fetch drilldown data
                                    const drilldownSeriesData = await queryDrillDownWeekData(event);
                                    const drillDownData = formatDrilldownHoursData(drilldownSeriesData);

                                    // Prepare new drilldown series
                                    const series = {
                                        name: event.point.name,
                                        id: event.point.drilldown,
                                        data: drillDownData
                                    };

                                    // Add new series as drilldown after a delay
                                    const timeId = setTimeout(() => {
                                        chart.update({
                                            xAxis: {
                                                labels: {
                                                    formatter: function () {
                                                        return this.value;
                                                    }
                                                }
                                            }
                                        });
                                        chart.setTitle({ text: 'Crimes occurred by hours on ' + event.point.name });
                                        chart.setCaption({ text: '' });
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
                            chart.update({
                                xAxis: {
                                    labels: {
                                        formatter: function () {
                                            return this.value.substring(0, 3);
                                        }
                                    }
                                }
                            });

                            // close popup on change tab
                            viewClosePopup();

                            // update layer based on selected year
                            const params = { isUndefined: true, year: selectedYear };
                            queryByFreq(params);
                        }
                    }
                },
            }));

        } else if (selectedFrequency === 3) {

            const chartTitle = 'Crimes occurred by Month';
            setOptions((data) => ({
                ...data,
                title: {
                    text: chartTitle
                },
                subtitle: {
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
                            return this.value.substring(0, 3);
                        }
                    }
                },
                series: frequencyHighLow,
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
                                    frequency: selectedFrequency,
                                    isUndefined: false,
                                };
                                queryByFreq(params);

                                const chart = this;

                                try {

                                    chart.showLoading('Loading ...');

                                    // Fetch drilldown data
                                    const drilldownSeriesData = await queryDrillDownMonthData(event);
                                    const drillDownData = formatDrilldownData(drilldownSeriesData);

                                    // Prepare new drilldown series
                                    const series = {
                                        name: event.point.name,
                                        id: event.point.drilldown,
                                        data: drillDownData
                                    };

                                    // Add new series as drilldown after a delay
                                    const timeId = setTimeout(() => {
                                        chart.setTitle({ text: 'Crimes occurred by days in ' + event.point.name });
                                        chart.setCaption({ text: '' });
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

                            // close popup on change tab
                            viewClosePopup();

                            // update layer based on selected year
                            const params = { isUndefined: true, year: selectedYear };
                            queryByFreq(params);
                        }
                    }
                }
            }));
        }

    }, [items, selectedFrequency, selectedYear]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
        />
    )
}

export default FrequencyHighCharts