<template>
    <div
        class="sdxv-general-running"
        v-loading="loading"
    >
        <sdxu-table
            :data="runningInfoList"
            @sort-change="sortChange"
        >
            <el-table-column
                label="工作流名称"
                key="name"
                prop="name"
            />
            <el-table-column
                key="executeKind"
                label="执行方式"
            >
                <template slot-scope="scope">
                    <div>
                        {{ executionKinds[scope.row.executeKind] || '' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                key="state"
                label="状态"
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
                label="执行开始时间"
            >
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.executeStart | dateFormatter }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                key="executeEnd"
                label="执行结束时间"
            >
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.executeEnd | dateFormatter }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                key="executeTime"
                label="执行时长"
                sortable="custom"
            >
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.executeTime | seconds2HMS }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                key="operation"
            >
                <template slot-scope="scope">
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
                </template>
            </el-table-column>
        </sdxu-table>
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
                'MANUAL': '手动',
                'RESUME': '续跑'
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
    mixins: [TimeFilter],
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
            this.orderBy = 'executeTime';
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
                        item.label.text = '运行中';
                        item.label.type = 'running';
                        item.label.status = 'loading';
                        break;
                    case 'launching':
                        item.label.text = '启动中';
                        item.label.type = 'processing';
                        item.label.status = 'loading';
                        break;
                    case 'failed':
                        item.label.text = '失败';
                        item.label.type = 'error';
                        item.label.status = 'warning';
                        break;
                    case 'stopping':
                        item.label.text = '终止中';
                        item.label.type = 'dying';
                        item.label.status = 'loading';
                        break;
                    case 'stopped':
                        item.label.text = '已终止';
                        item.label.type = 'die';
                        item.label.status = '';
                        break;
                    case 'succeeded':
                        item.label.text = '成功';
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
