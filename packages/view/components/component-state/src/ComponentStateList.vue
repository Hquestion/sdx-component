<template>
    <div class="sdxv-component-state-list">
        <SdxwSearchLayout
            @search="handleSearch"
        >
            <SdxwSearchItem :label="t('view.monitor.componentState.PodName') + ':'">
                <SdxuInput
                    v-model="searchName"
                    type="search"
                    size="small"
                    :placeholder="t('view.monitor.componentState.searchPodPlaceholder')"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="t('view.monitor.componentState.ComponentState') + ':'">
                <el-select
                    v-model="podState"
                    size="medium"
                >
                    <el-option
                        v-for="(item, i) in podStateList"
                        :key="i"
                        :label="t(item.label)"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <SdxuTable
            :data="dataList"
            v-loading="loading"
            :empty-text="t('sdxCommon.NoData')"
        >
            <el-table-column
                :label="t('view.monitor.componentState.PodName')"
                prop="podName"
            />
            <el-table-column
                :label="t('view.monitor.componentState.Namespace')"
                prop="namespace"
            />
            <el-table-column
                :label="t('view.monitor.componentState.ComponentState')"
            >
                <template #default="{ row }">
                    {{ t(POD_STATE_TYPE[row.status]) }}
                </template>
            </el-table-column>
            <el-table-column
                :label="t('view.monitor.componentState.Node')"
                prop="nodeName"
            />
            <el-table-column
                v-auth.system.button="'POD-LOG:READ'"
                :label="t('sdxCommon.Operation')"
                width="60px"
            >
                <template #default="{ row }">
                    <SdxuIconButton
                        icon="sdx-icon sdx-chakanrizhi"
                        :title="t('sdxCommon.Log')"
                        @click="handleViewLog(row)"
                    />
                </template>
            </el-table-column>
        </SdxuTable>
        <Portal to="component-panination">
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
        </Portal>
        <SdxvComponentStateLogDialog
            :visible.sync="logDialogVisible"
            :pod="currentPod"
        />
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxvComponentStateLogDialog from './ComponentStateLogDialog';
import auth from '@sdx/widget/components/auth';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import * as Portal from 'portal-vue';

import { POD_STATE_TYPE } from '@sdx/utils/src/const/task';
import { getPodsStatus } from '@sdx/utils/src/api/system';
import locale from '@sdx/utils/src/mixins/locale';

const POLLING_PERIOD = 10 * 1000;

export default {
    name: 'SdxvComponentStateList',
    directives: { auth },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuInput,
        SdxuTable,
        SdxuPagination,
        SdxuIconButton,
        ElTableColumn,
        ElSelect,
        ElOption,
        Portal: Portal.Portal,
        SdxvComponentStateLogDialog
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
        this.POD_STATE_TYPE = POD_STATE_TYPE;
        this.podStateList = Object.values(POD_STATE_TYPE).map(item => {
            return {
                label: item,
                value: item
            };
        });
        this.podStateList.unshift({
            label: 'sdxCommon.All',
            value: ''
        });
        return {
            searchName: '',
            podState: '',
            page: 1,
            pageSize: 10,
            componentList: [],
            query: {
                podName: '',
                status: ''
            },
            logDialogVisible: false,
            currentPod: {},
            loading: false,
            pollingId: null
        };
    },
    computed: {
        filterTotalList() {
            return this.componentList.filter(item => {
                return item.podName.includes(this.query.podName) && (this.query.status === '' || item.status === this.query.status);
            });
        },
        dataList() {
            return this.filterTotalList.filter((item, i) => {
                return i >= (this.page - 1) * this.pageSize && i < this.page * this.pageSize;
            });
        },
        params() {
            return {
                namespace: this.type === 'base' ? 'kube-system,skydiscovery' : 'skydiscovery-system'
            };
        },
        needPolling() {
            return this.componentList.some(item => ['running', 'pending'].includes(item.status));
        }
    },
    methods: {
        fetchData(showLoading = true) {
            if (showLoading) {
                this.loading = true;
            }
            getPodsStatus(this.params).then(data => {
                this.componentList = data.status_list;
                this.loading = false;
            }).catch(() => {
                this.componentList = [];
                this.loading = false;
            });
        },
        handleViewLog(pod) {
            this.logDialogVisible = true;
            this.currentPod = pod;
        },
        handleSearch() {
            this.page = 1;
            this.query.podName = this.searchName.trim();
            this.query.status = this.podState;
        },
        handlePageChange(page) {
            this.page = page;
        }
    },
    created() {
        this.fetchData();
    },
    beforeDestroy() {
        clearInterval(this.pollingId);
        this.pollingId = null;
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
        },
        needPolling(nval) {
            if (nval) {
                clearInterval(this.pollingId);
                this.pollingId = setInterval(() => {
                    this.fetchData(false);
                }, POLLING_PERIOD);
            } else {
                clearInterval(this.pollingId);
                this.pollingId = null;
            }
        }
    }
};
</script>

<style>

</style>
