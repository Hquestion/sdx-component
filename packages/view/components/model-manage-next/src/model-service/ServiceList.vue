<template>
    <div class="sdxv-model-service">
        <div class="title">
            {{ t('view.model.serviceList') }}
        </div>
        <div class="condition">
            <SdxwSearchLayout @search="handleSearch">
                <SdxwSearchItem :label="`${t('view.authority.ServiceName')}：`">
                    <sdxu-input
                        v-model="params.name"
                        :placeholder="t('ui.transfer.PleaseEnter')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="`${t('sdxCommon.Status')}：`">
                    <el-select
                        size="large"
                        v-model="params.state"
                    >
                        <el-option
                            v-for="item in modelStateList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <SdxwResourceAlert
            type="model"
            style="margin-top: 24px;"
        />
        <div class="table">
            <sdxu-table
                :data="table"
                v-loading="tableLoading"
                @expand-change="expandChange"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
            >
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <sdxu-table
                            light
                            :data="row.versionInfo"
                            align="center"
                            header-align="center"
                        >
                            <el-table-column
                                prop="versionName"
                                :label="t('view.model.Model_Version')"
                            >
                                <template #default="{row}">
                                    <span>{{ row.versionName }}</span>
                                    <span
                                        v-if="row.state"
                                        style="color: #6E7C94"
                                    >
                                        （{{ row.state }}）
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="instances"
                                :label="t('view.model.Instances')"
                            >
                                <template #default="{row}">
                                    {{ `${row.instances}${t('view.task.Count')}` }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="t('view.model.Resource')"
                            >
                                <template
                                    slot-scope="scope"
                                >
                                    {{ `${scope.row.runtimeResource.cpus / 1000}C / ${scope.row.runtimeResource.memory / Math.pow(1024, 3)}GB / ${scope.row.runtimeResource.gpus}${t('view.task.Block')}` }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="trafficRatio"
                                :label="t('view.model.Flow_ratio')"
                            >
                                <template #default="{row}">
                                    {{ `${row.trafficRatio * 100}%` }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="startedAt"
                                :label="t('view.model.Running_time')"
                            >
                                <template
                                    slot-scope="scope"
                                >
                                    {{ dateFormatter(scope.row.startedAt) }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="updatedAt"
                                :label="t('view.file.UpdatedAt')"
                            >
                                <template
                                    slot-scope="scope"
                                >
                                    {{ dateFormatter(scope.row.updatedAt) }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="t('sdxCommon.Operation')"
                                min-width="172px"
                            >
                                <template #default="{ row }">
                                    <SdxuButton
                                        size="regular"
                                        type="link"
                                        v-if="row.onlineTesting"
                                    >
                                        {{ t('view.model.Online_testing') }}
                                    </SdxuButton>
                                    <SdxuButton
                                        size="regular"
                                        type="link"
                                        v-if="row.onlineTesting && row.capacity"
                                        @click="adjustversionUpgrade(row, row.instances, 'capacity')"
                                    >
                                        {{ t('view.model.Expansion_capacity') }}
                                    </SdxuButton>
                                    <span v-if="!row.onlineTesting">-</span>
                                </template>
                            </el-table-column>
                        </sdxu-table>
                        <div
                            class="btn-group"
                            v-if="row.versionUpgrade"
                        >
                            <SdxuButton
                                type="default"
                                size="small"
                                @click="adjustversionUpgrade(row.versionInfo, row.instances, 'instance')"
                            >
                                {{ t('view.model.Instance_adjustment') }}
                            </SdxuButton>
                            <SdxuButton
                                type="default"
                                size="small"
                                @click="adjustversionUpgrade(row.versionInfo, row.instances, 'traffic')"
                            >
                                {{ t('view.model.Traffic_assignment') }}
                            </SdxuButton>
                            <SdxuButton
                                type="default"
                                size="small"
                                @click="resetVersionUpgrade(row.versionInfo, 'rollback')"
                            >
                                {{ t('view.model.One_key_rollback') }}
                            </SdxuButton>
                            <SdxuButton
                                type="primary"
                                size="small"
                                @click="resetVersionUpgrade(row.versionInfo, 'resume')"
                            >
                                {{ t('view.model.One_click_upgrade') }}
                            </SdxuButton>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="t('view.authority.ServiceName')"
                >
                    <template #default="{ row }">
                        <SdxuButton
                            type="link"
                            @click="serviceDetail(row.uuid)"
                        >
                            {{ row.name }}
                        </SdxuButton>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="modelName"
                    :label="t('view.model.modelColumns.name')"
                />
                <el-table-column
                    prop="versionName"
                    :label="t('view.model.Model_Version')"
                />
                <el-table-column
                    prop="apiUrl"
                    label="URL"
                />
                <el-table-column
                    prop="state"
                    :label="t('sdxCommon.Status')"
                >
                    <template #default="{ row }">
                        <SdxwFoldLabel
                            plain
                            :type="STATE_MAP_FOLD_LABEL_TYPE[row.state]"
                        >
                            {{ t(STATE_TYPE_LABEL[row.state]) }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="172px"
                >
                    <template #default="{ row }">
                        <SdxuButtonGroup>
                            <SdxuButton
                                v-for="(item, i) in getOperationList(row.state)"
                                v-show="!(!row.canUpgrade && item.value === 'gray')"
                                type="link"
                                :key="i"
                                @click="handleOperation(item.value, row)"
                            >
                                {{ t(item.label) }}
                            </SdxuButton>
                        </SdxuButtonGroup>
                    </template>
                </el-table-column>
            </sdxu-table>
            <SdxuPagination
                v-if="total"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="handlePageChange"
            />
        </div>
        <SdxwApiTestPopper
            :visible.sync="onlineTestingVisible"
            :service-id="serviceInfo && serviceInfo.uuid"
        />
        <PublishPlatform :visible.sync="publishPlatformVisible" />
        <GrayscaleRelease
            :visible.sync="grayscaleReleaseVisible" 
            :select-options="grayList"
            :info="serviceInfo"
        />
        <CreateModelService
            :visible.sync="createServiceVisible"
            v-if="createServiceVisible"
            :editing-service="serviceInfo"
            @close="handleClose"
        />
        <VersionUpgrade
            :visible.sync="versionUpgradeVisible"
            v-if="versionUpgradeVisible"
            :type="versionUpgradeType"
            :data="versionUpgradeData"
            :total-instance="totalInstance"
            @confirmUpgrade="confirmUpgrade"
        />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { getServiceList,removeService,stopService,startService, getVersionList, updateService } from '@sdx/utils/src/api/model';
import { paginate,removeBlankAttr} from '@sdx/utils/src/helper/tool';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import PublishPlatform from '../service-dialog/PublishPlatform';
import GrayscaleRelease from '../service-dialog/GrayscaleRelease';
import { Select,Option, Message} from 'element-ui';
import FoldLabel from '@sdx/widget/components/fold-label';
import {  STATE_TYPE_LABEL,  STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE} from '@sdx/utils/src/const/task';
import MessageBox from '@sdx/ui/components/message-box';
import SdxuButtonGroup from '@sdx/ui/components/button-group';
import {  OPERATION_INFO,STATE_MODEL_SERVICE_OPERATION} from '@sdx/utils/src/const/model';
import ResourceAlert from '@sdx/widget/components/resource-alert';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import CreateModelService from '../service-dialog/create-model-service/Index';
import ApiTest from '@sdx/widget/components/api-test';
import Button from '@sdx/ui/components/button';
import VersionUpgrade from '../service-dialog/VersionUpgrade';
export default {
    name: 'SdxvModelService',
    mixins: [locale],
    data() {
        return {
            STATE_TYPE_LABEL,
            STATE_MAP_FOLD_LABEL_TYPE,
            STATE_TYPE,
            STATE_MODEL_SERVICE_OPERATION,
            OPERATION_INFO,
            params: {
                name: '',
                state: '',
                start: 1,
                count: 10,
                // order: 'desc',
                // orderBy: 'updatedAt'
            },
            current: 1,
            pageSize: 10,
            total: 0,
            tableLoading: false,
            onlineTestingVisible: false,
            publishPlatformVisible:false,
            grayscaleReleaseVisible:false,
            createServiceVisible:false,
            versionUpgradeVisible: false,
            table: [],
            refreshTimer: null,
            // 灰度列表
            grayList: [],
            serviceInfo: null,
            // 要展开的行，数值的元素是row的key值
            expands: [],
            versionUpgradeType: '',
            versionUpgradeData: null,
            totalInstance: 0
        };
    },
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        SdxuPagination,
        SdxwApiTestPopper: ApiTest.ApiTestPopper,
        PublishPlatform,
        GrayscaleRelease,
        [Select.name]: Select,
        [Option.name]: Option,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuButtonGroup,
        [ResourceAlert.name]: ResourceAlert,
        CreateModelService,
        [Button.name]: Button,
        VersionUpgrade
    },
    computed: {
        modelStateList() {
            let list = JSON.parse(JSON.stringify(this.STATE_TYPE));
            let arr = Object.keys(list).filter(item => item !== STATE_TYPE.Succeeded).map(item => {
                return {
                    label: STATE_TYPE_LABEL[item],
                    value: STATE_TYPE[item]
                };
            });
            arr.unshift({
                value: '',
                label: 'sdxCommon.All'
            });
            return arr;
        }
    },
    created() {
        this.tableLoading = true;
        this.getServices();
    },
    beforeDestroy () {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
    },
    methods: {
        dateFormatter,
        confirmUpgrade() {
            this.getServices();
        },
        // 回滚升级
        resetVersionUpgrade(data, type) {
            let params = {
                versionUpgrade: {
                    versionName: this.table[0].versionName,
                    instances: this.table[0].instances,
                    trafficRatio:this.table[0].trafficRatio,
                    action: type
                }
            };
            let [title, content] = ['', ''];
            if(type === 'rollback') {
                title = this.t('view.model.One_click_rollback_prompt');
                content = `${this.t('view.model.prompt.rollback')}${data[1].versionName}(${data[1].state})${this.t('view.model.prompt.version')}`;
            } else {
                title = this.t('view.model.One_click_upgrade_prompt');
                content = `${this.t('view.model.prompt.Are_you_sure')}${data[1].versionName}(${data[1].state})${this.t('view.model.prompt.version_upgrade')}${data[0].versionName}(${data[0].state})${this.t('view.model.prompt.version_end')}`;
            }
            MessageBox({
                title,
                content,
                status: 'warning'
            }).then(() => {
                updateService(data[0].uuid, params).then(()=> {
                    Message({
                        message: this.t('sdxCommon.OperationSuccess'),
                        type: 'success'
                    });
                    this.getServices();
                });
            });
        },
        //实例调整
        adjustversionUpgrade(data, instances, type) {
            if(type === 'instance') {
                this.totalInstance = instances;
            }
            this.versionUpgradeVisible = true;
            this.versionUpgradeType = type;
            this.versionUpgradeData = data;
        },
        // 获取row的key值
        getRowKeys(row) {
            return row.uuid;
        },
        expandChange(row, expandedRows) {
            this.expands = [];
            for (let i =0; i< expandedRows.length; i++) {
                this.expands.push(expandedRows[i].uuid);
            }
        },
        // 服务详情
        serviceDetail(uuid) {
            this.$router.push({
                path: `/sdxv-model-manage-service/detail/${uuid}`,
            });
        },
        handleClose(needRefresh) {
            if (needRefresh) {
                this.tableLoading = true;
                this.getServices();
            }
        },
        getOperationList(state) {
            let arr = this.STATE_MODEL_SERVICE_OPERATION[state] || [];
            return arr.map(item => this.OPERATION_INFO[item]);
        },
        handleOperation(type,data) {
            this.serviceInfo = data;
            if(type === 'remove') {
                MessageBox({
                    title: this.t('view.model.Model_deletion_prompt'),
                    content: this.t('view.model.Are_you_sure_you_want_to_delete_this_model_service'),
                    status: 'warning'
                }).then(() => {
                    removeService(data.uuid).then(() => {
                        Message({
                            message: this.t('sdxCommon.OperationSuccess'),
                            type: 'success'
                        });
                        this.getServices();
                    });
                });
            } else if(type === 'start') {
                startService(data.uuid).then(() => {
                    this.getServices();
                });
            } else if(type === 'stop') {
                stopService(data.uuid).then(() => {
                    this.getServices();
                });
            } else if (type === 'edit') {
                this.createServiceVisible = true;
            } else if(type === 'gray' ) {
                this.grayscaleReleaseVisible = true;
                getVersionList(data.modelId).then(res=> {
                    this.grayList = JSON.parse(JSON.stringify(res.items.filter(item => item.name !== data.versionName)));
                });
            } else if(type === 'test') {
                this.onlineTestingVisible = true;
            }
        },
        handlePageChange(index){
            this.current = index;
            this.getServices();
        },
        handleSearch() {
            this.current = 1;
            this.getServices();
        },
        // 服务列表
        getServices() {
            if (this._isDestroyed) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
            const params = Object.assign({}, this.params, {
                ...paginate(this.current, this.pageSize),
            });
            removeBlankAttr(params);
            getServiceList(params).then(res => {
                if (res.items.length && res.items.find(item => (item.state === 'Terminating' || item.state === 'Running' || item.state === 'Pending' || item.state === 'Scheduling' || item.state === 'Error'))) {
                    if (!this.refreshTimer && !this._isDestroyed) {
                        this.refreshTimer = setInterval(this.getServices, 5000);
                    }
                } else {
                    clearInterval(this.refreshTimer);
                    this.refreshTimer = null;
                }
                // 表展开后数据的处理
                let items = JSON.parse(JSON.stringify(res.items));
                let info =  [];
                if(items && items.length) {
                    for(let i = 0; i < items.length; i++) {
                        if(!items[i].versionUpgrade) {
                            info = [{
                                versionName: items[i].versionName,
                                instances: items[i].instances,
                                runtimeResource: items[i].runtimeResource,
                                updatedAt:  items[i].updatedAt,
                                startedAt: items[i].startedAt,
                                onlineTesting: items[i].state === 'Running',
                                trafficRatio: 1,
                                uuid: items[i].uuid,
                                capacity: true
                            }];
                        } else {
                            info = [{
                                versionName: items[i].versionUpgrade.versionName,
                                instances: items[i].versionUpgrade.instances,
                                trafficRatio: items[i].versionUpgrade.trafficRatio,
                                onlineTesting: items[i].state === 'Running',
                                updatedAt:  items[i].versionUpgrade.updatedAt,
                                startedAt: items[i].versionUpgrade.startedAt,
                                runtimeResource: items[i].runtimeResource,
                                state: this.t('view.model.New'),
                                uuid: items[i].uuid
                            },{
                                versionName: items[i].versionName,
                                instances: items[i].instances - items[i].versionUpgrade.instances,
                                runtimeResource: items[i].runtimeResource,
                                updatedAt:  items[i].updatedAt,
                                startedAt: items[i].startedAt,
                                onlineTesting: items[i].state === 'Running',
                                trafficRatio: 1 - items[i].versionUpgrade.trafficRatio,
                                state: this.t('view.model.Old'),
                                uuid: items[i].uuid
                            }];
                        }
                        items[i]['versionInfo'] = info;
                    }
                }
                this.table = items;
                this.total = res.total;
                this.tableLoading = false;
            }).catch(() => {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
                this.table = [];
                this.total = 0;
                this.tableLoading = false;
            });
        },
    }

};
</script>

<style lang="scss" scoped>
.sdxv-model-service {
    .title {
        font-size: 24px;
        color: #13264D;
        margin-bottom: 32px;
    }
    .table {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
        padding: 24px;
        margin-top: 24px;
        .btn-group {
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
        }
    }
    .sdxu-pagination {
        margin-top: 24px;
    }
}
</style>
