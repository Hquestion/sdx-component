<template>
    <div
        class="sdxv-timer-running"
        v-loading="loading"
    >
        <div class="sdxv-timer-running__table">
            <sdxu-table
                :data="runningInfoList"
                @sort-change="sortChange"
                @expand-change="expand"
                row-key="uuid"
                ref="timerRunningTable"
            >
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <sdxu-table
                            :data="scope.row.subRunningInfoList"
                            @sort-change="subSortChange"
                            v-loading="scope.row.subLoading"
                            class="sdxv-timer-running__expand-table"
                        >
                            <el-table-column
                                :label="t('sdxCommon.Index')"
                                key="index"
                                prop="index"
                            />
                            <el-table-column
                                key="startTime"
                                :label="t('view.skyflow.columns.executeStart')"
                            >
                                <template slot-scope="prop">
                                    <div>
                                        {{ prop.row.startTime | dateFormatter }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                key="stopTime"
                                :label="t('view.skyflow.columns.executeEnd')"
                            >
                                <template slot-scope="prop">
                                    <div>
                                        {{ prop.row.stopTime | dateFormatter }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                key="executeTime"
                                :label="t('view.skyflow.columns.executeTime')"
                                sortable="custom"
                            >
                                <template slot-scope="prop">
                                    <div>
                                        {{ prop.row.executeTime | seconds2HMS }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                key="state"
                                :label="t('view.skyflow.columns.state')"
                            >
                                <template slot-scope="prop">
                                    <SdxwFoldLabel
                                        plain
                                        :type="prop.row.label.type"
                                        :status="prop.row.label.status"
                                    >
                                        {{ prop.row.label.text }}
                                    </SdxwFoldLabel>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="t('sdxCommon.Operation')"
                                key="operation"
                            >
                                <template slot-scope="props">
                                    <sdxu-icon-button
                                        @click="handleSubOperation(props.row, 'canvas')"
                                        icon="sdx-icon sdx-huabu"
                                        :title="t('view.skyflow.canvas')"
                                    />
                                    <sdxu-icon-button
                                        @click="handleSubOperation(props.row, 'remove')"
                                        icon="sdx-icon sdx-icon-delete"
                                        :title="t('sdxCommon.Delete')"
                                        v-if="isOwnWorkflow"
                                    />
                                </template>
                            </el-table-column>
                        </sdxu-table>
                        <div class="sdxv-timer-running__footer">
                            <div />
                            <sdxu-pagination
                                v-if="scope.row.subTotal"
                                :current-page.sync="scope.row.subCurrent"
                                :page-size="scope.row.subPageSize"
                                :total="scope.row.subTotal"
                                @current-change="subCurrentChange"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('view.skyflow.columns.taskName')"
                    key="crontabName"
                    prop="crontabName"
                />
                <el-table-column
                    key="crontab"
                    :label="t('view.skyflow.columns.setting')"
                    prop="crontab"
                />
                <el-table-column
                    key="submitAt"
                    :label="t('view.skyflow.columns.submitTime')"
                    sortable="custom"
                >
                    <template slot-scope="prop">
                        <div>
                            {{ prop.row.submitAt | dateFormatter }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    key="state"
                    :label="t('view.skyflow.columns.state')"
                >
                    <template slot-scope="prop">
                        <SdxwFoldLabel
                            plain
                            :type="prop.row.label.type"
                            :status="prop.row.label.status"
                        >
                            {{ prop.row.label.text }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    key="operation"
                >
                    <template slot-scope="scope">
                        <sdxu-icon-button-group>
                            <sdxu-icon-button
                                @click="handleOperation(scope.row, 'run')"
                                icon="sdx-icon sdx-icon-yunxing"
                                v-if="scope.row.showRun"
                                :title="t('sdxCommon.Run')"
                            />
                            <sdxu-icon-button
                                @click="handleOperation(scope.row, 'shutdown')"
                                icon="sdx-icon sdx-tingzhi"
                                :title="t('sdxCommon.Stop')"
                                v-if="scope.row.showShutdown"
                            />
                            <sdxu-icon-button
                                @click="handleOperation(scope.row, 'copy')"
                                icon="sdx-icon sdx-kaobei"
                                :title="t('view.skyflow.copyWorkflow')"
                            />
                            <sdxu-icon-button
                                @click="handleOperation(scope.row, 'edit')"
                                icon="sdx-icon sdx-icon-edit"
                                v-if="scope.row.showEdit"
                                :title="t('view.skyflow.columns.runningSetting')"
                            />
                            <sdxu-icon-button
                                @click="handleOperation(scope.row, 'remove')"
                                icon="sdx-icon sdx-icon-delete"
                                :title="t('sdxCommon.Delete')"
                                v-if="scope.row.showRemove"
                            />
                        </sdxu-icon-button-group>
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
        <div class="sdxv-timer-running__footer">
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
        <timer-running-task-edit
            :visible.sync="editDialogVisible"
            v-if="editDialogVisible"
            :data="editingTask"
            @close="editDialogClose"
        />
    </div>
</template>

<script>
import Table from '@sdx/ui/components/table';
import FoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import { getTimerRunningInfo, getSkyflowInfo, getTimerSubRunningInfo, startTimerRunningTask, shutdownTimerRunningTask, removeTimerRunningTask, removeTimerRunningSubTask } from '@sdx/utils/src/api/skyflow';
import { paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import CreateWorkflow from '../CreateWorkflow';
import TimerRunningTaskEdit from './TimerRunningTaskEdit';
import TimeFilter from '@sdx/utils/src/mixins/transformFilter';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'TimerRunning',
    data() {
        return {
            runningInfoList: [],
            subOrder: '',
            subOrderBy: '',
            order: '',
            orderBy: '',
            loading: false,
            total: 0,
            current: 1,
            pageSize: 10,
            isOwnWorkflow: false,
            createWorkflowVisible: false,
            editDialogVisible: false,
            editingWorkflow: null,
            skyflowInfo: null,
            expandingRow: null,
            editingTask: null
        };
    },
    components: {
        [Table.name]: Table,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuIconButton,
        [Pagination.name]: Pagination,
        [CreateWorkflow.name]: CreateWorkflow,
        SdxuIconButtonGroup,
        TimerRunningTaskEdit
    },
    props: {
        searchConditions: {
            type: Object,
            default: () => {}
        }
    },
    mixins: [TimeFilter, locale],
    created() {
        getSkyflowInfo(this.$route.params.id).then(res => {
            this.skyflowInfo = res;
            this.isOwnWorkflow = getUser().userId === res.user;
            this.initList();
        });
    },
    methods: {
        expand(row) {
            if (this.expandingRow !== row) this.$refs.timerRunningTable.$refs.elTable.toggleRowExpansion(this.expandingRow, false);
            this.expandingRow = row;
            if (!this.expandingRow.subRunningInfoList) {
                this.$nextTick(() => {
                    this.initSubList(true);
                });
            }
        },
        createWorkflowClose() {
            this.editingWorkflow = null;
        },
        editDialogClose(needRefresh) {
            if (needRefresh) this.initList();
            this.editingTask = null;
        },
        subSortChange(sort) {
            this.subOrderBy = 'executeTime';
            if (sort && sort.order) {
                this.subOrder = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initSubList();
            }
        },
        sortChange(sort) {
            this.orderBy = 'submitAt';
            if (sort && sort.order) {
                this.order = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initList();
            }
        },
        initSubList(reset) {
            this.$set(this.expandingRow, 'subLoading', true);
            const params = {
                skyflowCrontab: this.expandingRow.uuid,
                ...paginate(this.expandingRow.subCurrent || 1, this.expandingRow.subPageSize || 10),
                order: this.subOrder,
                orderBy: this.subOrderBy
            };
            getTimerSubRunningInfo(params).then(res => {
                res.items && res.items.forEach(item => {
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
                this.$set(this.expandingRow, 'subRunningInfoList', res.items || []);
                this.$set(this.expandingRow, 'subTotal', res.total || 0);
                this.$set(this.expandingRow, 'subLoading', false);
                if (reset) {
                    this.$set(this.expandingRow, 'subCurrent', 1);
                    this.$set(this.expandingRow, 'subPageSize', 10);
                }
            });
        },
        initList(reset) {
            this.loading = true;
            if (reset) this.current = 1;
            if (this.expandingRow) this.$refs.timerRunningTable.$refs.elTable.toggleRowExpansion(this.expandingRow, false);
            const params = {
                ...this.searchConditions,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy,
                skyflow: this.$route.params.id
            };
            getTimerRunningInfo(params).then(res => {
                this.runningInfoList = res.items;
                this.runningInfoList.forEach(item => {
                    item.showRun = this.isOwnWorkflow && item.state === 'stopped';
                    item.showEdit = this.isOwnWorkflow && item.state === 'stopped';
                    item.showRemove = this.isOwnWorkflow && item.state !== 'cronRunning';
                    item.showShutdown = this.isOwnWorkflow && (item.state === 'cronRunning' || item.state === 'succeeded');
                    item.label = {};
                    switch(item.state) {
                    case 'succeeded':
                        item.label.text = this.t('view.skyflow.states.succeeded');
                        item.label.type = 'create';
                        item.label.status = '';
                        break;
                    case 'failed':
                        item.label.text = this.t('view.skyflow.states.failed');
                        item.label.type = 'error';
                        item.label.status = 'warning';
                        break;
                    case 'cronRunning':
                        item.label.text = this.t('view.skyflow.states.cronRunning');
                        item.label.type = 'running';
                        item.label.status = 'loading';
                        break;
                    case 'stopped':
                        item.label.text = this.t('view.skyflow.states.stopped');
                        item.label.type = 'die';
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
        subCurrentChange(nVal) {
            this.$set(this.expandingRow, 'subCurrent', nVal);
            this.initSubList();
        },
        handleSubOperation(row, type) {
            if (type && row) {
                switch (type) {
                case 'remove':
                    MessageBox({
                        title: this.t('view.skyflow.removeRuntimeConfirm'),
                        content: this.t('sdxCommon.ConfirmRemove')
                    }).then(() => {
                        removeTimerRunningSubTask(row.jobId, { skyflowCrontab : this.expandingRow.uuid}).then(() => {
                            Message({
                                message: this.t('sdxCommon.RemoveSuccess'),
                                type: 'success'
                            });
                            this.initSubList();
                        });
                    }).catch(() => {});
                    break;
                case 'canvas':
                    window.open(`${window.location.origin}/#/editor/${this.$route.params.id}/${this.expandingRow.uuid}`);
                    break;
                default:
                    break;
                }
            }
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'edit':
                    this.editDialogVisible = true;
                    this.editingTask = row;
                    break;
                case 'copy':
                    this.createWorkflowVisible = true;
                    this.editingWorkflow = { ...this.skyflowInfo };
                    break;
                case 'remove':
                    MessageBox({
                        title: this.t('view.skyflow.removeTimerTaskConfirm'),
                        content: this.t('sdxCommon.ConfirmRemove'),
                    }).then(() => {
                        removeTimerRunningTask(row.uuid).then(() => {
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
                        title: this.t('view.skyflow.stopTimerTaskConfirm'),
                        status: 'warning'
                    }).then(() => {
                        shutdownTimerRunningTask(row.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.OperationSuccess'),
                                type: 'success'
                            });
                            this.initList();
                        });
                    }).catch(() => {});
                    break;
                case 'run':
                    MessageBox({
                        title: this.t('view.skyflow.runTaskConfirm'),
                        status: 'warning'
                    }).then(() => {
                        startTimerRunningTask(row.uuid).then(() => {
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
