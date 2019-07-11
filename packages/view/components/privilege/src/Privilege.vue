<template>
    <SdxuContentPanel
        title="权限"
    >
        <template>
            <div
                class="sdxv-privilege-system__search"
                v-auth.user.button="'PERMISSION:READ'"
            >
                <sdxu-input
                    size="small"
                    type="search"
                    placeholder="请输入权限名"
                    v-model="name"
                />
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleSearch"
                    class="sdxv-privilege-system__search--button"
                >
                    搜索
                </SdxuButton>
            </div>
        </template>
        <div
            class="sdxv-privilege-system"
            v-auth.user.button="'PERMISSION:READ'"
        >
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
                    prop="description"
                    label="权限说明"
                >
                    <template slot-scope="scope">
                        <SdxuTextTooltip
                            :content="scope.row.description"
                            content-key="description"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="标签"
                >
                    <template #default="{ row }">
                        <sdxw-fold-label-group
                            :list="row.tags"
                            mode="list"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="服务名称"
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
            </sdxu-table>
            <div class="sdxv-privilege-system__pagination">
                <sdxu-pagination
                    v-if="total"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handleChangePage"
                />
            </div>
        </div>
    </SdxuContentPanel>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuInput from '@sdx/ui/components/input';
import FoldLabel from '@sdx/widget/components/fold-label';
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import auth from '@sdx/widget/components/auth';
import SdxuTextTooltip from '@sdx/ui/components/text-tooltip';
import { getPermissionList } from '@sdx/utils/src/api/permissions';

export default {
    name: 'SdxvPrivilege',
    components: {
        SdxuTable,
        SdxuPagination,
        SdxuInput,
        SdxuContentPanel,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        SdxuTextTooltip
    },
    data() {
        return {
            pageSize: 10,
            page: 1,
            total: 0,
            data: [],
            name: '',
            loading: false
        };
    },
    directives: {
        auth
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
            return list[i] || '';
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
