<template>
    <div class="sdxv-task-management">
        <div class="sdxv-task-management__title">
            {{ t('view.task.TaskManagementList') }}
        </div>
        <div class="sdxv-task-management__tab">
            <TabRadioGroup v-model="currentTab">
                <TabRadioItem name="execute">
                    {{ t('view.task.TaskExecuteList') }}
                </TabRadioItem> 
                <TabRadioItem name="timing">
                    {{ t('view.task.TimingTaskList') }}
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
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvTaskManagementView',
    mixins: [locale],
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
