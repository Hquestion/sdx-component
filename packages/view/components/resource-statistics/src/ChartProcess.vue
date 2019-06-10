<template>
    <div class="sdxv-resource-chart">
        <SdxuRadialProgress
            :diameter="130"
            :completed-steps="used"
            :total-steps="total"
            start-color="#4781F8"
            stop-color="#8AEBFF"
            inner-stroke-color="#ECF3FD"
            :stroke-width="12"
            :slide-width="8"
        >
            <p class="sdxv-resource-chart__percent">
                {{ percent }}
            </p>
            <p class="sdxv-resource-chart__desc">
                已使用
            </p>
        </SdxuRadialProgress>
    </div>
</template>

<script>
import SdxuRadialProgress from '@sdx/ui/components/radial-progress';
export default {
    name: 'SdxvChartProcess',
    components: {
        SdxuRadialProgress
    },
    props: {
        total: {
            type: Number,
            default: 0
        },
        used: {
            type: Number,
            default: 0
        }
    },
    computed: {
        percent() {
            return (this.used / this.total).toFixed(2) * 100 + '%';
        }
    }
};
</script>

<style>

</style>
