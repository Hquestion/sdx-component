<template>
    <div 
        class="sdxv-monitor-info"
        v-loading="isLoading"
    >
        <div class="sdxv-monitor-info__select">
            <span>{{ t('view.task.SelectAnInstance') }}：</span>
            <el-select
                v-model="currentPod"
                size="small"
            >
                <el-option
                    v-for="pod in pods"
                    :key="pod.name"
                    :value="pod.name"
                    :label="pod.name"
                />
            </el-select>
        </div>
        <div class="sdxv-monitor-info__chart">
            <div
                class="sdxv-monitor-info__chart--item"
                ref="usedCpu"
            />
            <div
                class="sdxv-monitor-info__chart--item"
                ref="usedMem"
            />
            <div
                v-if="hasGpu"
                class="sdxv-monitor-info__chart--item"
                ref="usedGpu"
            />
            <div
                v-if="hasGpu"
                class="sdxv-monitor-info__chart--item"
                ref="usedGpuMem"
            />
        </div>
    </div>
</template>

<script>
import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';

import echarts from 'echarts';
import { dateFormatter, byteToMB } from '@sdx/utils/src/helper/transform';
import { getPodResourceStatus } from '@sdx/utils/src/api/system';
import locale from '@sdx/utils/src/mixins/locale';

const CHART_DEFAULT_OPTION = {
    // 监t图的基本配置
    title: {
        text: '', // 需要自己设置
        textStyle: {
            fontSize: 14,
            color: '#333'
        },
        left: '10px',
        top: '10px'
    },
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
        link: { xAxisIndex: 'all' },
        label: {
            show: true,
            backgroundColor: '#777'
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
            label: {
                show: true,
                backgroundColor: '#777'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#C4C6CF'
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#606266',
            rotate: 10,
            margin: 40,
            align: 'center'
        },
        data: [] // 需要自己设置
    },
    yAxis: {
        name: '', // 需要自己设置
        scale: false,
        type: 'value',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#606266',
            align: 'right'
        },
        splitLine: {
            show: false
        }
    },
    series: [] // 需要自己设置
};

const POLLING_PERIOD = 3 * 1000;

export default {
    name: 'SdxvMonitorInfo',
    mixins: [locale],
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    },
    props: {
        pods: {
            type: Array,
            default: () => []
        },
        polling: {  // 轮询
            type: Boolean,
            default: true
        },
        hasGpu: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentPod: this.pods[0].name,
            chartInstance: {
                // chart实例的挂载点
                usedCpu: null,
                usedMem: null,
                usedGpu: null,
                usedGpuMem: null
            },
            isLoading: false,
            statList: [],
            pollingId: null
        };
    },
    computed: {
        needPolling() {
            return this.polling && !!this.statList.length;
        }
    },
    methods: {
        /** 获图表数据 */
        fetchData(showLoading = true) {
            const params = {
                timeRange: '15m',
                metricInterval: '3s'
            };
            if (showLoading) {
                this.isLoading = true;
            }
            getPodResourceStatus(this.currentPod, params).then(data => {
                this.statList = data.stats;
                this.processData();
                this.isLoading = false;
            }).catch(() => {
                this.statList = [];
                this.processData();
                this.isLoading = false;
            });
        },
        /** 将获取的数据处理成 chart 需要的形式 */
        processData() {
            this.xAxisData = this.statList.map(item => dateFormatter(new Date(+item.timestamp * 1000)));
            // 整理 cpu 使用
            this.usedCpuSeriesData = [
                {
                    name: this.t('view.task.CPUUsageRate'),
                    type: 'line',
                    itemStyle: {
                        color: '#4781F8',
                        borderWidth: 2
                    },
                    data: this.statList.map(item =>
                        (parseFloat(item.cpu) * 100).toFixed(2)
                    )
                }
            ];
            // 整理 mem 使用
            this.usedMemSeriesData = [
                {
                    name: this.t('view.task.MemoryUsage'),
                    type: 'line',
                    itemStyle: {
                        color: '#9E5BF8',
                        borderWidth: 2
                    },
                    data: this.statList.map(item =>
                        parseFloat(byteToMB(item.memory))
                    )
                }
            ];
            if (this.hasGpu) {
                // 整理 gpu 使用
                this.usedGpuSeriesData = [
                    {
                        name: this.t('view.task.GPUUsageRate'),
                        type: 'line',
                        itemStyle: {
                            color: '#4781F8',
                            borderWidth: 2
                        },
                        data: this.statList.map(item =>
                            (parseFloat(item.gpu) * 100).toFixed(2)
                        )
                    }
                ];
                // 整理 gpuMem 使用
                this.usedGpuMemSeriesData = [
                    {
                        name: this.t('view.task.GPUMemoryUsage'),
                        type: 'line',
                        itemStyle: {
                            color: '#9E5BF8',
                            borderWidth: 2
                        },
                        data: this.statList.map(item =>
                            parseFloat(byteToMB(item.gpuMemory))
                        )
                    }
                ];
            }

            // 渲染图表
            this.$nextTick().then(() => {
                this.renderChart();
            });
        },
        renderChart() {
            this.renderChartByName('usedCpu');
            this.renderChartByName('usedMem');
            if (this.hasGpu) {
                this.renderChartByName('usedGpu');
                this.renderChartByName('usedGpuMem');
            }
        },
        renderChartByName(name) {
            if (this.chartInstance[name]) {
                this.chartInstance[name].dispose();
                this.chartInstance[name] = null;
            }
            this.chartInstance[name] = echarts.init(this.$refs[name]);
            this.chartInstance[name].setOption({
                ...this.getOptionsByName(name),
                series: this[`${name}SeriesData`],
                animation: false
            });
        },
        getOptionsByName(name) {
            let text = '';
            let yAxisName = '';
            // let data = this[`${name}SeriesData`];
            switch (name) {
            case 'usedCpu':
                text = this.t('view.task.CPUUsageRate');
                yAxisName = '(%)';
                break;
            case 'usedMem':
                text = this.t('view.task.MemoryUsage');
                yAxisName = '(MB)';
                break;
            case 'usedGpu':
                text = this.t('view.task.GPUUsageRate');
                yAxisName = '(%)';
                break;
            case 'usedGpuMem':
                text = this.t('view.task.GPUMemoryUsage');
                yAxisName = '(MB)';
            }
            return {
                ...CHART_DEFAULT_OPTION,
                title: {
                    ...CHART_DEFAULT_OPTION.title,
                    text: text
                },
                // legend: {
                //     data: data.map(item => item.name)
                // },
                xAxis: {
                    ...CHART_DEFAULT_OPTION.xAxis,
                    data: this.xAxisData
                },
                yAxis: {
                    ...CHART_DEFAULT_OPTION.yAxis,
                    name: yAxisName
                }
            };
        },
        handleWindowResize() {
            window.onresize = () => {
                this.resizeCharts();
            };
        },
        resizeCharts() {
            for (let inst in this.chartInstance) {
                if (this.chartInstance[inst]) {
                    this.chartInstance[inst].resize();
                }
            }
        },
        startPolling() {
            this.pollingId && clearInterval(this.pollingId);
            this.pollingId = setInterval(() => {
                this.fetchData(false);
            }, POLLING_PERIOD);
        },
        stopPolling() {
            this.pollingId && clearInterval(this.pollingId);
            this.pollingId = null;
        }
    },
    created() {
        this.fetchData();
        this.handleWindowResize();
    },
    beforeDestroy() {
        this.stopPolling();
    },
    watch: {
        currentPod() {
            this.fetchData();
        },
        needPolling(nval) {
            if (nval) {
                this.startPolling();
            } else {
                this.stopPolling();
            }
        }
    }
};
</script>

<style>

</style>
