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
    </div>
</template>

<script>
import ElTabs from 'element-ui/lib/tabs';
import ElTabPane from 'element-ui/lib/tab-pane';
import MonitorInfo from './common/MonitorInfo';
import LogView from './common/LogView';
import BaseInfoContainer from './common/BaseInfoContainer';
import { STATE_TYPE } from '@sdx/utils/src/const/task';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'TaskDetailPanel',
    mixins: [locale],
    components: {
        ElTabs,
        ElTabPane,
        MonitorInfo,
        LogView,
        BaseInfoContainer
    },
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            activeTab: 'base'
        };
    },
    computed: {
        hasRealMonitor() {
            return this.task && ![STATE_TYPE.LAUNCH_ABNORMAL, STATE_TYPE.CREATED, STATE_TYPE.LAUNCHING].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasLog() {
            return this.task && ![STATE_TYPE.LAUNCH_ABNORMAL, STATE_TYPE.CREATED, STATE_TYPE.LAUNCHING].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        isRunning() {
            return this.task && [STATE_TYPE.RUNNING, STATE_TYPE.KILLING].includes(this.task.state);
        },
        hasGpu() {
            let has = false;
            if (this.task && this.task.resourceConfig) {
                has = Object.keys(this.task.resourceConfig).some(item => {
                    return item.includes('GPUS') && this.task.resourceConfig[item] > 0;
                });
            }
            return has;
        }
    }
};
</script>

<style>

</style>
