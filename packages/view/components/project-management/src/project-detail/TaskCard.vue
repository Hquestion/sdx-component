<template>
    <div
        class="sdxv-task-card"
    >
        <header class="sdxv-task-card__header">
            <task-icon
                :icon-class="taskType.class"
                class="sdxv-task-card__header--icon"
            />
            <span class="sdxv-task-card__header--name">{{ meta.name }}</span>
            <span
                class="sdxv-task-card__header--status"
                :class="taskType.status"
            >
                <i
                    class="sdx-icon sdx-icon-loading"
                    v-if="showLoadingIcon"
                />
                <i
                    class="sdx-icon sdx-icon-gantanhao"
                    v-if="showWarningIcon"
                />
                {{ taskType.statusText }}
            </span>
        </header>
        <main class="sdxv-task-card__main">
            <div class="sdxv-task-card__info">
                <i class="sdx-icon sdx-icon-user" />
                <span>{{ meta.owner }}</span>
            </div>
            <div class="sdxv-task-card__info">
                <i class="sdx-icon sdx-icon-time" />
                <span>{{ meta.createAt }}</span>
            </div>
        </main>
        <footer class="sdxv-task-card__footer">
            <div
                class="sdxv-task-card__footer--operation"
            >
                <i
                    v-if="showStart"
                    class="sdx-icon sdx-icon-yunxing"
                    title="运行"
                    @click="$emit('operate', {item: meta, type: 'start'})"
                />
                <i
                    v-if="showKill"
                    class="sdx-icon sdx-tingzhi"
                    title="停止"
                    @click="$emit('operate', {item: meta, type: 'kill'})"
                />
                <i
                    v-if="showView"
                    class="sdx-icon sdx-icon-detail"
                    title="查看详情"
                    @click="$emit('operate', {item: meta, type: 'detail'})"
                />
                <i
                    v-if="showEdit"
                    class="sdx-icon sdx-icon-edit"
                    title="编辑"
                    @click="$emit('operate', {item: meta, type: 'edit'})"
                />
                <i
                    v-if="showRemove"
                    class="sdx-icon sdx-icon-delete"
                    title="删除"
                    @click="$emit('operate', {item: meta, type: 'remove'})"
                />
            </div>
        </footer>
    </div>
</template>

<script>
import TaskIcon from './TaskIcon';
export default {
    name: 'TaskCard',
    props: {
        meta: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
        };
    },
    computed: {
        taskType() {
            const taskType = {};
            switch (this.meta.type) {
            case 'JUPYTER':
                taskType.class = 'Jupter';
                break;
            case 'PYTHON':
                taskType.class = 'icon-python';
                break;
            case 'CONTAINER_DEV':
                taskType.class = 'icon-docker';
                break;
            case 'SPARK':
                taskType.class = 'Apache_Spark_logo';
                break;
            case 'TENSORFLOW':
                taskType.class = 'icon-tensorflow';
                break;
            case 'TENSORFLOW_DIST':
                taskType.class = 'icon-tensorflow';
                break;
            case 'TENSORFLOW_AUTO_DIST':
                taskType.class = 'icon-tensorflow';
                break;
            case 'TENSORBOARD':
                taskType.class = 'icon-tensorboard';
                break;
            default:
                break;
            }
            switch(this.meta.state.name) {
            case 'CREATED':
                taskType.status = 'is-created';
                taskType.statusText = '新建';
                break;
            case 'LAUNCHING':
                taskType.status = 'is-launching';
                taskType.statusText = '启动中';
                break;
            case 'LAUNCH_ABNORMAL':
                taskType.status = 'is-abnormal';
                taskType.statusText = '启动异常';
                break;
            case 'RUNNING':
                taskType.status = 'is-running';
                taskType.statusText = '运行中';
                break;
            case 'FINISHED':
                taskType.status = 'is-finished';
                taskType.statusText = '已完成';
                break;
            case 'KILLED':
                taskType.status = 'is-killed';
                taskType.statusText = '已终止';
                break;
            case 'FAILED':
                taskType.status = 'is-failed';
                taskType.statusText = '失败';
                break;
            case 'KILLING':
                taskType.status = 'is-killing';
                taskType.statusText = '终止中';
                break;
            default:
                break;
            }
            return taskType;
        },
        showView() {
            return this.meta.state && this.meta.state.allowOperations && this.meta.state.allowOperations.indexOf('detail') > -1;
        },
        showStart() {
            return this.meta.state && this.meta.state.allowOperations && this.meta.state.allowOperations.indexOf('start') > -1;
        },
        showEdit() {
            return this.meta.state && this.meta.state.allowOperations && this.meta.state.allowOperations.indexOf('edit') > -1;
        },
        showRemove() {
            return this.meta.state && this.meta.state.allowOperations && this.meta.state.allowOperations.indexOf('remove') > -1;
        },
        showKill() {
            return this.meta.state && this.meta.state.allowOperations && this.meta.state.allowOperations.indexOf('kill') > -1;
        },
        showLoadingIcon() {
            return this.taskType.status === 'is-running' || this.taskType.status === 'is-launching' || this.taskType.status === 'is-killing';
        },
        showWarningIcon() {
            return this.taskType.status === 'is-abnormal' || this.taskType.status === 'is-failed';
        }
    },
    methods: {

    },
    components: {
        TaskIcon
    }
};
</script>
