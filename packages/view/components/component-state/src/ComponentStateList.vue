<template>
    <div class="sdxv-component-state-list">
        <SdxwSearchLayout
            @search="handleSearch"
        >
            <SdxwSearchItem label="Pod名:">
                <SdxuInput
                    v-model="searchName"
                    type="search"
                    size="small"
                    placeholder="请输入Pod名"
                />
            </SdxwSearchItem>
            <SdxwSearchItem label="组件状态:">
                <el-select
                    v-model="podState"
                    size="medium"
                >
                    <el-option
                        v-for="(item, i) in podStateList"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <SdxuTable :data="dataList">
            <el-table-column
                label="Pod名称"
                prop="podName"
            />
            <el-table-column
                label="Namespace"
                prop="namespace"
            />
            <el-table-column
                label="状态"
                prop="status"
            />
            <el-table-column
                label="node"
                prop="nodeName"
            />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <SdxuIconButton
                        icon="sdx-icon sdx-chakanrizhi"
                        title="日志"
                        @click="handleViewLog(row.podId)"
                    />
                </template>
            </el-table-column>
        </SdxuTable>
        <div
            class="sdxv-component-state-list__pagination"
        >
            <SdxuPagination
                :current-page.sync="page"
                :page-size="pageSize"
                :total="filterTotalList.length"
                @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuIconButton from '@sdx/ui/components/icon-button';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';

import { POD_STATE_TYPE } from '@sdx/utils/src/const/task';
import { getPodsList } from '@sdx/utils/src/api/monitor';

export default {
    name: 'SdxvComponentStateList',
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuInput,
        SdxuTable,
        SdxuPagination,
        SdxuIconButton,
        ElTableColumn,
        ElSelect,
        ElOption
    },
    props: {
        type: {
            type: String,
            default: 'base',
            validator: function(value) {
                return ['base', 'system'].includes(value);
            }
        }
    },
    data() {
        this.podStateList = Object.values(POD_STATE_TYPE).map(item => {
            return {
                label: item,
                value: item
            };
        });
        this.podStateList.unshift({
            label: '全部',
            value: ''
        });
        return {
            searchName: '',
            podState: '',
            page: 1,
            pageSize: 10,
            componentList: [],
            dialogVisible: false,
            query: {
                podName: '',
                status: ''
            }
        };
    },
    computed: {
        filterTotalList() {
            return this.componentList.filter(item => {
                return item.podName.includes(this.query.podName.trim()) && (this.query.status === '' || item.status === this.query.status);
            });
        },
        dataList() {
            return this.filterTotalList.filter((item, i) => {
                return i >= (this.page - 1) * this.pageSize && i < this.page * this.pageSize;
            });
        },
        params() {
            return {
                namespace: this.type === 'base' ? ['kube-system', 'skydiscovery'] : ['skydiscovery-system']
            };
        }
    },
    methods: {
        fetchData() {
            getPodsList(this.params).then(data => {
                window.console.error(data);
                this.componentList = data.status_list;
            });
        },
        handleViewLog() {
            this.dialogVisible = true;
        },
        handleSearch() {
            this.query.podName = this.searchName;
            this.query.status = this.podState;
        },
        handlePageChange(page) {
            this.page = page;
        }
    },
    created() {
        this.fetchData();
    },
    watch: {
        type() {
            this.searchName = '';
            this.podState = '';
            this.page = 1;
            this.dialogVisible = false;
            this.query = {
                podName: '',
                status: ''
            };
            this.componentList = [];
            this.fetchData();
        }
    }
};
</script>

<style>

</style>
