<template>
    <TaskInfo :task="task" />
</template>

<script>
import TaskInfo from './common/TaskInfo';

export default {
    name: 'TaskInfoPanel',
    components: {
        TaskInfo
    },
    props: {
        task: {
            type: Object,
            required: true
        }
    }
};
</script>

<style>

</style>
