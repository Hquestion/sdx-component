<template>
    <component
        :is="comp"
        :task="task"
    />
</template>

<script>
export default {
    props: {
        comp: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            task: {}
        };
    },
    computed: {
        taskId() {
            return this.$route.params.taskId;
        }
    }
};
</script>

<style>

</style>
