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
                color: ['#1144AB'],
                tooltip : {
                    trigger: 'item',
                    padding: 10,
                    borderColor: 'rgba(0,0,0,0.03)' ,
                    borderWidth: 1 ,
                    backgroundColor: '#fff',
                    axisPointer: {
                        shadowStyle: {
                            color: '0 0 2px 0 rgba(0,0,0,0.23)'
                        }
                    },
                    formatter: '<div style="color: #13264D;border-radius: 2px; padding: 0 10px;z-index: 999 ">{b}<br/><span style="color:#6E7C94">{a}</span> {c}</div>'
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0px',
                    top: '6%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : Object.keys(this.data),
                        axisTick: {
                            alignWithLabel: true
                        },
                        show : false
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show : false,
                    }
                ],
                series : [
                    {
                        name:'Count',
                        type:'bar',
                        barWidth: '8',
                        data: Object.values(this.data),
                        emphasis: {
                            itemStyle: {
                                color: '#3197FF'
                            }
                        }
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
