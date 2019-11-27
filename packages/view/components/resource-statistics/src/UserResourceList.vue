<template>
    <SdxuContentPanel
        :title="title || t('view.monitor.resourceStatistic.AllUserResourceStatistics')"
        :fullscreen="true"
        class="sdxv-user-resource-list"
    >
        <template
            #right
            v-if="ranking"
        >
            <div
                class="sdxv-user-resource-list__more"
                @click="handGotoUserResourceList"
            >
                <span>{{ t('sdxCommon.ALL') }}</span>
                <i class="sdx-icon sdx-icon-arrow-right" />
            </div>
        </template>
        <div
            v-if="!ranking && searchable"
            class="sdxv-user-resource-list__search"
        >
            <SdxuInput
                v-model="searchName"
                type="search"
                :placeholder="t('view.monitor.resourceStatistic.userSearchInputPlaceholder')"
                size="small"
                style="width: 300px"
            />
            <SdxuButton
                type="primary"
                size="small"
                @click="handleSearch"
                class="sdxv-user-resource-list__search--button"
            >
                {{ t('sdxCommon.Search') }}
            </SdxuButton>
        </div>
        <SdxuTable
            :data="userResourceList"
            @sort-change="handleSortChange"
            :default-sort="defaultSort"
            v-loading="loading"
        >
            <el-table-column
                prop="owner.fullName"
                :label="t('view.monitor.resourceStatistic.UserName')"
            />
            <el-table-column
                prop="owner.createdAt"
                :label="t('sdxCommon.CreatedTime')"
            >
                <template #default="{ row }">
                    <span>
                        {{ formatDate(row.owner.createdAt) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cpu"
                :label="t('view.task.cpuUsed')"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="82px"
            >
                <template #default="{ row }">
                    {{ parseMilli(row.cpu) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="memory"
                :label="t('view.task.memoryUsed')"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="85px"
            >
                <template #default="{ row }">
                    {{ byteToGB(row.memory) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="gpu"
                :label="t('view.task.gpuUsed')"
                sortable="custom"
                :sort-orders="sortOrders"
                min-width="82px"
            >
                <template #default="{ row }">
                    <div v-if="row.gpu > 0">
                        <div
                            v-for="(item, key) in row.gpu_detail"
                            :key="key"
                        >
                            {{ `${item.gpu_model}: ${item.num}` }}
                        </div>
                    </div>
                    <div v-else>
                        0
                    </div>
                </template>
            </el-table-column>
        </SdxuTable>
        <template
            #footer
            v-if="!ranking"
        >
            <div class="sdxv-user-resource-list__pagination">
                <SdxuPagination
                    :current-page.sync="page"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                />
            </div>
        </template>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuPagination from '@sdx/ui/components/pagination';

import { getTaskResourceStatistics } from '@sdx/utils/src/api/task';
import { dateFormatter, byteToGB, parseMilli } from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvUserResourceList',
    mixins: [locale],
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
            default: ''
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
                prop: 'cpu',
                order: 'descending'
            },
            params: {
                username: '',
                order: 'desc',
                orderBy: 'cpu',
                all: false
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
            getTaskResourceStatistics(this.queryParams).then(data => {
                this.userResourceList = data.data;
                this.total = data.total;
                this.loading = false;
            }).catch(() => {
                this.userResourceList = [];
                this.total = 0;
                this.loading = false;
            });
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'cpu';
            this.page = 1;
        },
        hasGpu(gpus) {
            return Object.keys(gpus).length;
        },
        handGotoUserResourceList() {
            this.$router.push({name: 'SdxvUserResourceList'});
        },
        handleSearch() {
            this.params.username = this.searchName.trim();
            this.page = 1;
        },
        handlePageChange(page) {
            this.page = page;
        },
        formatDate(date) {
            return dateFormatter(date, 'YYYY-MM-DD HH:mm:ss');
        },
        parseMilli(core) {
            return parseMilli(core);
        },
        byteToGB(memory) {
            return byteToGB(memory);
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
