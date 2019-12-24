<template>
    <div class="sdxv-dataset-list">
        <div class="sdxv-dataset-list__title">
            {{ t('view.dataManagement.FileDataset') }}
        </div>
        <div class="sdxv-dataset-list__tabs">
            <SdxuTabRadioGroup v-model="params.shareType">
                <SdxuTabRadioItem name="ALL">
                    {{ t('view.dataManagement.AllDataset') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="PRIVATE">
                    {{ t('view.dataManagement.SelfDataset') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="MY_SHARE">
                    {{ t('view.dataManagement.MyShare') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="OTHER_SHARE">
                    {{ t('view.dataManagement.OthersShare') }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <div class="sdxv-dataset-list__tabs--button">
                <SdxuButton
                    @click="handleDatasetCreation"
                    icon="sdx-xinjianhao"
                >
                    {{ t('view.dataManagement.CreateDataset') }}
                </SdxuButton>
                <SdxuSortButton
                    class="sdxv-dataset-list__button--sort"
                    :title="t('view.dataManagement.CreatedTimeSort')"
                    :order="params.order"
                    @sortChange="handleClickSortButton"
                />
            </div>
        </div>
        <div class="sdxv-dataset-list__filter">
            <SdxwSearchLayout
                @search="handleSearch"
                @reset="handleReset"
                :label-width="lang$ === 'en' ? '120px' : '80px'"
            >
                <SdxwSearchItem :label="t('view.dataManagement.Dataset') + ':'">
                    <SdxuInput
                        v-model="name"
                        :placeholder="t('view.dataManagement.DatasetNamePlaceholder')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('sdxCommon.Tag') + ':'">
                    <el-select
                        v-model="selectedLabel"
                        size="large"
                    >
                        <el-option
                            v-for="item in labelList"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.dataManagement.DataFormat') + ':'">
                    <el-select
                        v-model="selectedDataFormat"
                        size="large"
                    >
                        <el-option
                            v-for="item in dataTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value" 
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div
            class="sdxv-dataset-list__list"
            v-loading="loading"
        >
            <template v-if="datasetList.length === 0">
                <SdxuEmpty />
            </template>
            <template v-else>
                <div 
                    v-if="params.shareType === 'PRIVATE' || params.shareType === 'MY_SHARE'" 
                    class="sdxv-dataset-list__list--operation"
                >
                    <SdxuButton
                        type="default"
                        @click="handleSelectAll"
                    >
                        {{ t('sdxCommon.SelectAll') }}
                    </SdxuButton>
                    <div>
                        <SdxuButton
                            v-if="params.shareType === 'PRIVATE'"
                            type="default"
                            @click="handleShareAll"
                            :disabled="checkedDatasetList.length === 0"
                        >
                            {{ t('view.dataManagement.ShareAll') }}
                        </SdxuButton>
                        <SdxuButton
                            v-if="params.shareType === 'PRIVATE'"
                            type="default"
                            @click="handleDeleteBatch"
                            :disabled="checkedDatasetList.length === 0"
                        >
                            {{ t('view.dataManagement.DeleteBatch') }}
                        </SdxuButton>
                        <SdxuButton
                            v-if="params.shareType === 'MY_SHARE'"
                            type="default"
                            @click="handleCancelShareBatch"
                            :disabled="checkedDatasetList.length === 0"
                        >
                            {{ t('view.dataManagement.CancelShare') }}
                        </SdxuButton>
                    </div>
                </div>
                <div class="sdxv-dataset-list__card">
                    <DatasetCard
                        class="sdxv-dataset-list__card--item"
                        v-for="(item, i) in datasetList"
                        :key="i"
                        :dataset-info="item"
                        :share-type="params.shareType"
                        :checked-list="checkedDatasetList"
                        :user-id="currentUser.uuid"
                        @operate="handleOperation"
                        @detail="handleDetail"
                    />
                </div>
                <SdxuPagination
                    class="sdxv-dataset-list__list--pagination"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                />
            </template>
        </div>
        <DatasetShareDialog
            v-if="shareDialogVisible"
            :visible.sync="shareDialogVisible"
            :dataset="shareDataset"
            @refresh="fetchData"
        />
        <DatasetEditDialog
            v-if="editDialogVisible"
            :visible.sync="editDialogVisible"
            :dataset="editDataset"
            @refresh="fetchData"
        />
        <SdxwShareSetting
            :visible.sync="shareAllDialog"
            @confirm-edit="handleShareAll"
        />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuTabRadio from '@sdx/ui/components/tab-radio';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import SdxuPagination from '@sdx/ui/components/pagination';
import DatasetCard from './DatasetCard';
import DatasetEditDialog from './DatasetEditDialog';
import DatasetShareDialog from './DatasetShareDialog';
import SdxuButton from '@sdx/ui/components/button';
import SdxuSortButton from '@sdx/ui/components/sort-button';
import MessageBox from '@sdx/ui/components/message-box';
import SdxuEmpty from '@sdx/ui/components/empty';
import SdxwShareSetting from '@sdx/widget/components/share-setting';
import { getDatasetList, getLabels, deleteDataset, updateDataset, datasetDeleteBatch, datasetShareBatch } from '@sdx/utils/src/api/dataset';
import { getUser } from '@sdx/utils/src/helper/shareCenter';

import { DATA_FORMAT_LIST, POLLING_STATE_LIST } from './config';

import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';

const POLLING_PERIOD = 3 * 1000;

export default {
    name: 'DatasetList',
    mixins: [locale],
    components: {
        [SdxuTabRadio.TabRadioGroup.name]: SdxuTabRadio.TabRadioGroup,
        [SdxuTabRadio.TabRadioItem.name]: SdxuTabRadio.TabRadioItem,
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuInput,
        SdxuPagination,
        ElSelect,
        ElOption,
        SdxwShareSetting,
        DatasetCard,
        DatasetEditDialog,
        DatasetShareDialog,
        SdxuButton,
        SdxuSortButton,
        SdxuEmpty,
    },
    data() {
        return {
            selectedDataFormat: '',
            selectedLabel: '',
            name: '',
            dataTypeList: DATA_FORMAT_LIST,
            labelList: [],
            page: 1,
            pageSize: 10,
            total: 0,
            shareDialogVisible: false,
            shareDataset: {},
            editDialogVisible: false,
            editDataset: {},
            shareAllDialog: false,
            params: {
                name: '',
                order: 'desc',
                orderBy: 'createdAt',
                start: 1,
                count: 10,
                shareType: 'ALL',
                labels: '',
                dataFormat: ''
            },
            loading: false,
            pollingId: 0,
            checkedDatasetList: [],
            datasetList: [],
            currentUser: getUser()
        };
    },
    computed: {
        queryParams() {
            return Object.assign({}, this.params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
        }
    },
    methods: {
        fetchData(showLoading = true) {
            if (showLoading) {
                this.loading = true;
            }
            getDatasetList(this.queryParams)
                .then(data => {
                    this.checkedDatasetList = [];
                    this.datasetList = data.items;
                    this.total = data.total;
                    this.loading = false;
                    if (this.datasetList.some(item => POLLING_STATE_LIST.includes(item.state))) {
                        this.startPolling();
                    }
                })
                .catch(err => {
                    window.console.error(err);
                    this.datasetList = [];
                    this.total = 0;
                    this.loading = false;
                });
        },
        getLabelList() {
            getLabels()
                .then(data => {
                    const list = data.items.map(item => ({
                        label: item.label,
                        value: item.label
                    }));
                    list.unshift({
                        label: this.t('sdxCommon.ALL'),
                        value: ''
                    });
                    this.labelList = list;
                })
                .catch(err => {
                    window.console.error(err);
                    this.labelList = [];
                });
        },
        handlePageChange(page) {
            this.page = page;
        },
        handleSearch() {
            this.params.name = this.name;
            this.params.labels = this.selectedLabel;
            this.params.dataFormat = this.selectedDataFormat;
            this.page = 1;
        },
        handleReset() {
            this.name = '';
            this.selectedLabel = '';
            this.selectedDataFormat = '';
            this.handleSearch();
        },
        handleClickSortButton() {
            this.params.order = this.params.order === 'desc' ? 'asc' : 'desc';
            // this.page = 1;
        },
        handleOperation(operation, dataset) {
            switch(operation) {
                case 'share':
                    this.shareDataset = dataset;
                    this.shareDialogVisible = true;
                    break;
                case 'edit':
                    this.editDataset = dataset;
                    this.editDialogVisible = true;
                    break;
                case 'delete':
                    this.handleDeleteDataset(dataset.uuid);
                    break;
                case 'f_delete': 
                    this.handleDeleteDataset(dataset.uuid, {force: true});
                    break;
                case 'c_share': 
                    this.handleCancelShare(dataset);
                    break;

            }
        },
        handleDetail(uuid) {
            this.$router.push({
                name: 'datasetView',
                params: {
                    uuid
                }
            });
        },
        handleDeleteDataset(uuid, params) {
            MessageBox.confirm.warning({
                title: this.t('view.dataManagement.DatasetDeleteTips'),
                content: this.t('view.dataManagement.DatasetDeleteContent')
            }).then(() => {
                // 请求接口删除
                deleteDataset(uuid, params)
                    .then(() => {
                        // 刷新列表
                        this.fetchData();
                    });
            });
        },
        handleDatasetCreation() {
            this.$router.push({
                name: 'SdxvDatasetCreation'
            });
        },
        handleSelectAll() {
            this.checkedDatasetList = this.datasetList.map(item => {
                return item.uuid;
            });
        },
        handleShareAll(users, groups, shareType) {
            datasetShareBatch(this.checkedDatasetList, {
                users,
                groups,
                isPublic: shareType === 'PRIVATE' ? false : true
            })
                .then(() => {
                    // 刷新列表
                    // todo: 验证刷新
                    this.fetchData();
                });
        },
        handleDeleteBatch() {
            datasetDeleteBatch(this.checkedDatasetList)
                .then(() => {
                    // 刷新列表
                    // todo: 验证刷新
                    this.fetchData();
                });
        },
        handleCancelShareBatch() {
            datasetShareBatch(this.checkedDatasetList, {
                users: [],
                groups: [],
                isPublic: false
            })
                .then(() => {
                    // 刷新列表
                    // todo: 验证刷新
                    this.fetchData();
                });
        },
        handleCancelShare(dataset) {
            updateDataset(dataset.uuid, {
                users: [],
                groups: [],
                isPublic: false
            })
                .then(() => {
                    // 刷新列表
                    // todo: 验证刷新
                    this.fetchData();
                });
        },
        startPolling() {
            if (!this._isDestroyed) {
                this.pollingId && clearTimeout(this.pollingId);
                this.pollingId = setTimeout(() => {
                    this.fetchData(false);
                }, POLLING_PERIOD);
            }
        },
        stopPolling() {
            this.pollingId && clearTimeout(this.pollingId);
            this.pollingId = 0;
        }
    },
    created() {
        this.fetchData();
        this.getLabelList();
    },
    watch: {
        // todo:
        // checkedDatasetList(nval) {
        //     window.console.error(nval);
        // },
        queryParams() {
            this.fetchData();
        }
    }
};
</script>

<style>

</style>
