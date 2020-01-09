<template>
    <div 
        class="sdxv-monitor-info"
        v-loading="isLoading"
    >
        <SdxuArticlePanel
            :title="t('view.task.RealTimeMonitor')"
            class="sdxv-base-info-container__panel"
        >
            <div class="sdxv-monitor-info__content">
                <SdxuEmpty
                    v-if="isEmpty"
                    :empty-content="t('view.task.NoRealMonitor')"
                    empty-type="sdx-wushuju"
                />
                <template v-else>
                    <div class="sdxv-monitor-info__select">
                        <span>{{ t('view.task.Instance') }}：</span>
                        <el-select
                            v-if="pods.length > 1"
                            v-model="currentPod"
                            size="small"
                        >
                            <el-option
                                v-for="pod in pods"
                                :key="pod"
                                :value="pod"
                                :label="pod"
                            />
                        </el-select>
                        <span v-else>
                            {{ currentPod }}
                        </span>
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
                </template>
            </div>
        </SdxuArticlePanel>
    </div>
</template>

<script>
import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';

import echarts from 'echarts';
import { dateFormatter, byteToMB } from '@sdx/utils/src/helper/transform';
import { getPodResourceStatus } from '@sdx/utils/src/api/system';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuEmpty from '@sdx/ui/components/empty';
import SdxuArticlePanel from '@sdx/ui/components/article-panel';
import CHART_DEFAULT_OPTION from './MonitorConfig';

const POLLING_PERIOD = 15 * 1000;

export default {
    name: 'SdxvMonitorInfo',
    mixins: [locale],
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        SdxuArticlePanel,
        SdxuEmpty
    },
    props: {
        isEmpty: {
            type: Boolean,
            default: false
        },
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
            currentPod: this.pods[0] || '',
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
    methods: {
        /** 获图表数据 */
        fetchData(showLoading = true) {
            if (this.currentPod) {
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
            }
        },
        /** 将获取的数据处理成 chart 需要的形式 */
        processData() {
            this.xAxisData = this.statList.map(item => dateFormatter(new Date(+item.timestamp * 1000), 'MM-DD HH:mm:ss'));
            // 整理 cpu 使用
            this.usedCpuSeriesData = [
                {
                    name: this.t('view.task.CPUUsageRate'),
                    type: 'line',
                    itemStyle: {
                        color: '#0052CC',
                        borderWidth: 2
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(47,73,204,100%)'
                            }, {
                                offset: 1,
                                color: 'rgba(207,214,245,0%)'
                            }]
                        }
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
                        color: '#0052CC',
                        borderWidth: 2
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(47,73,204,100%)'
                            }, {
                                offset: 1,
                                color: 'rgba(207,214,245,0%)'
                            }]
                        }
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
                            color: '#0052CC',
                            borderWidth: 2
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(47,73,204,100%)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(207,214,245,0%)'
                                }]
                            }
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
                            color: '#0052CC',
                            borderWidth: 2
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(47,73,204,100%)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(207,214,245,0%)'
                                }]
                            }
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
            switch (name) {
                case 'usedCpu':
                    text = this.t('view.task.CPUUsageRate');
                    yAxisName = '%';
                    break;
                case 'usedMem':
                    text = this.t('view.task.MemoryUsage');
                    yAxisName = 'MB';
                    break;
                case 'usedGpu':
                    text = this.t('view.task.GPUUsageRate');
                    yAxisName = '%';
                    break;
                case 'usedGpuMem':
                    text = this.t('view.task.GPUMemoryUsage');
                    yAxisName = 'MB';
            }
            return {
                ...CHART_DEFAULT_OPTION,
                // title: {
                //     ...CHART_DEFAULT_OPTION.title,
                //     text: text
                // },
                legend: {
                    icon: 'none',
                    borderColor: '#000',
                    selectedMode: false,
                    data: [{
                        name: text,
                        textStyle: {
                            fontFamily: 'PingFangSC-Medium',
                            fontSize: 14,
                            color: '#13264D'
                        }
                    }]
                },
                xAxis: {
                    ...CHART_DEFAULT_OPTION.xAxis,
                    data: this.xAxisData
                },
                yAxis: {
                    ...CHART_DEFAULT_OPTION.yAxis,
                    // name: yAxisName
                    axisLabel: {
                        formatter: '{value}' + yAxisName
                    }
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
        polling: {
            immediate: true,
            handler: function(nval) {
                if (nval) {
                    this.startPolling();
                } else {
                    this.stopPolling();
                }
            }
        }
    }
};
</script>

<style>

</style>
