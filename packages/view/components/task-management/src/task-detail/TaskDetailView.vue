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
    methods: {
        getTaskInfo() {
            if (this.taskId) {
                getTaskDetail(this.taskId)
                    .then(data => {
                        this.task = data || null;
                        if (TASK_POLLING_STATE_TYPE.includes(this.task && this.task.state || '')) {
                            this.startPolling();
                        }
                    }).catch(e => {
                        this.task = null;
                    });
            }
        },
        startPolling() {
            if (!this._isDestroyed) {
                this.pollingId && clearTimeout(this.pollingId);
                this.pollingId = setTimeout(() => {
                    this.getTaskInfo();
                }, POLLING_PERIOD);
            }
        },
        stopPolling() {
            this.pollingId && clearTimeout(this.pollingId);
            this.pollingId = null;
        }
    },
    created() {
        this.getTaskInfo();
    },
    beforeDestroy() {
        this.stopPolling();  
    }
};
</script>

<style lang="scss">
</style>
