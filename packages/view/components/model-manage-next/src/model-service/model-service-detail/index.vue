<template>
    <div class="sdxv-model-service-detail">
        <div class="sdxv-model-service-detail__name">
            {{ (serviceInfo && serviceInfo.name || '') + t('view.model.ModelServiceDetail') }}
        </div>
        <div class="sdxv-model-service-detail__container">
            <el-tabs v-model="activeTab">
                <el-tab-pane
                    :label="t('view.model.ServiceDetail')"
                    name="version"
                >
                    <ServiceInfo
                        :service-info="serviceInfo || {}"
                        :image="image || {}"
                    />
                </el-tab-pane>
                <el-tab-pane
                    :label="t('view.model.APIDetail')"
                    name="api"
                    lazy
                >
                    <ApiDetail :service-id="serviceId" />
                </el-tab-pane>
                <el-tab-pane
                    :label="t('view.task.RunningLog')"
                    name="log"
                    lazy
                >
                    <LogView
                        :is-empty="!hasLog"
                        :pods="task && task.pods || []"
                        :started-at="task && task.startedAt || ''"
                    />
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
            </el-tabs>
            <SdxuButton
                v-if="isRunning"
                class="sdxv-model-service-detail__container--test"
                :invert="true"
                type="default"
                size="small"
                @click="testDialogVisible = true"
            >
                {{ t('view.model.Online_testing') }}
            </SdxuButton>
        </div>
        <ApiTestPopper
            :visible.sync="testDialogVisible"
            :service-id="serviceId"
        />
    </div>
</template>

<script>
import ElTabs from 'element-ui/lib/tabs';
import ElTabPane from 'element-ui/lib/tab-pane';
import LogView from './LogView';
import MonitorInfo from './MonitorInfo';
import ApiDetail from '../../api-detail/ApiDetail';
import ServiceInfo from './ServiceInfo';

import { getServiceDetail } from '@sdx/utils/src/api/model';
import { getTaskDetail } from '@sdx/utils/src/api/task';
import { getImage } from '@sdx/utils/src/api/image';
import { STATE_TYPE, TASK_POLLING_STATE_TYPE } from '@sdx/utils/src/const/task';
import SdxwApiTest from '@sdx/widget/components/api-test';
import SdxuButton from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';

const POLLING_PERIOD = 3 * 1000;

export default {
    name: '',
    mixins: [locale],
    components: {
        ElTabs,
        ElTabPane,
        LogView,
        MonitorInfo,
        ApiDetail,
        ServiceInfo,
        SdxuButton,
        ApiTestPopper: SdxwApiTest.ApiTestPopper
    },
    props: {
        serviceId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            activeTab: 'version',
            task: null,
            image: null,
            serviceInfo: null,
            testDialogVisible: false,
            pollingId: null
        };
    },
    computed: {
        hasRealMonitor() {
            return this.task && ![STATE_TYPE.Error, STATE_TYPE.Created, STATE_TYPE.Pending, STATE_TYPE.Scheduling].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasLog() {
            return this.task && ![STATE_TYPE.Error, STATE_TYPE.Created, STATE_TYPE.Pending, STATE_TYPE.Scheduling].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasGpu() {
            return !!(this.serviceInfo && this.serviceInfo.runtimeResource && this.serviceInfo.runtimeResource.gpus);
        },
        isRunning() {
            return this.task && [STATE_TYPE.Running, STATE_TYPE.Terminating].includes(this.task.state);
        }
    },
    methods: {
        async fetchData(polling = false) {
            this.serviceInfo = await getServiceDetail(this.serviceId);
            if (this.serviceInfo && this.serviceInfo.runtimeImage && !polling) {
                this.image = await getImage(this.serviceInfo.runtimeImage);
            }
            if (this.serviceInfo && this.serviceInfo.taskId) {
                this.task = await getTaskDetail(this.serviceInfo.taskId, 'MODELSERVICE');
            }
            // 轮询
            if (TASK_POLLING_STATE_TYPE.includes(this.serviceInfo.state)) {
                this.startPolling();
            }
        },
        startPolling() {
            if (!this._isDestroyed) {
                this.pollingId && clearTimeout(this.pollingId);
                this.pollingId = setTimeout(() => {
                    this.fetchData(true);
                }, POLLING_PERIOD);
            }
        },
        stopPolling() {
            this.pollingId && clearTimeout(this.pollingId);
            this.pollingId = null;
        }
    },
    created() {
        this.fetchData();
    },
    beforeDestroy() {
        this.stopPolling();
    }
};
</script>

<style>

</style>
