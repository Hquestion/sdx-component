<template>
    <div class="api">
        <CommonApi :apiData="eventData" title="Events" type="event"/>
    </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
    name: 'api',
    data() {
        return {
            eventData: [
                {
                    params: 'handle-scroll',
                    describe: '滚动时触发',
                    cbparams: '无'
                },
                {
                    params: 'handle-resize',
                    describe: '视口变化时触发',
                    cbparams: '无'
                },
                {
                    params: 'handle-scroll-complete',
                    describe: '滚动结束时触发',
                    cbparams: '无'
                },
            ]
        };
    },
    components: {
        CommonApi
    }
}
</script>

<style lang="scss" scoped>

</style>
