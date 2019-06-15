<template>
    <div
        class="sdxv-general-running"
        v-loading="loading"
    >
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
                    >
                        <el-table-column
                            label="序号"
                            key="index"
                            prop="index"
                        />
                        <el-table-column
                            key="startTime"
                            label="执行开始时间"
                            prop="startTime"
                        />
                        <el-table-column
                            key="stopTime"
                            label="执行结束时间"
                            prop="stopTime"
                        />
                        <el-table-column
                            key="executeTime"
                            prop="executeTime"
                            label="执行时长"
                            sortable="custom"
                        />
                        <el-table-column
                            key="state"
                            label="状态"
                        >
                            1
                            <!-- <template slot-scope="scope">
                                <SdxwFoldLabel
                                    plain
                                    :type="scope.row.label.type"
                                    :status="scope.row.label.status"
                                >
                                    {{ scope.row.label.text }}
                                </SdxwFoldLabel>
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            key="operation"
                        >
                            <template slot-scope="props">
                                <sdxu-icon-button
                                    @click="handleSubOperation(props.row, 'remove')"
                                    icon="sdx-icon sdx-icon-delete"
                                    title="删除"
                                />
                            </template>
                        </el-table-column>
                    </sdxu-table>
                    <div class="sdxv-general-running__footer">
                        <div />
                        <sdxu-pagination
                            :current-page.sync="scope.row.subCurrent"
                            :page-size="scope.row.subPageSize"
                            :total="scope.row.subTotal"
                            @current-change="subCurrentChange"
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="任务名称"
                key="crontabName"
                prop="crontabName"
            />
            <el-table-column
                key="crontab"
                label="执行设置"
                prop="crontab"
            />
            <el-table-column
                key="submitAt"
                prop="submitAt"
                label="提交时间"
                sortable="custom"
            />
            <el-table-column
                label="操作"
                key="operation"
            >
                <template slot-scope="scope">
                    <sdxu-icon-button-group>
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'canvas')"
                            icon="sdx-icon sdx-huabu"
                            title="进入画布"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'copy')"
                            icon="sdx-icon sdx-kaobei"
                            v-if="scope.row.showCopy"
                            title="复制工作流"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'shutdown')"
                            icon="sdx-icon sdx-tingzhi"
                            title="停止运行"
                            v-if="scope.row.showShutdown"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'remove')"
                            icon="sdx-icon sdx-icon-delete"
                            title="删除"
                            v-if="scope.row.showRemove"
                        />
                    </sdxu-icon-button-group>
                </template>
            </el-table-column>
        </sdxu-table>
        <div class="sdxv-general-running__footer">
            <div />
            <sdxu-pagination
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
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import { getTimerRunningInfo, getSkyflowInfo, getTimerSubRunningInfo, removeTimerRunningSubTask } from '@sdx/utils/src/api/skyflow';
import { paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import CreateWorkflow from '../CreateWorkflow';
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
            total: 1,
            current: 1,
            pageSize: 10,
            isOwnWorkflow: false,
            createWorkflowVisible: false,
            editingWorkflow: null,
            skyflowInfo: null,
            expandingRow: null
        };
    },
    components: {
        [Table.name]: Table,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuIconButton,
        [Pagination.name]: Pagination,
        [CreateWorkflow.name]: CreateWorkflow,
        SdxuIconButtonGroup
    },
    props: {
        searchConditions: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        userId() {
            return getUser().userId || '111';
        }
    },
    created() {
        getSkyflowInfo(this.$route.params.id).then(res => {
            this.skyflowInfo = res;
            this.isOwnWorkflow = this.userId === res.user;
            this.initList();
        });
    },
    methods: {
        expand(row, expandedRows) {
            console.log('expandedRows', expandedRows);
            if (this.expandingRow) this.$refs.timerRunningTable.$refs.elTable.toggleRowExpansion(this.expandingRow, false);
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
        subSortChange(sort) {
            this.subOrderBy = 'executeTime';
            if (sort && sort.prop && sort.order) {
                this.subOrder = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initSubList();
            }
        },
        sortChange(sort) {
            this.orderBy = 'submitAt';
            if (sort && sort.prop && sort.order) {
                this.order = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initList();
            }
        },
        initSubList(reset) {
            this.$set(this.expandingRow, 'subLoading', true);
            const params = {
                skyflowCrontab: this.expandingRow.uuid,
                ...paginate(this.expandingRow.subCurrent, this.expandingRow.subPageSize),
                order: this.subOrder,
                orderBy: this.subOrderBy
            };
            getTimerSubRunningInfo(params).then(res => {
                this.$set(this.expandingRow, 'subRunningInfoList', res.items);
                this.$set(this.expandingRow, 'subTotal', res.total);
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
                    item.showCopy = item.state !== 'launching' && item.state !== 'running' && item.state !== 'stopping';
                    item.showRemove = this.isOwnWorkflow && item.state !== 'launching' && item.state !== 'running' && item.state !== 'stopping';
                    item.showShutdown = this.isOwnWorkflow && (item.state === 'launching' || item.state === 'running');
                });
                this.total = res.total;
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
                        title: '确定要删除该执行记录吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeTimerRunningSubTask(row.jobId).then(() => {
                            Message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.initSubList();
                        });
                    }).catch(() => {});
                    break;
                default:
                    break;
                }
            }
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'canvas':
                    break;
                case 'copy':
                    this.createWorkflowVisible = true;
                    this.editingWorkflow = { ...this.skyflowInfo };
                    break;
                case 'remove':
                    MessageBox({
                        title: '确定要删除该执行记录吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeGeneralRunningTask(row.uuid).then(() => {
                            Message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.initList();
                        });
                    }).catch(() => {});
                    break;
                case 'shutdown':
                    MessageBox({
                        title: '确定要终止当前工作流任务吗？',
                        status: 'warning'
                    }).then(() => {
                        shutdownGeneralRunningTask(row.uuid).then(() => {
                            Message({
                                message: '操作成功',
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
