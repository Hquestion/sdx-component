<template>
    <div class="sdxv-task-management">
        <div class="sdxv-task-management__title">
            任务管理列表
        </div>
        <div class="sdxv-task-management__tab">
            <TabRadioGroup v-model="currentTab">
                <TabRadioItem name="execute">
                    任务执行列表
                </TabRadioItem> 
                <TabRadioItem name="timing">
                    定时任务列表
                </TabRadioItem>
            </TabRadioGroup>
        </div>
        <div class="sdxv-task-management__table">
            <TaskExecuteList v-if="currentTab === 'execute'" />
            <TimingTaskList v-else />
        </div>
    </div>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import TaskExecuteList from './TaskExecuteList';
import TimingTaskList from './TimingTaskList';

export default {
    name: 'SdxvTaskManagementView',
    components: {
        TabRadioGroup: TabRadio.TabRadioGroup,
        TabRadioItem: TabRadio.TabRadioItem,
        TaskExecuteList,
        TimingTaskList
    },
    data() {
        return {
            currentTab: 'execute',
        };
    }
};
</script>

<style>

</style>
