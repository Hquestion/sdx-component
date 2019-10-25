<template>
    <div class="sdxv-task-manage-header">
        <div class="title">
            {{ '任务管理列表' }}
        </div>
        <SdxwSearchLayout
            @search="searchTask"
            :block="false"
            align="left"
        >
            <SdxwSearchItem>
                <sdxu-input
                    v-model="searchName"
                    type="search"
                    size="small"
                    :placeholder="t('view.project.enterProjectName')"
                />
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <SdxuTabRadioGroup
            v-model="taskType"
            @switch="switchTaskType"
            class="radio-group"
        >
            <SdxuTabRadioItem name="task">
                {{ '定时任务列表' }}
            </SdxuTabRadioItem>
            <SdxuTabRadioItem name="execute">
                {{ '任务执行列表' }}
            </SdxuTabRadioItem>
        </SdxuTabRadioGroup>
    </div>
</template>

<script>

import locale from '@sdx/utils/src/mixins/locale';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import TabRadio from '@sdx/ui/components/tab-radio';
export default {
    name: 'SdxvTaskManageHeader',
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
    },
    data() {
        return {
            searchName: '',
            taskType: 'task'
        };
    },
    created() {
        this.$emit('headerInfo', this.searchName, this.taskType);
    },
    methods: {
        searchTask() {
            this.$emit('headerInfo', this.searchName, this.taskType);
        },
        switchTaskType() {
            this.$emit('headerInfo', this.searchName, this.taskType);
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-header {
    .title {
        font-size: 24px;
        color: #13264D;
        margin-bottom: 24px;
    }
    .radio-group {
        margin-bottom: 32px;
    }
}
</style>
