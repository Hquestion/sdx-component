<template>
    <div class="sdxw-resource-config">
        <SdxwResourceConfig
            v-model="cpuObj"
            type="onlycpu"
        />
        <SdxwResourceConfig
            v-model="cpuObj"
            type="cpu"
        />
        <SdxwResourceConfig
            v-model="gpuObj"
            type="gpu"
        />
    </div>
</template>

<script>
import SdxwResourceConfig from '@sdx/widget/components/resource-config';

export default {
    name: 'ResourceDemo',
    components: {
        SdxwResourceConfig
    },
    data() {
        return {
            cpuObj: {
                cpu: 4,
                memory: 7,
                uuid: '4-7'
            },
            gpuObj: {
                label: 'GXU-001',
                count: 4,
                uuid: 'GXU-001-4'
            },
        }
    }
}
</script>

<style lang="scss">
    
</style>