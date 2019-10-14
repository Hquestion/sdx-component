<template>
    <div class="sdxw-task-list">
        <SdxwTaskResourceList></SdxwTaskResourceList>
    </div>
</template>

<script>
const SdxwTaskResourceList = require('@sdx/widget/components/task-list').default;
// import SdxwTaskResourceList from '@sdx/widget/components/task-list';

export default {
    name: 'TaskListDemo',
    components: {
        SdxwTaskResourceList
    }
}
</script>

<style lang="scss">
    .sdxw-task-list {
        overflow: auto;
    }
</style>
