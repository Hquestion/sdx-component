<template>
    <SdxuContentPanel title="用户资源使用Top10">
        <SdxuTable
            :data="userResourceList"
            @sort-change="handleSortChange"
            :default-sort="defaultSort"
        >
            <el-table-column
                prop="user.name"
                label="用户名"
            />
            <el-table-column
                prop="createdAt"
                label="创建时间"
            />
            <el-table-column
                prop="CPU"
                label="已使用CPU（核）"
                sortable="custom"
                :sort-orders="sortOrders"
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
            >
                <template #default="{ row }">
                    <span v-if="row.quota.gpu > 0">{{ `${row.quota.gpuModel}:${row.quota.gpu}` }}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
        </SdxuTable>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';

import { getTaskList } from '@sdx/utils/src/api/project';

export default {
    name: 'SdxvUserResourceRanking',
    components: {
        SdxuContentPanel,
        SdxuTable,
        ElTableColumn
    },
    data() {
        return {
            userResourceList: [],
            defaultSort: {
                prop: 'CPU',
                order: 'descending'
            },
            sortOrders: ['descending'],
            queryParams: {
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'CPU',
                groupBy: 'USER'
            }
        };
    },
    methods: {
        fetchData() {
            getTaskList(this.queryParams).then(data => {
                this.userResourceList = data.data.items;
            }).catch(() => {
                this.userResourceList = [];
            });
        },
        handleSortChange({prop, order}) {
            this.queryParams.order = order === 'ascending' ? 'asc' : 'desc';
            this.queryParams.orderBy = prop || 'CPU';
        },
    },
    created() {
        this.fetchData();
    },
    watch: {
        queryParams: {
            deep: true,
            handler: function() {
                this.fetchData();
            }
        }
    }
};
</script>

<style>

</style>
