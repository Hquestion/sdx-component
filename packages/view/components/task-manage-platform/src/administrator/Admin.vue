<template>
    <div class="sdxv-task-manage-admin">
        <TaskManageHeader @headerInfo="headerInfo" />
        <TaskList v-if="taskType === 'task'" />
        <ExecuteList v-else />
    </div>
</template>

<script>
import TaskManageHeader from './AdminHeader';
import TaskList from './TaskList';
import ExecuteList from './ExecuteList';
export default {
    name: 'SdxvTaskAdmin',
    components: {
        TaskManageHeader,
        TaskList,
        ExecuteList
    },
    data() {
        return {
            taskType: ''
        };
    },
    methods: {
        headerInfo(taskType) {
            this.taskType = taskType;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>