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
import { TASK_TYPE_VALUE } from '@sdx/utils/src/const/task';

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
                case TASK_TYPE_VALUE.SKYIDE:
                    iconInfo.icon = 'sdx-SkyIDErenwu';
                    iconInfo.color = '#6cb3f9';
                    break;
                case TASK_TYPE_VALUE.CONTAINER_DEV:
                    iconInfo.icon = 'sdx-zidingyirongqirenwu';
                    iconInfo.color = '#46a1bc';
                    break;
                case TASK_TYPE_VALUE.JUPYTER:
                    iconInfo.icon = 'sdx-Jupter';
                    iconInfo.color = '#FF882B';
                    break;
                case TASK_TYPE_VALUE.MODELSERVICE:
                    iconInfo.icon = 'sdx-icon-tensorboard';
                    iconInfo.color = 'yellow';
                    break;
                case TASK_TYPE_VALUE.SKYFLOW:
                    iconInfo.icon = 'sdx-skyflowrenwu';
                    iconInfo.color = '#6158ba';
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
