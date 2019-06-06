<template>
    <SdxuContentPanel title="任务管理">
        <SdxwTaskList :owner-id="currentUser.userId" />
    </SdxuContentPanel>
</template>

<script>
import SdxwTaskList from '@sdx/widget/components/task-list';
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import { getUser } from '@sdx/utils/src/helper/shareCenter';

export default {
    name: 'SdxvTaskManagement',
    components: {
        SdxwTaskList,
        SdxuContentPanel
    },
    data() {
        return {
            currentUser: getUser()
        };
    }
};
</script>

<style>

</style>
