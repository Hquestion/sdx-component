<template>
    <div class="sdxv-task-info">
        <div class="sdxv-task-info__first">
            <div class="sdxv-task-info__first--icon">
                <div
                    class="sdxv-task-info__icon"
                    :style="{'background-color': iconInfo.color}"
                >
                    <i
                        class="sdx-icon"
                        :class="iconInfo.icon"
                    />
                </div>
            </div>
            <div class="sdxv-task-info__first--desc">
                <div>{{ task.name || '' }}</div>
                <div>{{ task.description || '' }}</div>
            </div>
        </div>
        <div class="sdxv-task-info__second">
            <div class="sdxv-task-info__second--item">
                <span class="sdxv-task-info__label">{{ t('sdxCommon.Creator') }}: </span>
                <span class="sdxv-task-info__value">{{ task.owner && task.owner.fullName || '' }}</span>
            </div>
            <div class="sdxv-task-info__second--item">
                <span class="sdxv-task-info__label">{{ t('sdxCommon.CreatedTime') }}: </span>
                <span class="sdxv-task-info__value">{{ dateFormatter(task.createdAt) }}</span>
            </div>
            <div class="sdxv-task-info__second--item">
                <span class="sdxv-task-info__label">{{ t('sdxCommon.UpdatedTime') }}: </span>
                <span class="sdxv-task-info__value">{{ dateFormatter(task.updatedAt) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';
import { TASK_TYPE } from '@sdx/utils/src/const/task';

export default {
    name: 'TaskInfo',
    mixins: [locale],
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    computed: {
        iconInfo() {
            let iconInfo = {};
            switch(this.task.type) {
                case TASK_TYPE.SPARK:
                    iconInfo.icon = 'sdx-Apache_Spark_logo';
                    iconInfo.color = 'red';
                    break;
                case TASK_TYPE.PYTHON:
                    iconInfo.icon = 'sdx-icon-python';
                    iconInfo.color = 'green';
                    break;
                case TASK_TYPE.JUPYTER:
                    iconInfo.icon = 'sdx-Jupter';
                    iconInfo.color = '#FF882B';
                    break;
                case TASK_TYPE.TENSORBOARD:
                    iconInfo.icon = 'sdx-icon-tensorboard';
                    iconInfo.color = 'yellow';
                    break;
                case TASK_TYPE.TENSORFLOW:
                case TASK_TYPE.TENSORFLOW_DIST:
                case TASK_TYPE.TENSORFLOW_AUTO_DIST:
                    iconInfo.icon = 'sdx-icon-tensorflow';
                    iconInfo.color = 'blue';
                    break;
                case TASK_TYPE.CONTAINERDEV:
                    iconInfo.icon = 'sdx-icon-docker';
                    iconInfo.color = 'pink';
                    break;
                case TASK_TYPE.DATA_SERVICE:
                    iconInfo.icon = 'sdx-huabu';
                    iconInfo.color = 'gray';
                    break;
                
            }
            return iconInfo;
        }
    },
    methods: {
        dateFormatter(date) {
            return dateFormatter(date);
        }
    }
};
</script>

<style>

</style>
