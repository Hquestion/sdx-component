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
            >
                <el-table-column type="expand">
                    <template #default="{row}">
                        <sdxu-table light>
                            <el-table-column
                                
                                :label="t('view.model.Model_Version')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Instances')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Resource')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Flow_ratio')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Running_time')"
                            />
                            <el-table-column
                                
                                :label="t('view.file.UpdatedAt')"
                            />
                            <el-table-column
                                
                                :label="t('sdxCommon.Status')"
                            />
                            <el-table-column
                                :label="t('sdxCommon.Operation')"
                                min-width="172px"
                            >
                                <template #default="{ row }">
                                    <SdxuButton
                                        size="regular"
                                        type="link"
                                    >
                                        {{ t('view.task.tipCard.Detail') }} 
                                    </SdxuButton>
                                    <SdxuButton
                                        type="link"
                                        size="regular"
                                    >
                                        {{ t('sdxCommon.Delete') }}
                                    </SdxuButton>
                                </template>
                            </el-table-column>
                        </sdxu-table> 
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
        <OnlineTesting :visible.sync="onlineTestingVisible" />
        <PublishPlatform :visible.sync="publishPlatformVisible" />
        <GrayscaleRelease :visible.sync="grayscaleReleaseVisible" />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { getServiceList,removeService,stopService,startService } from '@sdx/utils/src/api/model';
import { paginate,removeBlankAttr} from '@sdx/utils/src/helper/tool';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import OnlineTesting from '../service-dialog/OnlineTesting';
import PublishPlatform from '../service-dialog/PublishPlatform';
import GrayscaleRelease from '../service-dialog/GrayscaleRelease';
import { Select,Option, Message} from 'element-ui';
import FoldLabel from '@sdx/widget/components/fold-label';
import {  STATE_TYPE_LABEL,  STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE} from '@sdx/utils/src/const/task';
import MessageBox from '@sdx/ui/components/message-box';
import SdxuButtonGroup from '@sdx/ui/components/button-group';
import {  OPERATION_INFO,STATE_MODEL_SERVICE_OPERATION} from '@sdx/utils/src/const/model';
import ResourceAlert from '@sdx/widget/components/resource-alert';
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
            table: [],
            refreshTimer: null,
        };
    },
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        SdxuPagination,
        OnlineTesting,
        PublishPlatform,
        GrayscaleRelease,
        [Select.name]: Select,
        [Option.name]: Option,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuButtonGroup,
        [ResourceAlert.name]: ResourceAlert,
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
        // 服务详情
        serviceDetail(uuid) {
            this.$router.push({
                path: `/sdxv-model-manage-service/detail/${uuid}`,
            });
        },
        getOperationList(state) {
            let arr = this.STATE_MODEL_SERVICE_OPERATION[state] || [];
            return arr.map(item => this.OPERATION_INFO[item]);
        },
        handleOperation(type,data) {
            if(type === 'remove') {
                MessageBox({
                    title: this.t('view.model.Model_deletion_prompt'),
                    content: this.t('view.model.Are_you_sure_you_want_to_delete_this_model_service'),
                    status: 'warning'
                }).then(() => {
                    removeService(data.uuid).then(() => {
                        Message({
                            message: this.t('sdxCommon.RemoveSuccess'),
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
                this.table = res.items;
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
    }
    .sdxu-pagination {
        margin-top: 24px;
    }
}
</style>