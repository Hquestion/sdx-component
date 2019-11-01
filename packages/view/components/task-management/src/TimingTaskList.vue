<template>
    <div class="sdxv-timing-task-list">
        <div class="sdxv-timing-task-list__filter">
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
                <SdxwSearchItem :label="t('view.task.isOpen') + ':'">
                    <el-select
                        v-model="selectedStartupType"
                        size="medium"
                    >
                        <el-option
                            v-for="item in startupTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="sdxv-timing-task-list__table">
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
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                    min-width="64px"
                />
                <el-table-column
                    prop="startedAt"
                    :label="t('view.task.firstScheduleTime')"
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
                    prop=""
                    :label="t('view.task.nextScheduleTime')"
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
                    prop=""
                    :label="t('view.task.timingSetting')"
                    min-width="72px"
                />
                <el-table-column
                    prop=""
                    :label="t('view.task.isOpen')"
                    min-width="72px"
                />
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
                class="sdxv-timing-task-list__table--pagination"
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
    props: {
        searchStr: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            startupTypeList: [],
            selectedStartupType: '',
            taskResourceList: [],
            defaultSort: {
                prop: 'startedAt',
                order: 'descending'
            },
            sortOrders: ['descending', 'ascending', null],
            loading: false,
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
