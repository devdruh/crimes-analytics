/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import { useEffect, useState } from 'react';
import { formatFrequencyChartData } from '../../utils/formatters';
import createSelectedFrequency from '../../zustand/createSelectedFrequency';
import { DAYS_OF_THE_WEEK_SHORT, MONTHS_OF_THE_YEAR_SHORT } from '../../utils/constants';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const FrequencyHighCharts = ({ items }) => {

    const chartOptions = {
        chart: {
            type: 'spline',
            backgroundColor: 'var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))',
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
            categories: [],
            accessibility: {
                description: 'Months of the year'
            },
            labels: {
                style: {
                    color: 'var(--fallback-bc,oklch(var(--bc)/0.6))'
                }
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
        tooltip: {
            crosshairs: true,
            shared: true,
            backgroundColor: 'var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))',
            style: {
                color: 'var(--fallback-bc,oklch(var(--bc)))'
            },
            format: '<span style="font-size: 1em">Day {key}</span><br/>' +
                '{#each points}' +
                '<span style="color:{color}">\u25CF</span> ' +
                '{series.name}: <b>{y}</b><br/>' +
                '{/each}',
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    // lineColor: '#fff',
                    lineWidth: 1
                },
            }
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
        series: [],
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
    };

    const [options, setOptions] = useState(chartOptions);
    const { selectedYear } = createLeftSideFilter();
    const { selectedFrequency } = createSelectedFrequency();

    useEffect(() => {

        const frequencyHighLow = formatFrequencyChartData(items);
        setOptions((data) => ({
            ...data,
            series: frequencyHighLow
        }));

        if (selectedFrequency === 1) {
            const DAYS_OF_THE_MONTH = [...Array(31).keys().map((i) => i + 1)];
            setOptions((data) => ({
                ...data,
                title: {
                    text: 'Reported Crimes by Day'
                },
                subtitle: {
                    text: 'Date: ' + selectedYear
                },
                xAxis: {
                    categories: DAYS_OF_THE_MONTH
                }
            }));

        } else if (selectedFrequency === 2) {
            setOptions((data) => ({
                ...data,
                title: {
                    text: 'Reported Crimes by Day of week'
                },
                subtitle: {
                    text: 'Date: ' + selectedYear
                },
                xAxis: {
                    categories: DAYS_OF_THE_WEEK_SHORT
                }
            }));


        } else if (selectedFrequency === 3) {
            setOptions((data) => ({
                ...data,
                title: {
                    text: 'Reported Crimes by Month'
                },
                subtitle: {
                    text: 'Date: ' + selectedYear
                },
                xAxis: {
                    categories: MONTHS_OF_THE_YEAR_SHORT
                }
            }));
        }

    }, [items, selectedFrequency, selectedYear]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default FrequencyHighCharts