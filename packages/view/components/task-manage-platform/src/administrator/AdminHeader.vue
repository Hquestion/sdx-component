<template>
    <div class="sdxv-task-manage-header">
        <div class="title">
            {{ t('view.task.TaskManagementList') }}
        </div>
        <SdxuTabRadioGroup
            v-model="taskType"
            @switch="switchTaskType"
            class="radio-group"
        >
            <SdxuTabRadioItem name="task">
                {{ t('view.task.TaskList') }}
            </SdxuTabRadioItem>
            <SdxuTabRadioItem name="execute">
                {{ t('view.task.TaskExecuteList') }}
            </SdxuTabRadioItem>
        </SdxuTabRadioGroup>
    </div>
</template>

<script>

import locale from '@sdx/utils/src/mixins/locale';
import TabRadio from '@sdx/ui/components/tab-radio';
export default {
    name: 'SdxvTaskManageHeader',
    mixins: [locale],
    components: {
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
    },
    data() {
        return {
            taskType: 'task'
        };
    },
    created() {
        this.$emit('headerInfo', this.taskType);
    },
    methods: {
        searchTask() {
            this.$emit('headerInfo', this.taskType);
        },
        switchTaskType() {
            this.$emit('headerInfo', this.taskType);
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-header {
    .title {
        font-size: 24px;
        color: #13264D;
        margin-bottom: 32px;
    }
    .radio-group {
        margin-bottom: 24px;
    }
}
</style>
