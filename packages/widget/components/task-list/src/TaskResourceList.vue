<template>
    <div class="sdxw-task-resource-list">
        <SdxwSearchLayout
            v-if="!ranking"
            @search="handleSearch"
            @reset="handleReset"
        >
            <SdxwSearchItem label="名称搜索:">
                <SdxuInput
                    v-model="searchName"
                    type="search"
                    size="small"
                    placeholder="请输入任务名称、项目名称或创建人"
                />
            </SdxwSearchItem>
            <SdxwSearchItem label="任务类型:">
                <el-select
                    v-model="taskType"
                    size="medium"
                >
                    <el-option
                        v-for="item in taskTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem label="任务状态:">
                <el-select
                    v-model="taskState"
                    size="medium"
                >
                    <el-option
                        v-for="item in taskStateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <SdxuTable
            class="sdxw-task-resource-list__table"
            :data="taskResourceList"
            @sort-change="handleSortChange"
            :default-sort="defaultSort"
            v-loading="loading"
        >
            <el-table-column
                prop="name"
                label="任务名称"
                fixed
                min-width="150px"
            />
            <el-table-column
                prop="type"
                label="任务类型"
                min-width="150px"
            />
            <el-table-column
                label="任务状态"
                min-width="100px"
            >
                <template #default="{ row }">
                    <SdxwFoldLabel
                        :plain="true"
                        :type="STATE_MAP_FOLD_LABEL_TYPE[row.state]"
                        :status="stateIcon(row.state)"
                    >
                        {{ STATE_TYPE_LABEL[row.state] }}
                    </SdxwFoldLabel>
                </template>
            </el-table-column>
            <el-table-column
                label="所属项目"
                min-width="150px"
            >
                <template #default="{ row }">
                    <span v-if="monitor">{{ row.project.name }}</span>
                    <span
                        v-else
                        @click="handleGotoProject(row.project)"
                        class="sdxw-task-resource-list__table--project-link"
                    >{{ row.project.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="CPU"
                label="已使用CPU（核）"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="160px"
            >
                <template #default="{ row }">
                    {{ row.quota.cpu / 1000 }}
                </template>
            </el-table-column>
            <el-table-column
                prop="MEMORY"
                label="已使用内存（GB）"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="170px"
            >
                <template #default="{ row }">
                    {{ row.quota.memory / (1024 * 1024 * 1024) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="GPU"
                label="已使用GPU（块）"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="170px"
            >
                <template #default="{ row }">
                    <span v-if="row.quota.gpu > 0">{{ `${row.quota.gpuModel}: ${row.quota.gpu}` }}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="user.name"
                label="创建人"
                min-width="100px"
            />
            <el-table-column
                prop="createdAt"
                label="创建时间"
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
                label="操作"
                fixed="right"
                min-width="120px"
            >
                <template #default="{ row }">
                    <SdxuIconButtonGroup>
                        <SdxuIconButton
                            v-for="(item, i) in getOperationList(row, monitor)"
                            :key="i"
                            :icon="item.icon"
                            :title="item.label"
                            @click="handleOperation(item.value, row)"
                        />
                    </SdxuIconButtonGroup>
                </template>
            </el-table-column>
        </SdxuTable>
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

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';

import { STATE_TYPE, STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE, TASK_TYPE } from '@sdx/utils/src/const/task';
import taskMixin from '@sdx/utils/src/mixins/task';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import { getTaskList } from '@sdx/utils/src/api/project';

export default {
    name: 'SdxwTaskResourceList',
    mixins: [taskMixin],
    components: {
        SdxuTable,
        SdxuIconButton,
        SdxuIconButtonGroup,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        SdxuPagination,
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuInput,
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
        this.STATE_TYPE = STATE_TYPE;
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        this.taskTypeList = Object.values(TASK_TYPE).map(item => {
            return {
                label: item,
                value: item
            };
        });
        this.taskTypeList.unshift({
            label: '全部',
            value: ''
        });
        this.taskStateList = Object.values(STATE_TYPE).map(item => {
            return {
                label: item,
                value: item
            };
        });
        this.taskStateList.unshift({
            label: '全部',
            value: ''
        });
        return {
            taskResourceList: [],
            total: 100,
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
            loading: false
        };
    },
    computed: {
        sortOrders() {
            return this.ranking ? ['descending'] : ['descending', 'ascending', null];
        },
        queryParams() {
            let params = this.ownerId ? { ownerId: this.ownerId } : {};
            return Object.assign({}, params, this.params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
        }
    },
    methods: {
        fetchData() {
            this.loading = true;
            getTaskList(this.queryParams).then(data => {
                this.taskResourceList = data.items;
                this.total = data.total;
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
            this.params.name = this.searchName;
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
            this.$router.push(`/sdxv-project-manage/project-detail/${project.uuid}`);
        },
        formatDate(date) {
            return dateFormatter(date, 'YYYY-MM-DD HH:mm:ss');
        }
    },
    created() {
        this.fetchData();
        this.fetchDataMinxin = this.fetchData;
    },
    watch: {
        queryParams() {
            this.fetchData();
        }
    }
};
</script>

<style>

</style>
