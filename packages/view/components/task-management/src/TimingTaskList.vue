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
                        :placeholder="t('view.task.PleaseInput')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('sdxCommon.Creator') + ':'">
                    <SdxuInput
                        v-model="creator"
                        :placeholder="t('view.task.PleaseInput')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.isOpen') + ':'">
                    <el-select
                        v-model="selectedStartupType"
                        size="medium"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in startupTypeList"
                            :key="item.value"
                            :label="item.label"
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
                :row-key="row => row.uuid"
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
                    :label="t('view.task.startedAt')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="120px"
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
                    min-width="120px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ dateFormatter(row.stoppedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="crontab"
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
                            <SdxuButton
                                v-for="(item, i) in getOperationList(row)"
                                :key="i"
                                :title="item.label"
                                @click="handleOperation(item.value, row)"
                                type="link"
                            >
                                {{ item.label }}
                            </SdxuButton>
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
import SdxuTable from '@sdx/ui/components/table';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { executionList } from '@sdx/utils/src/api/task';
import locale from '@sdx/utils/src/mixins/locale';
import { TIMING_TASK_STARTUP_STATE } from '@sdx/utils/src/const/task';
import taskExecution from '@sdx/utils/src/mixins/taskExecution';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';

// todo: 轮询
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
        SdxuIconButtonGroup,
        SdxuButton,
        ElTableColumn,
        ElSelect,
        ElOption
    },
    data() {
        return {
            taskName: '',
            creator: '',
            page: 1,
            pageSize: 10,
            total: 0,
            currentUser: getUser(),
            startupTypeList: TIMING_TASK_STARTUP_STATE,
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
                creator: '',
                order: 'desc',
                orderBy: 'startedAt',
                ownerId: '',
                start: 1,
                count: 10,
                isOpen: ''
            }
        };
    },
    computed: {
        queryParams() {
            let params = {
                ownerId: this.currentUser.userId
            };
            let obj = Object.assign({}, this.params, params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
            return this.removeBlankAttr(obj);
        },
    },
    methods: {
        fetchData() {
            this.loading = false;
            executionList(this.queryParams)
                .then(data => {
                    this.taskResourceList = data.data;
                    this.total = data.total;
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
            this.params.name = this.taskName;
            this.params.creator = this.creator;
            this.params.isOpen = this.selectedStartupType;
            this.page = 1;
        },
        handleReset() {
            this.taskName = '';
            this.creator = '';
            this.selectedStartupType = '';
            this.handleSearch();
        },
        getOperationList() {
            // todo:
            return [];
        },
        handleOperation() {
            // todo:
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
