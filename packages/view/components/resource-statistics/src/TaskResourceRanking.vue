<template>
    <SdxuContentPanel
        class="sdxv-task-resource-ranking"
        title="任务资源使用Top10"
    >
        <template #right>
            <div
                class="sdxv-task-resource-ranking__more"
                @click="handGotoTasksList"
            >
                <span>全部</span>
                <i class="sdx-icon sdx-icon-arrow-right" />
            </div>
        </template>
        <SdxvTaskResourceList
            :ranking="true"
            :monitor="true"
        />
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxvTaskResourceList from './TaskResourceList';


import { STATE_TYPE, STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';

export default {
    name: 'SdxvTaskResourceRanking',
    components: {
        SdxuContentPanel,
        SdxvTaskResourceList
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
            // todo:
        }
    }
};
</script>

<style>

</style>
