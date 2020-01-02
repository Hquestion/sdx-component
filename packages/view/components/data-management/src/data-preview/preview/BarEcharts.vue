<template>
    <div
        class="sdxv-data-bar-echarts"
        :style="{height:height,width:width}"
    />
</template>

<script>
import echarts from 'echarts';
import locale from '@sdx/utils/src/mixins/locale';
import debounce from '@sdx/utils/src/helper/debounce';
export default {
    name: 'SdxvChartGPU',
    mixins: [locale],
    props: {
        width: {
            type: String,
            default: '100px'
        },
        height: {
            type: String,
            default: '220px'
        },
        data: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
        };
    },
    methods: {
        initChart() {
            this.chart && this.chart.clear();
            this.chart = echarts.init(this.$el);
            this.chart.setOption({
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0',
                    top: '2%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });
            
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener('resize', this.__resizeHanlder);
        this.chart.dispose();
        this.chart = null;
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
        this.__resizeHanlder = debounce(() => {
            if (this.chart) {
                this.chart.resize();
            }
        }, 100);
        window.addEventListener('resize', this.__resizeHanlder);
    },
    watch: {
        data: {
            deep: true, 
            handler() {
                this.initChart();
                this.__resizeHanlder = debounce(() => {
                    if (this.chart) {
                        this.chart.resize();
                    }
                }, 100);
                window.addEventListener('resize', this.__resizeHanlder);
            }
        },
        width: {
            deep: true, 
            handler() {
                this.initChart();
                this.__resizeHanlder = debounce(() => {
                    if (this.chart) {
                        this.chart.resize();
                    }
                }, 100);
                window.addEventListener('resize', this.__resizeHanlder);
            }
        }
    }
};
</script>

<style>

</style>
