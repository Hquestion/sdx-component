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
                    clearable
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('sdxCommon.Creator')}：`">
                <SdxuInput
                    v-model="params.username"
                    :placeholder="t('view.task.PleaseInput')"
                    clearable
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.SubordinateGroup')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.group"
                >
                    <el-option
                        :label="t('sdxCommon.ALL')"
                        value=""
                    />
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
                        :label="t(item.label)"
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
                v-loading="tableLoading"
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
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                />
                <el-table-column
                    prop="quota.cpu"
                    label="CPU"
                    sortable
                >
                    <template #default="{row}">
                        {{ parseMilli(row.quota.cpu) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="quota.memory"
                    :label="t('view.task.Memory')"
                    sortable
                >
                    <template #default="{row}">
                        {{ byteToGB(row.quota.memory) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="quota.gpu"
                    :label="'GPU'"
                    sortable
                />

                <el-table-column
                    prop="group"
                    :label="t('view.task.tipCard.SubordinateGroup')"
                >
                    <template #default="{ row }">
                        {{ getGroupsStr(row.owner && row.owner.groups) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createdAt"
                    :label="t('sdxCommon.CreatedTime')"
                    sortable
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.createdAt) }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="100px"
                >
                    <template #default="{ row }">
                        <SdxuButton
                            size="regular"
                            type="link"
                            @click="handleOperate({row, type: 'detail'})"
                        >
                            {{ t('view.task.tipCard.Detail') }}
                        </SdxuButton>
                        <SdxuButton
                            type="link"
                            size="regular"
                            @click="handleOperate({row, type: 'delete'})"
                        >
                            {{ t('sdxCommon.Delete') }}
                        </SdxuButton>
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
import SdxuPagination from '@sdx/ui/components/pagination';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import Button from '@sdx/ui/components/button';
import { TASK_TYPE_LIST } from '@sdx/utils/src/const/task';
import { paginate, removeBlankAttr } from '@sdx/utils/src/helper/tool';
import {  parseMilli, byteToGB } from '@sdx/utils/src/helper/transform';
import { taskList,deleteTask } from '@sdx/utils/src/api/task';
import { getGroups } from '@sdx/utils/src/api/user';
import MessageBox from '@sdx/ui/components/message-box';
import { Message, Select, Option } from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
export default {
    name: 'SdxvTaskList',
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        [Button.name]: Button,
        SdxuPagination,
        SdxuInput,
        [Select.name]: Select,
        [Option.name]: Option,
    },
    data() {
        return {
            TASK_TYPE_LIST,
            table: [],
            groups: [],
            defaultSort: {
                prop: 'quota.cpu',
                order: 'descending'
            },
            current: 1,
            pageSize: 10,
            total: 0,
            tableLoading: false,
            params: {
                name: '',
                username: '',
                group: '',
                type: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'CPU',
                all: true
            }
        };
    },
    methods: {
        dateFormatter,
        parseMilli, 
        byteToGB,
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
        getTaskList() {
            this.tableLoading = true;
            const params = Object.assign({}, this.params, {
                ...paginate(this.current, this.pageSize),
            });
            removeBlankAttr(params);
            taskList(params).then(res => {
                this.table = res.data;
                this.total = res.total;
                this.tableLoading = false;
            }).catch(() => {
                this.table = [];
                this.total = 0;
                this.tableLoading = false;
            });
        },
        // 根据prop获取orderBy， 譬如 quota.cpu 得到 CPU
        getOrderBy(prop) {
            let res = '';
            if(prop.includes('.')) {
                res = (prop.slice(prop.indexOf('.') + 1)).toUpperCase();
            } else {
                res = prop;
            }
            return res;
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = this.getOrderBy(prop) || 'CPU';
            this.current = 1;
            this.getTaskList();
        },
        handleSearch() {
            this.current = 1;
            this.getTaskList();
        },
        handlePageChange(index){
            this.current = index;
            this.getTaskList();
        },
        handleReset() {
            this.params = {
                name: '',
                username: '',
                group: '',
                type: '',
                start: 1,
                count: 10,
                order: this.params.order,
                orderBy: this.params.orderBy,
                all: true
            };
            this.current = 1;
            this.getTaskList();
        },
        handleOperate(data) {
            switch(data.type) {
                case 'delete':
                    MessageBox.warning({
                        title: this.t('view.task.deleteTaskTitle'),
                        content: this.t('view.task.deleteTaskContent'),
                    }).then(() => {
                        deleteTask(data.row.uuid, {type: data.row.type}).then(() => {
                            Message({
                                message: this.t('sdxCommon.RemoveSuccess'),
                                type: 'success'
                            });
                            this.getTaskList();
                        });
                    }).catch(() => {});
                    break;
                case 'detail':
                    this.$router.push({
                        name: 'SdxvTaskManagementTaskDetail',
                        params: {
                            taskId: data.row.uuid
                        }
                    });
            }
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
    .sdxu-pagination {
        margin-top: 24px;
    }
}
</style>
