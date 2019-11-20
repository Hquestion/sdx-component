<template>
    <div class="sdxv-task-manage-executelist">
        <div class="info">
            <div
                v-for="(item) in infoList"
                :key="item.title"
                :class="item.class"
            >
                <div>
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="total">
                        {{ item.total }}
                    </div>
                    <div class="progress">
                        <span>{{ t('view.task.tipCard.Manual') }}</span>
                        <el-progress
                            :stroke-width="8"
                            :percentage="item.percent"
                            color="#1144AB"
                            :show-text="false"
                        />
                        <span>{{ t('view.task.tipCard.Timing') }}</span>
                    </div>
                </div>
            </div>
        </div>
        <SdxwSearchLayout
            :label-width="lang$ ==='en' ? '120px' : '100px'"
            @search="handleSearch"
            @reset="handleReset"
        >
            <SdxwSearchItem :label="`${t('view.task.taskName')}：`">
                <SdxuInput
                    :placeholder="t('view.task.PleaseInput')"
                    v-model="params.name"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('sdxCommon.Creator')}：`">
                <SdxuInput
                    v-model="params.username"
                    :placeholder="t('view.task.PleaseInput')"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.SubordinateGroup')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.group"
                >
                    <el-option
                        v-for="item in groups"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.Type')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.type"
                >
                    <el-option
                        v-for="item in TASK_TYPE_LIST"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.executeType')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.executionType"
                >
                    <el-option
                        v-for="item in EXECUTE_TYPE_LIST"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('sdxCommon.Status')}：`">
                <el-select
                    size="large"
                    v-model="params.state"
                >
                    <el-option
                        v-for="item in STATE_TYPE_LIST"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.executeTimeRange')}：`">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    size="large"
                    :start-placeholder="t('view.task.startTime')"
                    :end-placeholder="t('view.task.stopTime')"
                    value-format="yyyy-MM-dd"
                />
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <div class="table">
            <sdxu-table
                :data="table"
                v-loading="tableLoading"
                @sort-change="handleSortChange"
                :default-sort="defaultSort"
            >
                <el-table-column
                    prop="uuid"
                    :label="t('view.task.executeID')"
                >
                    <template #default="{ row }">
                        {{ row.uuid.slice(0,5) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                />
                <el-table-column
                    prop="type"
                    :label="t('view.task.tipCard.Type')"
                />
                <el-table-column
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                />
                <el-table-column
                    :label="t('view.task.tipCard.SubordinateGroup')"
                >
                    <template #default="{ row }">
                        {{ getGroupsStr(row.owner && row.owner.groups) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="executeType"
                    :label="t('view.task.executeType')"
                >
                    <template #default="{ row }">
                        <span v-if="row.executeType === 'MANUAL'">{{ t('view.task.ManualExecution') }}</span>
                        <span v-else-if="row.executeType === 'CRONTAB'">{{ t('view.task.TimingExecution') }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="startedAt"
                    :label="t('view.task.startedAt')"
                    sortable
                    min-width="130px"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.startedAt) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stoppedAt"
                    :label="t('view.task.stoppedAt')"
                    sortable
                    min-width="130px"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.stoppedAt) }}
                    </template>
                </el-table-column>
                <el-table-column
                    sortable
                    min-width="100px"
                    :label="t('view.task.executeTime')"
                    prop="runningTime"
                >
                    <template #default="{ row }">
                        {{ timeDuration(row.startedAt, row.stoppedAt) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    :label="t('sdxCommon.Status')"
                >
                    <template #default="{ row }">
                        <SdxwFoldLabel
                            plain
                            :type="row.state"
                        >
                            {{ STATE_TYPE_LABEL[row.state] }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="130px"
                >
                    <template #default="{ row }">
                        <SdxuIconButtonGroup>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                                v-if="STATE_TYPE_OPERATION_ADMIN[row.state].includes('start')"
                                @click="handleOperate({row, type: 'start'})"
                            >
                                {{ t('sdxCommon.startUp') }}
                            </SdxuButton>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                                v-if="STATE_TYPE_OPERATION_ADMIN[row.state].includes('kill')"
                                @click="handleOperate({row, type: 'stop'})"
                            >
                                {{ t('sdxCommon.Stop') }}
                            </SdxuButton>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                                @click="handleOperate({row, type: 'detail'})"
                            >
                                {{ t('view.task.tipCard.Detail') }}
                            </SdxuButton>
                        </SdxuIconButtonGroup>
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
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';
import { Row, Col, Progress } from 'element-ui';
import {dateFormatter, timeDuration} from '@sdx/utils/src/helper/transform';
import { STATE_TYPE_LIST, EXECUTE_TYPE_LIST, STATE_TYPE, STATE_TYPE_LABEL, STATE_TYPE_OPERATION_ADMIN,TASK_TYPE_LIST} from '@sdx/utils/src/const/task';
import { getGroups } from '@sdx/utils/src/api/user';
import { executionList, startExecution, stopExecution, startTask, stopTask} from '@sdx/utils/src/api/task';
import { paginate, removeBlankAttr } from '@sdx/utils/src/helper/tool';
import SdxuPagination from '@sdx/ui/components/pagination';
import FoldLabel from '@sdx/widget/components/fold-label';
export default {
    name: 'SdxvExecuteList',
    data() {
        return {
            STATE_TYPE_LIST,
            EXECUTE_TYPE_LIST,
            STATE_TYPE,
            STATE_TYPE_LABEL,
            STATE_TYPE_OPERATION_ADMIN,
            TASK_TYPE_LIST,
            date: '',
            refreshTimer: null,
            infoList: [
                {
                    total: 0,
                    title: this.t('view.task.tipCard.TotalExecution'),
                    manual: 0,
                    dispatch: 0,
                    class: 'execute',
                    type: 'total'
                },
                {
                    total: 0,
                    title:  this.t('view.task.state.Scheduling'),
                    manual: 0,
                    dispatch: 0,
                    class: 'queuing',
                    type: 'scheduling'
                },
                {
                    total: 0,
                    title: this.t('view.task.state.Running'),
                    manual: 0,
                    dispatch: 0,
                    class: 'running',
                    type: 'running'
                },
                {
                    total: 0,
                    title: this.t('view.task.state.Succeeded'),
                    manual: 0,
                    dispatch: 0,
                    class: 'success',
                    type: 'success'
                },
                {
                    total: 0,
                    title: this.t('view.task.state.Failed'),
                    manual: 0,
                    dispatch: 0,
                    class: 'fail',
                    type: 'fail'
                },
            ],
            table: [],
            current: 1,
            pageSize: 10,
            total: 0,
            groups: [],
            tableLoading: false,
            params: {
                name: '',
                username: '',
                group: '',
                type: '',
                executionType: '',
                state: '',
                startedAt: '',
                stoppedAt: '',
                order: 'desc',
                orderBy: 'startedAt',
                start: 1,
                count: 10,
            },
            defaultSort: {
                prop: 'startedAt',
                order: 'descending'
            },
            savaParams: {}
        };
    },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        [Row.name]: Row,
        [Col.name]: Col,
        [Progress.name]: Progress,
        SdxuPagination,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
    },
    methods: {
        dateFormatter,
        timeDuration,
        getGroupsStr(groups) {
            let [arr,str] = [[], ''];
            if (!groups.length) {
                str = '';
            } else {
                groups.forEach(item => {
                    arr.push(item.name);
                });
                str = arr.join(',');
            }
            return str;
        },
        getGroupList(){
            const params = {
                start: 1,
                count: -1,
                order: 'desc',
                orderBy: 'createdAt',
            };
            getGroups(params).then(res => {
                res.groups.forEach(item => {
                    this.groups.push({
                        value: item.uuid,
                        label: item.name
                    });
                });
            });
        },
        handlePageChange(index){
            this.current = index;
            this.getExecutionList();
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop;
            this.current = 1;
            this.getExecutionList();
        },
        handleSearch() {
            this.current = 1;
            this.savaParams = JSON.parse(JSON.stringify(this.params));
            this.getExecutionList();
        },
        handleReset() {
            this.params = {
                name: '',
                username: '',
                group: '',
                type: '',
                executionType: '',
                state: '',
                startedAt: '',
                stoppedAt: '',
                start: 1,
                count: 10,
                order: this.params.order,
                orderBy: this.params.orderBy
            };
            this.savaParams = JSON.parse(JSON.stringify(this.params));
            this.date = [];
            this.current = 1;
            this.getExecutionList();
        },
        // 执行列表
        getExecutionList() {
            if (this._isDestroyed) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
            let date = this.date.length ? {
                startedAt: `${this.date[0]} 00:00:00`,
                stoppedAt: `${this.date[1]} 23:59:59`
            } : {};
            const params = Object.assign({}, this.savaParams, {
                ...paginate(this.current, this.pageSize), 
            }, date);
            removeBlankAttr(params);
            executionList(params).then(res => {
                if (res.data.length && res.data.find(item => (item.state === 'Terminating' || item.state === 'Running' || item.state === 'Pending' || item.state === 'Scheduling' || item.state === 'Error'))) {
                    if (!this.refreshTimer && !this._isDestroyed) {
                        this.refreshTimer = setInterval(this.getExecutionList, 5000);
                    }
                } else {
                    clearInterval(this.refreshTimer);
                    this.refreshTimer = null;
                }
                this.table = res.data;
                this.total = res.total;
                for(let i = 0; i < this.infoList.length; i++) {
                    this.infoList[i].total = res.detail[this.infoList[i].type].manual +  res.detail[this.infoList[i].type].schedule;
                    this.infoList[i].manual = res.detail[this.infoList[i].type].manual;
                    this.infoList[i].dispatch = res.detail[this.infoList[i].type].schedule;
                    if(this.infoList[i].total === 0) {
                        this.infoList[i].percent = 0;
                    } else {
                        this.infoList[i].percent = (this.infoList[i].manual / this.infoList[i].total) * 100;
                    }
                    
                }
                this.tableLoading = false;
            }).catch(() => {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
                this.table = [];
                this.total = 0;
                this.tableLoading = false;
            });
        },
        startTaskAPI(data) {
            if(data.type.toLocaleUpperCase() === 'SKYFLOW') {
                startExecution(data.uuid, data.executionId, {type: data.type});
            } else {
                startTask(data.uuid, {type: data.type});
            }
        },
        stopTaskAPI(data) {
            if(data.type.toLocaleUpperCase() === 'SKYFLOW') {
                stopExecution(data.row.uuid, data.row.executionId, {type: data.row.type});
            } else {
                stopTask(data.uuid, {type: data.type});
            }
        },
        async handleOperate(data) {
            if(data.type === 'start') {
                await this.startTaskAPI(data.row);
                this.getExecutionList();
            } else if (data.type === 'stop') {
                await this.stopTaskAPI(data.row);
                this.getExecutionList();
            } else if (data.type === 'detail') {
                this.$router.push({
                    name: 'SdxvTaskManagementTaskDetail',
                    params: {
                        taskId: data.row.uuid
                    }
                });
            }
        }
    },
    async created() {
        this.tableLoading = true;
        this.savaParams = JSON.parse(JSON.stringify(this.params));
        await this.getGroupList();
        await this.getExecutionList();
    },
    beforeDestroy () {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
    },
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-executelist {
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .info {
        margin:0  -12px;
        height: 152px;
        margin-bottom: 24px;
        &>div {
            width: 20%;
            text-align: center;
            padding: 0 12px;
            height: 152px;
            float: left;
            &>div {
                height: 152px;
                @extend .panel;
                padding: 20px;
                box-sizing: border-box;
                .total {
                    font-size: 48px;
                    height: 74px;
                    line-height: 74px;
                }
                .title {
                    display: inline-block;
                }
                .progress {
                    span {
                        font-size: 12px;
                        color: #6E7C94;
                    }
                }
            }
        }
        .execute {
            .total, .title {
                color: #1144AB;
            }
        }
        .queuing, .running {
            .total, .title {
                color: #FF9400;;
            }
        }
        .success {
            .total, .title {
                color: #008A56;
            }
        }
        .fail {
            .total, .title {
                color: #F11600;
            }
        }
        & /deep/ {
            .el-progress {
                display: inline-block;
                width: calc(100% - 60px);
                margin: 0 6px;
            }
        }
    }
    .table {
        @extend .panel;
        padding: 24px;
        margin-top: 24px;
        .sdxu-button {
            padding: 0;
        }
    }
    /deep/ {
        .el-date-editor--daterange.el-input__inner {
            width: auto;
            .el-range-input {
                &::placeholder {
                    color: #8E9BB1;
                }
            }
        }
    }
    .sdxu-pagination {
        margin-top: 24px;
    }
}
</style>
