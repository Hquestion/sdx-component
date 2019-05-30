<template>
    <div class="sdxv-resource-chart is-gpu" />
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'SdxvChartGPU',
    data() {
        return {
            chartInstance: null,
            data: [{
                name: 'GTK-897',
                value: 2
            }, {
                name: 'HTOS-349',
                value: 4
            }, {
                name: 'TIFS-8',
                value: 5
            }],
            assigned: [{
                name: '已使用',
                value: 1
            }, {
                name: '未使用',
                value: 1
            }, {
                name: '已使用',
                value: 1
            }, {
                name: '未使用',
                value: 3
            }, {
                name: '已使用',
                value: 3
            }, {
                name: '未使用',
                value: 2
            }]
        };
    },
    methods: {
        initChart() {
            const color = ['#58D0FF', '#6E9FFE', '#6975F7', '#00A495', '#0C5EA5'];
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
                    color: color,
                    data: this.data
                }, {
                    name: '使用情况',
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['88%', '100%'],
                    label: {
                        show: false
                    },
                    data: this.assigned
                }]
            });
        }
    },
    mounted() {
        this.initChart();
        // window.addEventListener('resize', () => {
        //     this.chartInstance && this.chartInstance.resize();
        // });
    }
};
</script>

<style>

</style>
