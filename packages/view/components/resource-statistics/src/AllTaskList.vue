<template>
    <SdxuContentPanel :title="t('view.monitor.resourceStatistic.AllTaskList')">
        <SdxvTaskResourceList :monitor="true" />
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxvTaskResourceList from '@sdx/widget/components/task-list';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvAllTaskList',
    mixins: [locale],
    components: {
        SdxuContentPanel,
        SdxvTaskResourceList
    }
};
</script>

<style>

</style>
