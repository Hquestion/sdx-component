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
            <SdxwFoldLabel
                plain
                class="sdxv-task-card__header--status"
                :type="taskType.type"
                :status="taskType.status"
            >
                {{ taskType.statusText }}
            </SdxwFoldLabel>
        </header>
        <main class="sdxv-task-card__main">
            <div class="sdxv-task-card__info">
                <i class="sdx-icon sdx-icon-user" />
                <span>{{ (meta.owner && meta.owner.fullName) || '' }}</span>
            </div>
            <div class="sdxv-task-card__info">
                <i class="sdx-icon sdx-icon-time" />
                <span>{{ meta.createdAt | dateFormatter }}</span>
            </div>
            <div
                class="sdxv-task-card__link"
            >
                <span
                    v-if="showContainerDevLink"
                    class="sdxv-task-card__link--container"
                    @click="handleExternalLink(meta)"
                >
                    ContainerDev
                </span>
                <span
                    v-if="showTensorflowLink"
                    class="sdxv-task-card__link--tensorflow"
                    @click="handleExternalLink(meta)"
                >
                    Tensorboard
                </span>
                <span
                    v-if="showJupyterLink"
                    class="sdxv-task-card__link--jupyter"
                    @click="handleExternalLink(meta, 'lab?')"
                >
                    Jupyter lab
                </span>
                <span
                    v-if="showJupyterLink"
                    class="sdxv-task-card__link--jupyter"
                    @click="handleExternalLink(meta, 'tree?')"
                >
                    Jupyter notebook
                </span>
            </div>
        </main>
        <footer class="sdxv-task-card__footer">
            <div
                class="sdxv-task-card__footer--operation"
            >
                <slot name="footer" />
                <!-- <i
                    v-if="operations.indexOf('start') > -1"
                    class="sdx-icon sdx-icon-yunxing"
                    title="运行"
                    @click="$emit('operate', {item: meta, type: 'start'})"
                />
                <i
                    v-if="operations.indexOf('kill') > -1"
                    class="sdx-icon sdx-tingzhi"
                    title="停止"
                    @click="$emit('operate', {item: meta, type: 'kill'})"
                />
                <i
                    v-if="operations.indexOf('detail') > -1"
                    class="sdx-icon sdx-icon-detail"
                    title="查看详情"
                    @click="$emit('operate', {item: meta, type: 'detail'})"
                />
                <i
                    v-if="operations.indexOf('edit') > -1"
                    class="sdx-icon sdx-icon-edit"
                    title="编辑"
                    @click="$emit('operate', {item: meta, type: 'edit'})"
                />
                <i
                    v-if="operations.indexOf('remove') > -1"
                    class="sdx-icon sdx-icon-delete"
                    title="删除"
                    @click="$emit('operate', {item: meta, type: 'remove'})"
                /> -->
            </div>
        </footer>
    </div>
</template>

<script>
import TaskIcon from './TaskIcon';
import Filters from '@sdx/utils/src/mixins/transformFilter';
import TaskOperations from '@sdx/utils/src/mixins/task';
import { STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';
import FoldLabel from '@sdx/widget/components/fold-label';
import locale from '@sdx/utils/src/mixins/locale';
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
    components: {
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        TaskIcon
    },
    mixins: [Filters, TaskOperations, locale],
    computed: {
        showContainerDevLink() {
            return this.meta.type === 'CONTAINERDEV' && this.meta.state === 'RUNNING' && this.meta.externalUrl;
        },
        showTensorflowLink() {
            return this.meta.type === 'TENSORBOARD' && this.meta.state === 'RUNNING' && this.meta.externalUrl;
        },
        showJupyterLink() {
            return this.meta.type === 'JUPYTER' && this.meta.state === 'RUNNING' && this.meta.externalUrl;
        },
        operations() {
            const operationList = this.getOperationList(this.meta);
            let operations = [];
            operationList.forEach(item => operations.push(item.value));
            return operations;
        },
        taskType() {
            const taskType = {};
            switch (this.meta.type) {
            case 'JUPYTER':
                taskType.class = 'Jupter';
                break;
            case 'PYTHON':
                taskType.class = 'icon-python';
                break;
            case 'CONTAINERDEV':
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
            taskType.type = STATE_MAP_FOLD_LABEL_TYPE[this.meta.state];
            switch(this.meta.state) {
            case 'CREATED':
                taskType.status = '';
                taskType.statusText = this.t('view.task.state.CREATED');
                break;
            case 'LAUNCHING':
                taskType.status = 'loading';
                taskType.statusText = this.t('view.task.state.LAUNCHING');
                break;
            case 'LAUNCH_ABNORMAL':
                taskType.status = 'warning';
                taskType.statusText = this.t('view.task.state.LAUNCH_ABNORMAL');
                break;
            case 'RUNNING':
                taskType.status = 'loading';
                taskType.statusText = this.t('view.task.state.RUNNING');
                break;
            case 'FINISHED':
                taskType.status = '';
                taskType.statusText = this.t('view.task.state.FINISHED');
                break;
            case 'KILLED':
                taskType.status = '';
                taskType.statusText = this.t('view.task.state.KILLED');
                break;
            case 'FAILED':
                taskType.status = 'warning';
                taskType.statusText = this.t('view.task.state.FAILED');
                break;
            case 'KILLING':
                taskType.status = 'loading';
                taskType.statusText = this.t('view.task.state.KILLING');
                break;
            default:
                break;
            }
            return taskType;
        }
    },
    methods: {
        handleExternalLink(meta, param) {
            window.open(`${meta.externalUrl}/` + (param ? `${param}` : ''));
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-card.is-lang-en {
    .sdxv-task-card__header--name {
        width: 100px;
    }
}
</style>
