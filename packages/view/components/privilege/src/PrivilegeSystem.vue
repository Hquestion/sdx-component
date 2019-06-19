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
            v-loading="loading"
        >
            <el-table-column
                label="权限名"
                prop="name"
            />
            <el-table-column
                label="标签"
            >
                <template #default="{ row }">
                    <sdxw-fold-label-group
                        :list="row.tags"
                        mode="inline"
                    />
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
import FoldLabel from '@sdx/widget/components/fold-label';

import { getPermissionList } from '@sdx/utils/src/api/permissions';

export default {
    name: 'SystemPrivilege',
    components: {
        SdxuTable,
        SdxuPagination,
        SdxuInput,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup
    },
    data() {
        return {
            pageSize: 10,
            page: 1,
            total: 100,
            data: [],
            name: '',
            loading: false
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
            this.loading = true;
            getPermissionList(this.querys).then(data => {
                this.data = data.permissions;
                this.total = data.total;
                this.loading = false;
            }).catch(() => {
                this.data = [];
                this.total = 0;
                this.loading = false;
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
