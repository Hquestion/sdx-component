<template>
    <SdxuContentPanel
        :title="t('view.monitor.resourceStatistic.AllTaskList')" 
        :fullscreen="true"
    >
        <SdxwTaskResourceList :monitor="true" />
        <template #footer>
            <PortalTarget name="task-panination" />
        </template>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxwTaskResourceList from '@sdx/widget/components/task-list';
import locale from '@sdx/utils/src/mixins/locale';
import * as Portal from 'portal-vue';

export default {
    name: 'SdxvAllTaskList',
    mixins: [locale],
    components: {
        SdxuContentPanel,
        SdxwTaskResourceList,
        PortalTarget: Portal.PortalTarget
    }
};
</script>

<style>

</style>
