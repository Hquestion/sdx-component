<template>
    <div class="sdxv-task-execute-list">
        <div class="sdxv-task-execute-list__filter">
            <SdxwSearchLayout
                @search="handleSearch"
                @reset="handleReset"
                :label-width="lang$ ==='en' ? '120px' : '80px'"
            >
                <SdxwSearchItem :label="t('view.task.taskName') + ':'">
                    <SdxuInput
                        v-model="taskName"
                        :placeholder="t('view.task.PleaseInput')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('sdxCommon.Creator') + ':'">
                    <SdxuInput
                        v-model="creator"
                        :placeholder="t('view.task.PleaseInput')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.taskType') + ':'">
                    <el-select
                        v-model="selectedType"
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in taskTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeType') + ':'">
                    <el-select
                        v-model="selectedExecuteType"
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in executeTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.taskState') + ':'">
                    <el-select
                        v-model="selectedState"
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in taskStateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeTimeRange') + ':'">
                    <el-date-picker
                        v-model="selectedDate"
                        type="daterange"
                        size="large"
                        value-format="yyyy-MM-dd"
                        :start-placeholder="t('view.task.startTime')"
                        :end-placeholder="t('view.task.stopTime')"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="sdxv-task-execute-list__table">
            <SdxuTable
                :data="taskResourceList"
                @sort-change="handleSortChange"
                :default-sort="defaultSort"
                v-loading="loading"
                :empty-text="t('sdxCommon.NoData')"
                :row-key="row => row.uuid"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                    min-width="112px"
                />
                <el-table-column
                    prop="uuid"
                    :label="t('view.task.executeID')"
                    min-width="56px"
                >
                    <template #default="{ row }">
                        <span v-if="row.state === TASK_TYPE.SKYFLOW">
                            {{ row.uuid }}    
                        </span>
                        <span v-else>
                            -    
                        </span>                      
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    :label="t('view.task.taskType')"
                    min-width="72px"
                >
                    <template #default="{ row }">
                        {{ TASK_TYPE_LABEL[row.type] }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                    min-width="64px"
                />
                <el-table-column
                    prop="executeType"
                    :label="t('view.task.executeType')"
                    min-width="70px"
                >
                    <template #default="{ row }">
                        {{ EXECUTE_TYPE_LABEL[row.executeType] }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="startedAt"
                    :label="t('view.task.startedAt')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="132px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ dateFormatter(row.startedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stoppedAt"
                    :label="t('view.task.stoppedAt')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="132px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ dateFormatter(row.stoppedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="runningTime"
                    :label="t('view.task.executeTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="88px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ timeDuration(row.startedAt, row.stoppedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('view.task.taskState')"
                    :min-width="lang$ === 'en' ? '100px' : '72px'"
                >
                    <template #default="{ row }">
                        <SdxwFoldLabel
                            :plain="true"
                            :type="STATE_MAP_FOLD_LABEL_TYPE[row.state]"
                        >
                            {{ STATE_TYPE_LABEL[row.state] }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    fixed="right"
                    min-width="140px"
                >
                    <template #default="{ row }">
                        <SdxuButtonGroup>
                            <SdxuButton
                                v-for="(item, i) in getOperationList(row.state)"
                                type="link"
                                :key="i"
                                @click="handleOperation(item.value, row)"
                            >
                                {{ item.label }}
                            </SdxuButton>
                        </SdxuButtonGroup>
                    </template>
                </el-table-column>
            </SdxuTable>
            <SdxuPagination
                class="sdxv-task-execute-list__table--pagination"
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
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuButtonGroup from '@sdx/ui/components/button-group';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { executionList } from '@sdx/utils/src/api/task';
import locale from '@sdx/utils/src/mixins/locale';
import taskExecution from '@sdx/utils/src/mixins/taskExecution';
import { TASK_TYPE, TASK_TYPE_LIST, EXECUTE_TYPE_LABEL, EXECUTE_TYPE_LIST, STATE_TYPE_LIST, STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE, TASK_TYPE_LABEL, TASK_POLLING_STATE_TYPE, STATE_TYPE_OPERATION, OPERATION_INFO } from '@sdx/utils/src/const/task';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElDatePicker from 'element-ui/lib/date-picker';

const POLLING_PERIOD = 3 * 1000;

export default {
    mixins: [locale, taskExecution],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        [SdxwFoldLabel.FoldLabelGroup.name]: SdxwFoldLabel.FoldLabelGroup,
        SdxuTable,
        SdxuPagination,
        SdxuInput,
        SdxuButtonGroup,
        SdxuButton,
        ElDatePicker,
        ElTableColumn,
        ElSelect,
        ElOption
    },
    data() {
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        this.TASK_TYPE_LABEL = TASK_TYPE_LABEL;
        this.STATE_TYPE_OPERATION = STATE_TYPE_OPERATION;
        this.OPERATION_INFO = OPERATION_INFO;
        this.TASK_TYPE = TASK_TYPE;
        this.EXECUTE_TYPE_LABEL = EXECUTE_TYPE_LABEL;
        return {
            taskName: '',
            creator: '',
            page: 1,
            pageSize: 10,
            total: 0,
            currentUser: getUser(),
            loading: false,
            defaultSort: {
                prop: 'startedAt',
                order: 'descending'
            },
            sortOrders: ['descending', 'ascending', null],
            taskTypeList: TASK_TYPE_LIST,
            taskStateList: STATE_TYPE_LIST,
            executeTypeList: EXECUTE_TYPE_LIST,
            selectedType: '',
            selectedState: '',
            selectedExecuteType: '',
            selectedDate: '',
            // taskResourceList: data,
            taskResourceList: [],
            params: {
                name: '',
                username: '',
                order: 'desc',
                orderBy: 'startedAt',
                ownerId: '',
                type: '',
                executeType: '',
                state: '',
                startedAt: '',
                stoppedAt: '',
                start: 1, 
                count: 10
            },
            paramDate: '',
            pollingId: 0
        };
    },
    computed: {
        queryParams() {
            let params = {
                // ownerId: this.currentUser.userId
            };
            if (Array.isArray(this.paramDate)) {
                params.startedAt = +new Date(this.paramDate[0] + ' 00:00:00') / 1000;
                params.stoppedAt = +new Date(this.paramDate[1] + ' 23:59:59') / 1000;
            }
            let obj = Object.assign({}, this.params, params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
            this.removeBlankAttr(obj);
            return obj;
        }
    },
    methods: {
        fetchData(showLoading = true) {
            this.loading = showLoading;
            executionList(this.queryParams)
                .then(data => {
                    this.taskResourceList = data.data;
                    this.total = data.total;
                    this.loading = false;
                    if (this.taskResourceList.some(item =>  {
                        return TASK_POLLING_STATE_TYPE.includes(item.state);
                    })) {
                        this.startPolling();
                    }
                })
                .catch(err => {
                    window.console.error(err);
                    this.taskResourceList = [];
                    this.loading = false;
                });
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'startedAt';
            this.page = 1;
        },
        handlePageChange(page) {
            this.page = page;
        },
        handleSearch() {
            this.params.type = this.selectedType;
            this.params.executeType = this.selectedExecuteType;
            this.params.state = this.selectedState;
            this.params.name = this.taskName;
            this.params.username = this.creator;
            this.paramDate = this.selectedDate;
            this.page = 1;
        },
        handleReset() {
            this.selectedType = '';
            this.selectedState = '';
            this.selectedExecuteType = '';
            this.selectedDate = '';
            this.taskName = '';
            this.creator = '';
            this.handleSearch();
        },
        startPolling() {
            if (!this._isDestroyed) {
                this.pollingId && clearTimeout(this.pollingId);
                this.pollingId = setTimeout(() => {
                    this.fetchData(false);
                }, POLLING_PERIOD);
            }
        },
        stopPolling() {
            this.pollingId && clearTimeout(this.pollingId);
            this.pollingId = null;
        },
        getOperationList(state) {
            let arr = STATE_TYPE_OPERATION[state] || [];
            return arr.map(item => OPERATION_INFO[item]);
        }
    },
    created() {
        this.fetchData();
        this.fetchDataMinxin = this.fetchData;
    },
    beforeDestroy() {
        this.stopPolling();
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
