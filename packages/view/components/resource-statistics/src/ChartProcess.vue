<template>
    <div class="sdxv-resource-chart">
        <SdxuRadialProgress
            :diameter="138"
            :completed-steps="used"
            :total-steps="total"
            start-color="#4781F8"
            stop-color="#8AEBFF"
            inner-stroke-color="#ECF3FD"
            :stroke-width="14"
            :slide-width="10"
        >
            <p class="sdxv-resource-chart__percent">
                {{ percent }}%
            </p>
            <p class="sdxv-resource-chart__desc">
                {{ t('view.monitor.resourceStatistic.Used') }}
            </p>
        </SdxuRadialProgress>
    </div>
</template>

<script>
import SdxuRadialProgress from '@sdx/ui/components/radial-progress';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxvChartProcess',
    mixins: [locale],
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
            let per = this.total ? Math.floor((this.used / this.total) * 100) : 0;
            return this.total && this.used 
                ? per 
                    ? per : 1
                : 0;
        }
    }
};
</script>

<style>

</style>
