<template>
    <div class="sdxv-task-detail">
        <SdxuContentPanel :title="t('view.task.BasicInformation')">
            <template #right>
                <slot name="base-info-right" />
            </template>
            <template #default>
                <div class="sdxv-info-container">
                    <slot name="base-info" />
                </div>
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel :title="t('view.task.RunningInformation')">
            <template #default>
                <div class="sdxv-info-container">
                    <slot name="running-info" />
                </div>
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel :title="t('view.task.ResourceInformation')">
            <template #default>
                <slot name="resource-info" />
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel
            v-if="$slots['data-info']"
            :title="t('view.task.DataInformation')"
        >
            <template #default>
                <slot name="data-info" />
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel :title="t('sdxCommon.Log')">
            <template #default>
                <slot name="log-info" />
            </template>
        </SdxuContentPanel>
        <SdxuContentPanel :title="t('view.task.RealTimeMonitor')">
            <template #default>
                <slot name="realtime-monitor" />
            </template>
        </SdxuContentPanel>
    </div>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvDetailContainer',
    mixins: [locale],
    components: {
        SdxuContentPanel
    }
};
</script>

<style>

</style>
