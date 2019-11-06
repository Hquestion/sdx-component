<template>
    <div class="sdxv-task-manage-tasklist">
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
                    v-model="params.ownerId"
                    :placeholder="t('view.task.PleaseInput')"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.SubordinateGroup')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.groupId"
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
                        v-for="item in taskType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <div class="table">
            <sdxu-table
                :data="table"
                @sort-change="handleSortChange"
                :default-sort="defaultSort"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                />
                <el-table-column
                    prop="type"
                    :label="t('view.task.taskType')"
                />
                <el-table-column
                    prop="owner_id"
                    :label="t('sdxCommon.Creator')"
                />
                <el-table-column
                    prop="quota.cpu"
                    :label="'CPU'"
                    sortable
                />
                <el-table-column
                    prop="quota.memory"
                    :label="t('view.task.Memory')"
                    sortable
                />
                <el-table-column
                    prop="quota.gpu"
                    :label="'GPU'"
                    sortable
                />

                <el-table-column

                    :label="t('view.task.tipCard.SubordinateGroup')"
                />
                <el-table-column
                    prop="created_at"
                    :label="t('sdxCommon.CreatedTime')"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="172px"
                >
                    <template #default="{ row }">
                        <SdxuButton
                            size="regular"
                            type="link"
                        >
                            {{ t('view.task.tipCard.Detail') }}
                        </SdxuButton>
                        <SdxuButton
                            type="link"
                            size="regular"
                        >
                            {{ t('sdxCommon.Delete') }}
                        </SdxuButton>
                    </template>
                </el-table-column>
            </sdxu-table>
            <SdxuPagination
                v-if="total"
                :current-page.sync="page"
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
import SdxuPagination from '@sdx/ui/components/pagination';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import Button from '@sdx/ui/components/button';
import { taskType } from '../tool/config';
import { paginate, removeBlankAttr } from '@sdx/utils/src/helper/tool';
import { taskList } from '@sdx/utils/src/api/task';
import { getGroups } from '@sdx/utils/src/api/user';
export default {
    name: 'SdxvTaskList',
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        [Button.name]: Button,
        SdxuPagination,
    },
    data() {
        return {
            taskType,
            table: [],
            groups: [],
            defaultSort: {
                prop: 'quota.cpu',
                order: 'descending'
            },
            current: 1,
            pageSize: 10,
            total: 0,
            params: {
                name: '',
                ownerId: '',
                groupId: '',
                type: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'CPU'
            }
        };
    },
    methods: {
        dateFormatter,
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
        getTaskList() {
            const params = Object.assign({}, this.params, {
                ...paginate(this.current, this.pageSize),
            });
            removeBlankAttr(params);
            taskList(params).then(res => {
                this.table = res.data;
                this.total = res.total;
            });
        },
        // 根据prop获取orderBy， 譬如 quota.cpu 得到 CPU
        getOrderBy(prop) {
            return (prop.slice(prop.indexOf('.') + 1)).toUpperCase();
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = this.getOrderBy(prop) || 'CPU';
            this.page = 1;
            this.getTaskList();
        },
        handleSearch() {
            this.current = 1;
            this.getTaskList();
        },
        handleReset() {
            this.params = {
                name: '',
                ownerId: '',
                groupId: '',
                type: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'CPU'
            };
            this.current = 1;
            this.getTaskList();
        }
    },
    created() {
        this.getTaskList();
        this.getGroupList();
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-tasklist {
    & /deep/ {
        .__view {
            width: 100% !important;
        }
    }
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .table {
        @extend .panel;
        margin-top: 24px;
        padding: 24px;
        .sdxu-button {
            padding: 0;
        }
    }
    .pagination {
        margin-top: 24px;
    }
}
</style>
