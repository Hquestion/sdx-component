<template>
    <SdxuContentPanel
        class="sdxv-task-resource-ranking"
        :title="t('view.monitor.resourceStatistic.TaskResourceUsageTop10')"
    >
        <template #right>
            <div
                class="sdxv-task-resource-ranking__more"
                @click="handGotoTasksList"
            >
                <span>{{ t('sdxCommon.ALL') }}</span>
                <i class="sdx-icon sdx-icon-arrow-right" />
            </div>
        </template>
        <SdxwTaskResourceList
            :ranking="true"
            :monitor="true"
        />
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxwTaskResourceList from '@sdx/widget/components/task-list';


import { STATE_TYPE, STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvTaskResourceRanking',
    mixins: [locale],
    components: {
        SdxuContentPanel,
        SdxwTaskResourceList
    },
    data() {
        this.STATE_TYPE = STATE_TYPE;
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        return {

        };
    },
    methods: {
        handGotoTasksList() {
            this.$router.push({name: 'SdxvAllTaskList'});
        }
    }
};
</script>

<style>

</style>
