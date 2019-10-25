<template>
    <div class="sdxv-task-detail-view">
        <template v-if="task">
            <div class="sdxv-task-detail-view__name">
                {{ task && task.name || '' }}
            </div>
            <div class="sdxv-task-detail-view__info">
                <TaskInfoPanel :task="task" />
            </div>
            <div class="sdxv-task-detail-view__detail">
                <TaskDetailPanel :task="task" />
            </div>
        </template>
    </div>
</template>

<script>
import { getTaskDetail } from '@sdx/utils/src/api/project';
import { TASK_POLLING_STATE_TYPE } from '@sdx/utils/src/const/task';
import TaskDetailPanel from './TaskDetailPanel';
import TaskInfoPanel from './TaskInfoPanel';
const POLLING_PERIOD = 3 * 1000;

export default {
    name: 'TaskDetailView',
    components: {
        TaskDetailPanel,
        TaskInfoPanel
    },
    props: {
        taskId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            task: null,
            pollingId: null
        };
    },
    computed: {
        // 是否需要状态拉取
        needPull() {
            return TASK_POLLING_STATE_TYPE.includes(this.task && this.task.state || '');
        }
    },
    methods: {
        getTaskInfo() {
            if (this.taskId) {
                getTaskDetail(this.taskId)
                    .then(data => {
                        this.task = data || null;
                    }).catch(e => {
                        this.task = null;
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
