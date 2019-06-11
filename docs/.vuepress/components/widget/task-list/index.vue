<template>
    <div class="sdxw-task-list">
        <SdxwTaskList></SdxwTaskList>
    </div>
</template>

<script>
import SdxwTaskList from '@sdx/widget/components/task-list';

export default {
    name: 'TaskListDemo',
    components: {
        SdxwTaskList
    }
}
</script>

<style lang="scss">
    .sdxw-task-list {
        overflow: auto;
    }
</style>
