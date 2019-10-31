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
                        :placeholder="t('view.task.PleaseEnter')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('sdxCommon.Creator') + ':'">
                    <SdxuInput
                        v-model="creator"
                        :placeholder="t('view.task.PleaseEnter')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.taskType') + ':'">
                    <el-select
                        v-model="selectedType"
                        size="large"
                    >
                        <el-option
                            v-for="item in taskTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeType') + ':'">
                    <el-select
                        v-model="selectedExecuteType"
                        size="large"
                    >
                        <el-option
                            v-for="item in executeTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.taskState') + ':'">
                    <el-select
                        v-model="selectedState"
                        size="large"
                    >
                        <el-option
                            v-for="item in taskStateList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeTimeRange') + ':'">
                    <el-date-picker
                        v-model="selectedDate"
                        type="daterange"
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
            >
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                    min-width="112px"
                />
                <el-table-column
                    prop=""
                    :label="t('view.task.executeID')"
                    min-width="56px"
                />
                <el-table-column
                    prop="type"
                    :label="t('view.task.taskType')"
                    min-width="72px"
                >
                    <template #default="{ row }">
                        {{ t(TASK_TYPE_LABEL[row.type]) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                    min-width="64px"
                />
                <el-table-column
                    prop=""
                    :label="t('view.task.executeType')"
                    min-width="70px"
                />
                <el-table-column
                    prop="startedAt"
                    :label="t('view.task.executeStartTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="120px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.startedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stoppedAt"
                    :label="t('view.task.executeStopTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="120px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.stoppedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('view.task.executeTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="88px"
                >
                    <template #default="{ row }">
                        <span>
                        <!-- // todo: -->
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
                            :status="stateIcon(row.state)"
                        >
                            {{ t(STATE_TYPE_LABEL[row.state]) }}
                        </SdxwFoldLabel>
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
import TaskManagementMixin from './TaskManagementMixin';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    mixins: [TaskManagementMixin, locale],
    data() {
        return {
            loading: false,
            defaultSort: {
                prop: 'startedAt',
                order: 'descending'
            },
            sortOrders: ['descending', 'ascending', null],
            taskTypeList: [],
            taskStateList: [],
            executeTypeList: [],
            selectedType: '',
            selectedState: '',
            selectedExecuteType: '',
            selectedDate: '',
            taskResourceList: [],
            params: {
                name: '',
                order: 'desc',
                orderBy: 'startedAt',
            }
        };
    },
    methods: {
        fetchData() {

        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'startedAt';
            this.page = 1;
        },
        handleSearch() {

        },
        handleReset() {

        }
    }
};
</script>

<style>

</style>
