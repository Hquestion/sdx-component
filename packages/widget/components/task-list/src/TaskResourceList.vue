<template>
    <div class="sdxw-task-resource-list">
        <SdxwSearchLayout
            v-if="!ranking"
            @search="handleSearch"
            @reset="handleReset"
        >
            <SdxwSearchItem :label="t('view.task.searchName') + ':'">
                <SdxuInput
                    v-model="searchName"
                    type="search"
                    size="small"
                    :placeholder="t('view.task.searchPlaceholder')"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="t('view.task.taskType') + ':'">
                <el-select
                    v-model="taskType"
                    size="medium"
                >
                    <el-option
                        v-for="item in taskTypeList"
                        :key="item.value"
                        :label="t(item.label)"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="t('view.task.taskState') + ':'">
                <el-select
                    v-model="taskState"
                    size="medium"
                >
                    <el-option
                        v-for="item in taskStateList"
                        :key="item.value"
                        :label="t(item.label)"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <SdxwTaskRunningLimit
            v-if="!monitor"
            class="sdxw-task-resource-list__tips"
        />
        <SdxuTable
            class="sdxw-task-resource-list__table"
            :data="taskResourceList"
            @sort-change="handleSortChange"
            :default-sort="defaultSort"
            v-loading="loading"
            :empty-text="t('sdxCommon.NoData')"
        >
            <el-table-column
                prop="name"
                :label="t('view.task.taskName')"
                fixed
                min-width="150px"
            />
            <el-table-column
                prop="type"
                :label="t('view.task.taskType')"
                min-width="150px"
            >
                <template #default="{ row }">
                    {{ t(TASK_TYPE_LABEL[row.type]) }}
                </template>
            </el-table-column>
            <el-table-column
                :label="t('view.task.taskState')"
                min-width="100px"
            >
                <template #default="{ row }">
                    <SdxwFoldLabel
                        :plain="true"
                        :type="STATE_MAP_FOLD_LABEL_TYPE[row.state]"
                        :status="stateIcon(row.state)"
                    >
                        {{ t(STATE_TYPE_LABEL[row.state]) }}
                    </SdxwFoldLabel>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('view.task.taskProject')"
                min-width="160px"
            >
                <template #default="{ row }">
                    <span v-if="monitor">{{ row.project && row.project.name }}</span>
                    <span
                        v-else
                        @click="handleGotoProject(row.project)"
                        class="sdxw-task-resource-list__table--project-link"
                    >{{ row.project && row.project.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="CPU"
                :label="t('view.task.cpuUsed')"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="160px"
            >
                <template #default="{ row }">
                    {{ row.quota && row.quota.cpu / 1000 }}
                </template>
            </el-table-column>
            <el-table-column
                prop="MEMORY"
                :label="t('view.task.memoryUsed')"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="170px"
            >
                <template #default="{ row }">
                    {{ row.quota && row.quota.memory / (1024 * 1024 * 1024) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="GPU"
                :label="t('view.task.gpuUsed')"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="170px"
            >
                <template #default="{ row }">
                    <span v-if="row.quota && row.quota.gpu > 0">{{ `${row.quota && row.quota.gpuModel}: ${row.quota && row.quota.gpu}` }}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="owner.fullName"
                :label="t('sdxCommon.Creator')"
                min-width="100px"
            />
            <el-table-column
                prop="createdAt"
                :label="t('sdxCommon.CreatedTime')"
                :sortable="ranking ? false : 'custom'"
                :sort-orders="sortOrders"
                min-width="200px"
            >
                <template #default="{ row }">
                    <span>
                        {{ formatDate(row.createdAt) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Operation')"
                fixed="right"
                min-width="140px"
            >
                <template #default="{ row }">
                    <SdxuIconButtonGroup>
                        <SdxuIconButton
                            v-for="(item, i) in getOperationList(row, monitor)"
                            :key="i"
                            :icon="item.icon"
                            :title="t(item.label)"
                            @click="handleOperation(item.value, row)"
                        />
                    </SdxuIconButtonGroup>
                </template>
            </el-table-column>
        </SdxuTable>
        <Portal to="task-panination">
            <div
                v-if="!ranking"
                class="sdxw-task-resource-list__pagination"
            >
                <SdxuPagination
                    :current-page.sync="page"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                />
            </div>
        </Portal>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import SdxwTaskRunningLimit from '@sdx/widget/components/task-running-limit';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import * as Portal from 'portal-vue';

import { STATE_TYPE, STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE, TASK_TYPE, TASK_TYPE_LABEL, TASK_POLLING_STATE_TYPE } from '@sdx/utils/src/const/task';
import taskMixin from '@sdx/utils/src/mixins/task';
import locale from '@sdx/utils/src/mixins/locale';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import { getTaskList } from '@sdx/utils/src/api/project';

const POLLING_PERIOD = 3 * 1000;

export default {
    name: 'SdxwTaskResourceList',
    mixins: [taskMixin, locale],
    components: {
        SdxuTable,
        SdxuIconButton,
        SdxuIconButtonGroup,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        SdxuPagination,
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuInput,
        SdxwTaskRunningLimit,
        Portal: Portal.Portal,
        ElTableColumn,
        ElSelect,
        ElOption
    },
    props: {
        ranking: {
            type: Boolean,
            default: false
        },
        monitor: {
            type: Boolean,
            default: false
        },
        ownerId: {
            type: String,
            default: ''
        }
    },
    data() {
        // todo: 下拉框数据需要从接口请求
        this.STATE_TYPE = STATE_TYPE;
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        this.TASK_TYPE_LABEL = TASK_TYPE_LABEL;
        this.taskTypeList = Object.values(TASK_TYPE).map(item => {
            return {
                label: TASK_TYPE_LABEL[item],
                value: item
            };
        });
        this.taskTypeList.unshift({
            label: 'sdxCommon.ALL',
            value: ''
        });
        this.taskStateList = Object.values(STATE_TYPE).map(item => {
            return {
                label: STATE_TYPE_LABEL[item],
                value: item
            };
        });
        this.taskStateList.unshift({
            label: 'sdxCommon.ALL',
            value: ''
        });
        return {
            taskResourceList: [],
            total: 1,
            page: 1,
            pageSize: 10,
            taskType: '',
            taskState: '',
            searchName: '',
            defaultSort: {
                prop: 'CPU',
                order: 'descending'
            },
            params: {
                name: '',
                order: 'desc',
                orderBy: 'CPU',
                states: '',
                type: ''
            },
            loading: false,
            pollingId: null
        };
    },
    computed: {
        sortOrders() {
            return this.ranking ? ['descending'] : ['descending', 'ascending', null];
        },
        queryParams() {
            let params = this.ownerId ? { ownerId: this.ownerId } : {};
            params.isMonitor = this.monitor;
            if (this.ranking) {
                params.states = `${STATE_TYPE.RUNNING},${STATE_TYPE.LAUNCHING},${STATE_TYPE.KILLING}`;
            }
            return Object.assign({}, this.params, params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
        },
        needPolling() {
            return this.taskResourceList.some(item => {
                return TASK_POLLING_STATE_TYPE.includes(item.state);
            });
        }
    },
    methods: {
        fetchData(showLoading = true) {
            if (showLoading) {
                this.loading = true;
            }
            getTaskList(this.queryParams).then(data => {
                this.taskResourceList = data.items;
                this.total = data.total;
                this.loading = false;
            }).catch(() => {
                this.taskResourceList = [];
                this.total = 0;
                this.loading = false;
            });
        },
        stateIcon(state) {
            let icon = '';
            if ([STATE_TYPE.LAUNCHING, STATE_TYPE.RUNNING, STATE_TYPE.KILLING].includes(state)) {
                icon = 'loading';
            } else if ([STATE_TYPE.FAILED, STATE_TYPE.LAUNCH_ABNORMAL].includes(state)) {
                icon = 'warning';
            }
            return icon;
        },
        handlePageChange(page) {
            this.page = page;
        },
        handleSearch() {
            this.params.name = this.searchName.trim();
            this.params.states = this.taskState;
            this.params.type = this.taskType;
            this.page = 1;
        },
        handleReset() {
            this.searchName = '';
            this.taskState = '';
            this.taskType = '';
            this.handleSearch();
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'CPU';
            this.page = 1;
        },
        handleGotoProject(project) {
            if (project && project.uuid) {
                this.$router.push(`/sdxv-project-manage/project-detail/${project.uuid}`);
            } else {
                return false;
            }
        },
        formatDate(date) {
            return dateFormatter(date, 'YYYY-MM-DD HH:mm:ss');
        }
    },
    created() {
        this.fetchData();
        this.fetchDataMinxin = this.fetchData;
    },
    beforeDestroy() {
        this.pollingId && clearInterval(this.pollingId);
        this.pollingId = null;
    },
    watch: {
        queryParams() {
            this.fetchData();
        },
        needPolling(nval) {
            if (nval) {
                this.pollingId && clearInterval(this.pollingId);
                this.pollingId = setInterval(() => {
                    this.fetchData(false);
                }, POLLING_PERIOD);
            } else {
                this.pollingId && clearInterval(this.pollingId);
                this.pollingId = null;
            }
        }
    }
};
</script>

<style>

</style>
