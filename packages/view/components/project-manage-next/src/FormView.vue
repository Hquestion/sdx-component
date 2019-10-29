<template>
    <component
        :is="formComp"
        :project-id="projectId"
        :kind-single-instance="kindSingleInstance"
        :task="task"
    />
</template>

<script>
import { getTaskDetailBackEnd } from '@sdx/utils/src/api/project';
import { TASK_POLLING_STATE_TYPE } from '@sdx/utils/src/const/task';
const POLLING_PERIOD = 3 * 1000;

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
            kindSingleInstance: false,
            pollingId: null
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
            return TASK_POLLING_STATE_TYPE.includes(this.task && this.task.state || '');
        }
    },
    methods: {
        getTaskInfo() {
            if (this.taskId) {
                getTaskDetailBackEnd(this.taskId)
                    .then(data => {
                        this.task = data;
                    });
            }
        },
    },
    watch: {
        needPull(nval) {
            if (nval) {
                this.pollingId && clearInterval(this.pollingId);
                this.pollingId = setInterval(() => {
                    this.getTaskInfo();
                }, POLLING_PERIOD);
            } else {
                this.pollingId && clearInterval(this.pollingId);
                this.pollingId = null;
            }
        }
    },
    created() {
        this.getTaskInfo();
    },
    beforeDestroy() {
        this.pollingId && clearInterval(this.pollingId);
        this.pollingId = null;
    }
};
</script>

<style lang="scss">

</style>
