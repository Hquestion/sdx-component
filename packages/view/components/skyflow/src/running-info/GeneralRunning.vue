<template>
    <div
        class="sdxv-general-running"
        v-loading="loading"
    >
        <div
            class="sdxv-general-running__table"
        >
            <sdxu-table
                :data="runningInfoList"
                @sort-change="sortChange"
            >
                <el-table-column
                    :label="t('view.skyflow.columns.name')"
                    key="name"
                    prop="name"
                />
                <el-table-column
                    key="executeKind"
                    :label="t('view.skyflow.columns.executeKind')"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ executionKinds[scope.row.executeKind] || '' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    key="state"
                    :label="t('view.skyflow.columns.state')"
                >
                    <template slot-scope="scope">
                        <SdxwFoldLabel
                            plain
                            :type="scope.row.label.type"
                            :status="scope.row.label.status"
                        >
                            {{ scope.row.label.text }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    key="executeStart"
                    :label="t('view.skyflow.columns.executeStart')"
                    sortable="custom"
                    prop="executeStart"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.executeStart | dateFormatter }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    key="executeEnd"
                    :label="t('view.skyflow.columns.executeEnd')"
                    prop="executeEnd"
                    sortable="custom"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.executeEnd | dateFormatter }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    key="executeTime"
                    prop="executeTime"
                    :label="t('view.skyflow.columns.executeTime')"
                    sortable="custom"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.executeTime | seconds2HMS }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    key="operation"
                >
                    <template slot-scope="scope">
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'canvas')"
                            icon="sdx-icon sdx-huabu"
                            :title="t('view.skyflow.canvas')"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'copy')"
                            icon="sdx-icon sdx-kaobei"
                            v-if="scope.row.showCopy"
                            :title="t('view.skyflow.copyWorkflow')"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'shutdown')"
                            icon="sdx-icon sdx-tingzhi"
                            :title="t('sdxCommon.Stop')"
                            v-if="scope.row.showShutdown"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'remove')"
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                            v-if="scope.row.showRemove"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
        <div class="sdxv-general-running__footer">
            <div />
            <sdxu-pagination
                v-if="total"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <sdxv-create-workflow
            :visible.sync="createWorkflowVisible"
            v-if="createWorkflowVisible"
            @close="createWorkflowClose"
            :data="editingWorkflow"
            is-copying
        />
    </div>
</template>

<script>
import Table from '@sdx/ui/components/table';
import FoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import { getGeneralRunningInfo, getSkyflowInfo, shutdownGeneralRunningTask, removeGeneralRunningTask } from '@sdx/utils/src/api/skyflow';
import { paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import CreateWorkflow from '../CreateWorkflow';
import TimeFilter from '@sdx/utils/src/mixins/transformFilter';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'GeneralRunnning',
    data() {
        return {
            runningInfoList: [],
            order: '',
            orderBy: '',
            loading: false,
            total: 0,
            current: 1,
            pageSize: 10,
            executionKinds: {
                'MANUAL': this.t('view.skyflow.manual'),
                'RESUME': this.t('view.skyflow.resume')
            },
            isOwnWorkflow: false,
            createWorkflowVisible: false,
            editingWorkflow: null,
            skyflowInfo: null
        };
    },
    components: {
        [Table.name]: Table,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuIconButton,
        [Pagination.name]: Pagination,
        [CreateWorkflow.name]: CreateWorkflow
    },
    mixins: [TimeFilter, locale],
    props: {
        searchConditions: {
            type: Object,
            default: () => {}
        }
    },
    created() {
        getSkyflowInfo(this.$route.params.id).then(res => {
            this.skyflowInfo = res;
            this.isOwnWorkflow = getUser().userId === res.user;
            this.initList();
        });
    },
    methods: {
        createWorkflowClose() {
            this.editingWorkflow = null;
        },
        sortChange(sort) {
            this.orderBy = sort.prop;
            if (sort && sort.order) {
                this.order = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initList();
            }
        },
        initList(reset) {
            this.loading = true;
            if (reset) this.current = 1;
            const params = {
                ...this.searchConditions,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy,
                skyflow: this.$route.params.id
            };
            getGeneralRunningInfo(params).then(res => {
                this.runningInfoList = res.items;
                this.runningInfoList.forEach(item => {
                    item.showCopy = item.state !== 'launching' && item.state !== 'running' && item.state !== 'stopping';
                    item.showRemove = this.isOwnWorkflow && item.state !== 'launching' && item.state !== 'running' && item.state !== 'stopping';
                    item.showShutdown = this.isOwnWorkflow && (item.state === 'launching' || item.state === 'running');
                    item.label = {};
                    switch(item.state) {
                    case 'running':
                        item.label.text = this.t('view.task.state.RUNNING');
                        item.label.type = 'running';
                        item.label.status = 'loading';
                        break;
                    case 'launching':
                        item.label.text = this.t('view.task.state.LAUNCHING');
                        item.label.type = 'processing';
                        item.label.status = 'loading';
                        break;
                    case 'failed':
                        item.label.text = this.t('view.task.state.FAILED');
                        item.label.type = 'error';
                        item.label.status = 'warning';
                        break;
                    case 'stopping':
                        item.label.text = this.t('view.task.state.KILLING');
                        item.label.type = 'dying';
                        item.label.status = 'loading';
                        break;
                    case 'stopped':
                        item.label.text = this.t('view.task.state.KILLED');
                        item.label.type = 'die';
                        item.label.status = '';
                        break;
                    case 'succeeded':
                        item.label.text = this.t('view.monitor.componentState.state.succeeded');
                        item.label.type = 'create';
                        item.label.status = '';
                        break;
                    default:
                        break;
                    }
                });
                this.total = res.total;
            }).finally(() => {
                this.loading = false;
            });
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initList();
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'canvas':
                    window.open(`${window.location.origin}/#/editor/${this.$route.params.id}/${row.uuid}`);
                    break;
                case 'copy':
                    this.createWorkflowVisible = true;
                    this.editingWorkflow = { ...this.skyflowInfo };
                    break;
                case 'remove':
                    MessageBox({
                        title: this.t('view.skyflow.removeRuntimeConfirm'),
                        content: this.t('sdxCommon.ConfirmRemove')
                    }).then(() => {
                        removeGeneralRunningTask(row.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.RemoveSuccess'),
                                type: 'success'
                            });
                            this.initList();
                        });
                    }).catch(() => {});
                    break;
                case 'shutdown':
                    MessageBox({
                        title: this.t('view.skyflow.shutdownTaskConfirm'),
                        status: 'warning'
                    }).then(() => {
                        shutdownGeneralRunningTask(row.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.OperationSuccess'),
                                type: 'success'
                            });
                            this.initList();
                        });
                    }).catch(() => {});
                    break;
                default:
                    break;
                }
            }
        }
    }
};
</script>
