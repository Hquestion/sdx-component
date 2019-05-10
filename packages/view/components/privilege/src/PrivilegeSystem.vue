<template>
    <div class="sdxv-privilege-system">
        <sdxu-input
            class="sdxv-privilege-system__search"
            size="small"
            type="search"
            :searchable="true"
            @search="handleSearch"
            @keydown.native.enter="handleSearch"
            placeholder="请输入权限名"
            v-model="name"
        />
        <sdxu-table
            class="sdxv-privilege-system__table"
            :data="data"
        >
            <el-table-column
                label="权限名"
                prop="name"
            />
            <el-table-column
                label="标签"
            >
                <template #default="{ row }">
                    <div>
                        <span
                            class="sdxv-privilege-system__table--tag"
                            v-for="(v, i) in row.tags"
                            :key="i"
                        >{{ v }}</span>
                    </div>
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
            <el-table-column type="expand">
                <template #default="{ row }">
                    <div class="sdxv-privilege-system__expand">
                        <span class="sdxv-privilege-system__expand--label">权限说明:</span>
                        <span class="sdxv-privilege-system__expand--detail">{{ row.description }}</span>
                    </div>
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

import { getPermissionList } from '@sdx/utils/src/api/permissions';

export default {
    name: 'SystemPrivilege',
    components: {
        SdxuTable,
        SdxuPagination,
        SdxuInput
    },
    data() {
        return {
            pageSize: 10,
            page: 1,
            total: 100,
            data: [],
            name: ''
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
            getPermissionList(this.querys).then(data => {
                // window.console.error(data);
                this.data = data.permissions;
                this.total = data.total;
            }).catch(err => {
                window.console.error(err);
            });
        },
        splitKey(key, i) {
            const list = key.split(':');
            return list[i];
        }, 
        handleChangePage(page) {
            this.page = page;
            this.fetchData();
        },
        handleSearch() {
            this.page = 1;
            this.fetchData();
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style>

</style>
