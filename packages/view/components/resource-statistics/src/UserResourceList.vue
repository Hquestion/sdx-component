<template>
    <SdxuContentPanel
        :title="title"
        class="sdxv-user-resource-list"
    >
        <template
            #right
            v-if="ranking || searchable"
        >
            <div
                v-if="ranking"
                class="sdxv-user-resource-list__more"
                @click="handGotoUserResourceList"
            >
                <span>全部</span>
                <i class="sdx-icon sdx-icon-arrow-right" />
            </div>
            <div
                v-else-if="searchable"
                class="sdxv-user-resource-list__search"
            >
                <SdxuInput
                    v-model="searchName"
                    type="search"
                    placeholder="请输入用户名"
                    size="small"
                />
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleSearch"
                    class="sdxv-user-resource-list__search--button"
                >
                    搜索
                </SdxuButton>
            </div>
        </template>
        <SdxuTable
            :data="userResourceList"
            @sort-change="handleSortChange"
            :default-sort="defaultSort"
            v-loading="loading"
        >
            <el-table-column
                prop="owner.username"
                label="用户名"
            />
            <el-table-column
                prop="owner.createdAt"
                label="创建时间"
            >
                <template #default="{ row }">
                    <span>
                        {{ formatDate(row.owner.createdAt) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="CPU"
                label="已使用CPU（核）"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="82px"
            >
                <template #default="{ row }">
                    {{ row.quota.cpu / 1000 }}
                </template>
            </el-table-column>
            <el-table-column
                prop="MEMORY"
                label="已使用内存（GB）"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="85px"
            >
                <template #default="{ row }">
                    {{ row.quota.memory / (1024 * 1024 * 1024) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="GPU"
                label="已使用GPU（块）"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="82px"
            >
                <template #default="{ row }">
                    <div v-if="hasGpu(row.quota.gpus)">
                        <div
                            v-for="(value, key) in row.quota.gpus"
                            :key="key"
                        >
                            {{ `${key}: ${value}` }}
                        </div>
                    </div>
                    <div v-else>
                        0
                    </div>
                </template>
            </el-table-column>
        </SdxuTable>
        <div class="sdxv-user-resource-list__pagination">
            <SdxuPagination
                v-if="!ranking"
                :current-page.sync="page"
                :page-size="pageSize"
                :total="total"
                @current-change="handlePageChange"
            />
        </div>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuPagination from '@sdx/ui/components/pagination';

import { getTaskList } from '@sdx/utils/src/api/project';
import { dateFormatter } from '@sdx/utils/src/helper/transform';

export default {
    name: 'SdxvUserResourceList',
    components: {
        SdxuContentPanel,
        SdxuTable,
        ElTableColumn,
        SdxuInput,
        SdxuButton,
        SdxuPagination
    },
    props: {
        title: {
            type: String,
            default: '全部用户资源统计'
        },
        ranking: {
            type: Boolean,
            default: false
        },
        searchable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            userResourceList: [],
            defaultSort: {
                prop: 'CPU',
                order: 'descending'
            },
            params: {
                userName: '',
                order: 'desc',
                orderBy: 'CPU',
                groupBy: 'USER'
            },
            loading: false,
            searchName: '',
            page: 1,
            pageSize: 10,
            total: 0
        };
    },
    computed: {
        sortOrders() {
            return this.ranking ? ['descending'] : ['descending', 'ascending', null];
        },
        queryParams() {
            return Object.assign({}, this.params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
        }
    },
    methods: {
        fetchData() {
            this.loading = true;
            getTaskList(this.queryParams).then(data => {
                this.userResourceList = data.items;
                this.total = data.total;
                this.loading = false;
            });
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'CPU';
            this.page = 1;
        },
        hasGpu(gpus) {
            return Object.keys(gpus).length;
        },
        handGotoUserResourceList() {
            this.$router.push({name: 'SdxvUserResourceList'});
        },
        handleSearch() {
            this.params.userName = this.searchName;
            this.page = 1;
        },
        handlePageChange(page) {
            this.page = page;
        },
        formatDate(date) {
            return dateFormatter(date, 'YYYY-MM-DD HH:mm:ss');
        }
    },
    created() {
        this.fetchData();
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
