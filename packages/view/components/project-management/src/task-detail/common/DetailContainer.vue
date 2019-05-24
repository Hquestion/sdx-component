<template>
    <div class="sdxv-task-detail">
        <SdxuContentPanel title="基本信息">
            <template #right>
                <slot name="base-info-right" />
            </template>
            <template #default>
                <div class="sdxv-info-container">
                    <slot name="base-info" />
                </div>
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel title="运行信息">
            <template #default>
                <div class="sdxv-info-container">
                    <slot name="running-info" />
                </div>
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel title="资源信息">
            <template #default>
                <slot name="resource-info" />
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel
            v-if="$slots['data-info']"
            title="数据信息"
        >
            <template #default>
                <slot name="data-info" />
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel title="Log日志">
            <template #default>
                <slot name="log-info" />
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel title="实时监控">
            <template #default>
                <slot name="realtime-monitor" />
            </template>
        </SdxuContentPanel>
    </div>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';

export default {
    name: 'SdxvDetailContainer',
    components: {
        SdxuContentPanel
    }
};
</script>

<style>

</style>
