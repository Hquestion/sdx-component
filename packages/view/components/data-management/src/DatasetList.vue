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
                            :value="item.label"
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
        <div class="sdxv-dataset-list__operation">
            <SdxuButton
                v-if="params.shareType === 'PRIVATE'"
                @click="handleShareAll"
                icon="sdx-fenxiang"
            >
                {{ t('view.dataManagement.ShareAll') }}
            </SdxuButton>
            <SdxuButton
                v-if="params.shareType === 'PRIVATE'"
                type="default"
                @click="handleDeleteBatch"
                icon="sdx-kapianshanchu"
            >
                {{ t('view.dataManagement.DeleteBatch') }}
            </SdxuButton>
            <SdxuButton
                v-if="params.shareType === 'MY_SHARE'"
                @click="handleCancelShare"
                icon="sdx-quxiaofenxiang"
            >
                {{ t('view.dataManagement.CancelShare') }}
            </SdxuButton>
        </div>
        <div class="sdxv-dataset-list__list">
            <div class="sdxv-dataset-list__card">
                <DatasetCard
                    class="sdxv-dataset-list__card--item"
                    v-for="(item, i) in datasetList"
                    :key="i"
                    :dataset-info="item"
                    :share-type="params.shareType"
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
        </div>
        <SdxwShareSetting
            :visible.sync="shareDialogVisible"
            @confirm-edit="confirmShare"
        />
        <DatasetEdit
            :visible.sync="editDialogVisible"
            :dataset="editDataset"
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
import DatasetEdit from './DatasetEdit';
import SdxuButton from '@sdx/ui/components/button';
import SdxuSortButton from '@sdx/ui/components/sort-button';
import SdxwShareSetting from '@sdx/widget/components/share-setting';
import MessageBox from '@sdx/ui/components/message-box';

import { DATA_FORMAT_LIST } from './config';

import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';

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
        DatasetCard,
        DatasetEdit,
        SdxuButton,
        SdxuSortButton,
        SdxwShareSetting,
    },
    data() {
        return {
            selectedDataFormat: '',
            selectedLabel: '',
            name: '',
            dataTypeList: DATA_FORMAT_LIST,
            // todo:
            labelList: [],
            page: 1,
            pageSize: 10,
            total: 0,
            order: 'desc',
            shareDialogVisible: false,
            editDialogVisible: false,
            editDataset: {},
            params: {
                name: '',
                order: '',
                orderBy: 'createdAt',
                start: 1,
                count: 10,
                shareType: 'ALL',
                isPublic: false,
                label: '',
                dataFormat: ''
            },
            datasetList: [
                {
                    name: 'xxx数据集',
                    size: 1073741824,
                    count: 10,
                    fileType: 'CSV',
                    creator: 'zhangsan',
                    createdAt: '2019-10-18T07:50:17.748000Z',
                    description: 'safa阿斯顿发多发法师法师打发到沙发上丰富',
                    state: 'Running',
                    coverImg: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=05b297ad39fa828bce239be3cd1e41cd/0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg',
                    labels: [
                        {
                            label: 'tag1'
                        },
                        {
                            label: 'tag2'
                        },
                        {
                            label: 'tag3'
                        },
                    ],
                    operations: [
                        {
                            label: '分享',
                            value: 'share',
                            icon: 'sdx-fenxiang'
                        },
                        {
                            label: '编辑',
                            value: 'edit',
                            icon: 'sdx-kapianbianji'
                        },
                        {
                            label: '删除',
                            value: 'delete',
                            icon: 'sdx-kapianshanchu'
                        },
                    ]
                },
                {
                    name: 'xxx数据集',
                    size: 1073741824,
                    count: 10,
                    fileType: 'CSV',
                    creator: 'zhangsan',
                    createdAt: '2019-10-18T07:50:17.748000Z',
                    description: 'safa阿斯顿发多发法师法师打发到沙发上丰富',
                    state: 'Running',
                    coverImg: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=05b297ad39fa828bce239be3cd1e41cd/0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg',
                    labels: [
                        {
                            label: 'tag1'
                        },
                        {
                            label: 'tag2'
                        },
                        {
                            label: 'tag3'
                        },
                    ],
                    operations: [
                        {
                            label: '分享',
                            value: 'share',
                            icon: 'sdx-fenxiang'
                        },
                        {
                            label: '编辑',
                            value: 'edit',
                            icon: 'sdx-kapianbianji'
                        },
                        {
                            label: '删除',
                            value: 'delete',
                            icon: 'sdx-kapianshanchu'
                        },
                    ]
                },
                {
                    name: 'xxx数据集',
                    size: 1073741824,
                    count: 10,
                    fileType: 'CSV',
                    creator: 'zhangsan',
                    createdAt: '2019-10-18T07:50:17.748000Z',
                    description: 'safa阿斯顿发多发法师法师打发到沙发上丰富',
                    state: 'Running',
                    coverImg: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=05b297ad39fa828bce239be3cd1e41cd/0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg',
                    labels: [
                        {
                            label: 'tag1'
                        },
                        {
                            label: 'tag2'
                        },
                        {
                            label: 'tag3'
                        },
                    ],
                    operations: [
                        {
                            label: '分享',
                            value: 'share',
                            icon: 'sdx-fenxiang'
                        },
                        {
                            label: '编辑',
                            value: 'edit',
                            icon: 'sdx-kapianbianji'
                        },
                        {
                            label: '删除',
                            value: 'delete',
                            icon: 'sdx-kapianshanchu'
                        },
                    ]
                },
            ],
        };
    },
    computed: {
        queryParams() {
            // todo:
            return Object.assign({}, this.params, {
                start: this.page * this.pageSize + 1,
                count: this.pageSize
            });
        }
    },
    methods: {
        fetchData() {
            // todo:
        },
        getLabelList() {
            // todo:
        },
        handlePageChange(page) {
            this.page = page;
        },
        handleSearch() {
            this.params.name = this.name;
            this.params.label = this.selectedLabel;
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
                    this.shareDialogVisible = true;
                    // todo: dataset??
                    break;
                case 'edit':
                    // todo:
                    this.editDialogVisible = true;
                    this.editDataset = dataset;
                    break;
                case 'delete':
                    // todo:
                    this.handleDeleteDataset();
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
        handleDeleteDataset() {
            MessageBox.confirm.warning({
                title: this.t('view.dataManagement.DatasetDeleteTips'),
                content: this.t('view.dataManagement.DatasetDeleteContent')
            }).then(() => {
                // todo: 请求接口删除
                // todo: 刷新列表
            });
        },
        confirmShare() {
            // todo:
            // todo: 刷新列表
        },
        handleDatasetCreation() {
            this.$router.push({
                name: 'SdxvDatasetCreation'
            });
        },
        handleShareAll() {
            // todo:
        },
        handleDeleteBatch() {
            // todo:
        },
        handleCancelShare() {
            // todo:
        },
    }
};
</script>

<style>

</style>
