<template>
    <div class="sdxv-task-detail">
        <el-tabs v-model="activeTab">   
            <el-tab-pane
                :label="t('view.task.BasicInformation')"
                name="base"
            >
                <BaseInfoContainer :task="task" />
            </el-tab-pane>
            <el-tab-pane
                :label="t('view.task.MonitorInformation')"
                name="monitor"
                lazy
            >
                <MonitorInfo
                    v-if="activeTab === 'monitor'"
                    :is-empty="!hasRealMonitor" 
                    :pods="task && task.pods || []"
                    :polling="isRunning"
                    :has-gpu="hasGpu"
                />
            </el-tab-pane>
            <el-tab-pane
                :label="t('view.task.RunningLog')"
                name="log"
                lazy
            >
                <LogView
                    :is-empty="!hasLog"
                    :pods="task && task.pods || []"
                />
            </el-tab-pane>
        </el-tabs>
        <SdxuButton
            v-if="isCONTAINERDEV && isRunning && task && !task.startCommand"
            class="sdxv-task-detail__tensorboard"
            :invert="true"
            type="default"
            size="small"
            @click="goIntoTensorBoard"
        >
            {{ t('view.task.AccessTensorBoard') }}
        </SdxuButton>
    </div>
</template>

<script>
import ElTabs from 'element-ui/lib/tabs';
import ElTabPane from 'element-ui/lib/tab-pane';
import MonitorInfo from './common/MonitorInfo';
import LogView from './common/LogView';
import BaseInfoContainer from './common/BaseInfoContainer';
import locale from '@sdx/utils/src/mixins/locale';
import MixinDetail from './MixinDetail';
import SdxuButton from '@sdx/ui/components/button';

export default {
    name: 'TaskDetailPanel',
    mixins: [locale, MixinDetail],
    components: {
        ElTabs,
        ElTabPane,
        MonitorInfo,
        LogView,
        BaseInfoContainer,
        SdxuButton
    },
    data() {
        return {
            activeTab: 'base'
        };
    },
    methods: {
        goIntoTensorBoard() {
            let list = this.task.serviceList || [];
            let obj = list.find(item => item.proxyType === 'TFBOARD');
            let url = obj && (location.origin + '/' + obj.urlSuffix) || '';
            url && window.open(url);
        }
    }
};
</script>

<style>

</style>
