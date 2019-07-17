<template>
    <div class="pod-log">
        <SdxwPodLog method="head" type="system" />
    </div>
</template>

<script>
import SdxwPodLog from '@sdx/widget/components/pod-log';
export default {
    name: 'PodLog',
    components: {
        SdxwPodLog
    },
    data() {
        return {
            podName: 'fluentd-es-w2rw9'
        };
    }
}
</script>

<style lang="scss">
</style>
