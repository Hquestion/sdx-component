<template>
    <div class="sdxv-privilege-custom">
        <div class="sdxv-privilege-custom__bar">
            <sdxu-button
                class="sdxv-privilege-custom__bar--button"
                type="primary"
                icon="sdx-icon sdx-icon-plus"
                size="small"
                @click="handleCreate"
            >
                新建权限
            </sdxu-button>
            <sdxu-input
                class="sdxv-privilege-custom__bar--input"
                type="search"
                :searchable="true"
                placeholder="请输入权限名"
                @keydown.native.enter="handleSearch"
                @search="handleSearch"
                size="small"
            />
        </div>
        <sdxu-table
            class="sdxv-privilege-custom__table"
            :data="data"
            :default-sort="{prop: 'createAt', order: 'descending'}"
        >
            <el-table-column
                label="权限名"
                prop="name"
            />
            <el-table-column
                label="标签"
            >
                <template #default="{ row }">
                    <span
                        v-for="(v, i) in row.tags"
                        :key="i"
                    >{{ v }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="系统类别"
            >
                <template #default="{ row }">
                    {{ splitKey(row.key, 0) }}
                </template>
            </el-table-column>
            <el-table-column
                label="资源类别"
            >
                <template #default="{ row }">
                    {{ splitKey(row.key, 1) }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作类型"
            >
                <template #default="{ row }">
                    {{ splitKey(row.key, 2) }}
                </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                prop="createAt"
                sortable
            />
            <el-table-column
                label="操作"
            >
                <template #default="{ row }">
                    <i
                        class="sdx-icon sdx-icon-edit"
                        title="编辑"
                        @click="handleEdit(row.uuid)"
                    />
                    <i
                        class="sdx-icon sdx-icon-delete"
                        title="删除"
                        @click="handleDelete(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column type="expand">
                <template #default="{ row }">
                    <span>权限说明:</span>
                    <span>{{ row.description }}</span>
                </template>
            </el-table-column>
        </sdxu-table>
        <div class="sdxv-privilege-system__pagination">
            <sdxu-pagination
                :current-page.sync="page"
                :page-size="pageSize"
                :total="total"
                @current-change="handleChangePage"
            />
        </div>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuMessageBox from '@sdx/ui/components/message-box';

export default {
    name: 'SystemPrivilege',
    components: {
        SdxuTable,
        SdxuPagination,
        SdxuInput,
        SdxuButton
    },
    data() {
        return {
            pageSize: 10,
            page: 1,
            total: 100,
            data: []
        };
    },
    methods: {
        fetchData() {
            // todo:
        },
        splitKey(key, i) {
            const list = key.split(':');
            return list[i];
        },
        handleSearch() {
            // todo:
        },
        handleEdit() {
            // todo:
        },
        handleDelete(row) {
            SdxuMessageBox.confirm({
                title: `确认要删除权限${row.name}吗？`,
                content: '此操作会同时删除与权限关联的授权项'
            }).then(() => {
                // todo: 请求接口
            });
        },
        handleCreate() {
            // todo:
        },
        handleChangePage(page) {
            this.page = page;
        }
    }
};
</script>

<style>

</style>
