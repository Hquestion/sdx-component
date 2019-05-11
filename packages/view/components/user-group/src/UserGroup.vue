<template>
    <sdxu-panel
        title="用户组"
        class="sdxv-user-group"
    >
        <div class="sdxv-user-group__bar">
            <sdxu-button
                icon="sdx-icon iconicon-plus"
                size="small"
                @click="createVisible = true"
            >
                新建用户组
            </sdxu-button>
            <sdxu-input
                class="sdxv-user-group__bar--input"
                type="search"
                :searchable="true"
                placeholder="请输入权限名"
                @keydown.native.enter="handleSearch"
                @search="handleSearch"
                size="small"
                v-model="name"
            />
        </div>
        <sdxu-table
            :data="groups"
            class="sdxv-user-group__table"
            :default-sort="{prop: 'createAt', order: 'descending'}"
        >
            <el-table-column
                label="用户组名"
                prop="name"
            />
            <el-table-column
                label="角色"
            >
                <template #default="{ row }">
                    <div>
                        <span
                            class="sdxv-user-group__table--role"
                            v-for="(item, i) in row.roles"
                            :key="i"
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                prop="createAt"
                sortable
            />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <i
                        icon="sdx-icon iconicon-edit1"
                        @click="handleEdit(row.uuid)"
                    />
                    <i
                        icon="sdx-icon iconicon-delete1"
                        @click="handleDelete(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column type="expand">
                <template #default="{ row }">
                    <div>
                        <span>组员:</span>
                        <span>div</span>
                    </div>
                </template>
            </el-table-column>
        </sdxu-table>
        <sdxu-pagination
            :current-page.sync="page"
            :page-size="pageSize"
            :total="total"
            @current-change="handleChangePage"
        />
        <CreateUserGroup :visible.sync="createVisible" />
    </sdxu-panel>
</template>

<script>
import SdxuPanel from '@sdx/ui/components/content-panel';
import SdxuTable from '@sdx/ui/components/table';
import SdxuButton from '@sdx/ui/components/button';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuMessageBox from '@sdx/ui/components/message-box';
import SdxuInput from '@sdx/ui/components/input';

import { getGroups } from '@sdx/utils/src/api/user';
import CreateUserGroup from './CreateUserGroup';

export default {
    name: 'SdxvUserGroup',
    components: {
        CreateUserGroup,
        SdxuPanel,
        SdxuTable,
        SdxuButton,
        SdxuPagination,
        SdxuInput
    },
    data() {
        return {
            pageSize: 10,
            page: 1,
            total: 100,
            groups: [],
            name: '',
            createVisible: false,
            editVisible: false,
            deleteVisible: false
        };
    },
    computed: {
        querys() {
            return {
                name: this.name,
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            };
        }
    },
    methods: {
        fetchData() {
            getGroups(this.querys).then(data => {
                // todo:
                this.groups = data.groups;
                this.total = data.total;
            });
        },
        handleSearch() {
            this.page = 1;
            this.fetchData();
        },
        handleChangePage(page) {
            this.page = page;
            this.fetchData();
        },
        handleEdit(uuid) {

        },
        handleDelete(row) {
            SdxuMessageBox.confirm({
                title: `确定要删除${row.name}用户组吗？`,
                content: '用户组确定删除后补课恢复哦'
            }).then(() => {
                // todo: 请求接口
            });
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style lang="scss">

</style>
