<template>
    <SdxuContentPanel :title="t('view.monitor.resourceStatistic.AllTaskList')">
        <SdxwTaskResourceList :monitor="true" />
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxwTaskResourceList from '@sdx/widget/components/task-list';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvAllTaskList',
    mixins: [locale],
    components: {
        SdxuContentPanel,
        SdxwTaskResourceList
    }
};
</script>

<style>

</style>
