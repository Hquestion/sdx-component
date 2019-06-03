<template>
    <SdxuContentPanel title="全部任务列表">
        <SdxvTaskResourceList :monitor="true" />
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxvTaskResourceList from '@sdx/widget/components/task-list';

export default {
    name: 'SdxvAllTaskList',
    components: {
        SdxuContentPanel,
        SdxvTaskResourceList
    }
};
</script>

<style>

</style>
