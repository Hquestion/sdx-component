<template>
    <div class="form">
        <component
            v-if="taskId && task || projectId"
            :is="formComp"
            :project-id="projectId"
            :kind-single-instance="kindSingleInstance"
            :task="task"
        />
    </div>
</template>

<script>
import { getTaskDetail } from '@sdx/utils/src/api/project';

export default {
    props: {
        // 通过router注入,组件实例
        formComp: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            task: null,
            kindSingleInstance: false
        };
    },
    computed: {
        // 新建任务的时候会有这个参数
        projectId() {
            return this.$route.params.projectId;
        },
        // 编辑任务的时候会有这个参数
        taskId() {
            return this.$route.params.taskId;
        },
        // 是否需要状态拉取
        needPull() {
            return this.task && this.task.state.need_pull;
        }
    },
    methods: {
        getTaskInfo() {
            if (this.taskId) {
                getTaskDetail(this.taskId)
                    .then(data => {
                        this.task = data;
                    });
            }
        },
    },
    watch: {
       
    },
    activated() {
      
    },
    created() {
        this.getTaskInfo();
    },
    beforeDestroy() {
      
    },
    deactivated() {
     
    }
};
</script>

<style lang="scss">
.form {
    height: 100%;
}
</style>
