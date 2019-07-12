<template>
    <div class="sdxv-resource-chart is-gpu" />
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'SdxvChartGPU',
    props: {
        allocations: {
            type: Object,
            default: () => ({})
        },
        used: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chartInstance: null,
            color: ['#58D0FF', '#6E9FFE', '#6975F7', '#00A495', '#0C5EA5']
        };
    },
    computed: {
        gpuModelKeys() {
            return Object.keys(this.allocations);
        },
        allocationList() {
            return this.gpuModelKeys.map(item => {
                return {
                    name: item,
                    value: this.allocations[item]
                };
            });
        },
        usedList() {
            const list = [];
            this.gpuModelKeys.map((item, i) => {
                let value = this.used[item] || 0;
                list.push({
                    name: '已使用',
                    value: value,
                    itemStyle: { color: this.color[i] }
                });
                list.push({
                    name: '未使用',
                    value: this.allocations[item] - value,
                    itemStyle: { color: this.color[i], opacity: 0.5 }
                });
            });
            return list;
        }
    },
    methods: {
        initChart() {
            this.chartInstance && this.chartInstance.clear();
            this.chartInstance = echarts.init(this.$el);
            this.chartInstance.setOption({
                tooltip: {
                    formatter: '{a} {b} <br/>{c}核 {d}%'
                },
                series: [{
                    name: 'GPU',
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['33%', '63%'],
                    label: {
                        show: false
                    },
                    color: this.color,
                    data: this.allocationList
                }, {
                    name: '使用情况',
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['88%', '100%'],
                    label: {
                        show: false
                    },
                    data: this.usedList
                }]
            });
        }
    },
    mounted() {
        this.initChart();
    },
    watch: {
        allocations: {
            deep: true, 
            handler() {
                this.initChart();
            }
        },
        used() {
            this.initChart();
        }
    }
};
</script>

<style>

</style>
