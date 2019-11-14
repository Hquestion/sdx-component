const CHART_DEFAULT_OPTION = {
    // 监t图的基本配置
    // title: {
    //     text: '', // 需要自己设置
    //     textStyle: {
    //         fontSize: 14,
    //         color: '#333'
    //     },
    //     left: '10px',
    //     top: '10px'
    // },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        extraCssText: 'width: 200px',
        formatter: null // 需要自己设置
    },
    // legend: {
    //     data: [] // 需要自己设置
    // },
    grid: {
        left: '70px',
        right: '70px'
    },
    axisPointer: {
        link: { xAxisIndex: 'all' }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
            label: {
                show: false,
                backgroundColor: '#777'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#A8B1C3'
            }
        },
        axisTick: {
            show: true,
            inside: true
        },
        axisLabel: {
            color: '#6B778C',
            // rotate: 10,
            margin: 16,
            align: 'center',
            lineHeight: 20,
            formatter: function (value) {
                let dateInfoList = value.split(' ');
                return dateInfoList.join('\n');
            }
        },
        data: [] // 需要自己设置
    },
    yAxis: {
        name: '', // 需要自己设置
        scale: false,
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#A8B1C3'
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: '#A8B1C3',
                type: 'dashed'
            }
        },
        axisLabel: {
            color: '#6B778C',
            align: 'right'
        }
    },
    series: [] // 需要自己设置
};
export default CHART_DEFAULT_OPTION;