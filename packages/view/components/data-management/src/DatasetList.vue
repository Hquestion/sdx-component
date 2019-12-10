<template>
    <div class="sdxv-dataset-list">
        <div class="sdxv-dataset-list__title">
            {{ t('view.dataManagement.FileDataset') }}
        </div>
        <div class="sdxv-dataset-list__tabs">
            <SdxuTabRadioGroup v-model="currentTab">
                <SdxuTabRadioItem name="all">
                    {{ t('view.dataManagement.AllDataset') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="self">
                    {{ t('view.dataManagement.SelfDataset') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="my-share">
                    {{ t('view.dataManagement.MyShare') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="others-share">
                    {{ t('view.dataManagement.OthersShare') }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <div class="sdxv-dataset-list__tabs--button">
                <SdxuButton icon="sdx-xinjianhao">
                    {{ t('view.dataManagement.CreateDataset') }}
                </SdxuButton>
                <SdxuSortButton
                    class="sdxv-dataset-list__button--sort"
                    :title="t('view.dataManagement.CreatedTimeSort')"
                    :order="order"
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
                        v-model="selectedTag"
                        size="large"
                    >
                        <el-option
                            v-for="item in tagList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.dataManagement.DataFormat') + ':'">
                    <el-select
                        v-model="selectedType"
                        size="large"
                    >
                        <el-option
                            v-for="item in dataTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="sdxv-dataset-list__list">
            <div class="sdxv-dataset-list__card">
                <DatasetCard
                    class="sdxv-dataset-list__card--item"
                    v-for="(item, i) in datasetList"
                    :key="i"
                    :dataset-info="item"
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
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuTabRadio from '@sdx/ui/components/tab-radio';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import SdxuPagination from '@sdx/ui/components/pagination';
import DatasetCard from './DatasetCard';
import SdxuButton from '@sdx/ui/components/button';
import SdxuSortButton from '@sdx/ui/components/sort-button';
import SdxwShareSetting from '@sdx/widget/components/share-setting';

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
        SdxuButton,
        SdxuSortButton,
        SdxwShareSetting,
    },
    data() {
        return {
            currentTab: 'all',
            selectedType: '',
            selectedTag: '',
            name: '',
            dataTypeList: [],
            tagList: [],
            page: 1,
            pageSize: 10,
            total: 0,
            order: 'desc',
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
                    image: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=05b297ad39fa828bce239be3cd1e41cd/0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg',
                    tags: [
                        {
                            name: 'tag1'
                        },
                        {
                            name: 'tag2'
                        },
                        {
                            name: 'tag3'
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
                    image: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=05b297ad39fa828bce239be3cd1e41cd/0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg',
                    tags: [
                        {
                            name: 'tag1'
                        },
                        {
                            name: 'tag2'
                        },
                        {
                            name: 'tag3'
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
                    image: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=05b297ad39fa828bce239be3cd1e41cd/0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg',
                    tags: [
                        {
                            name: 'tag1'
                        },
                        {
                            name: 'tag2'
                        },
                        {
                            name: 'tag3'
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
            shareDialogVisible: false,
            editDialogVisible: false
        };
    },
    computed: {
        queryParams() {
            // todo:
            return Object.assign({}, {}, {
                start: this.page * this.pageSize + 1,
                count: this.pageSize
            });
        }
    },
    methods: {
        handlePageChange(page) {
            this.page = page;
        },
        handleSearch() {
            // todo:
        },
        handleReset() {
            // todo:
        },
        handleClickSortButton() {
            this.order = this.order === 'desc' ? 'asc' : 'desc';
        },
        handleOperation(operation, dataset) {
            switch(operation) {
                case 'share':
                    this.shareDialogVisible = true;
                    // todo: dataset??
                    break;
                case 'edit':
                    // todo:
                    break;
                case 'delete':
                    // todo:
                    break;
            }
        },
        handleDetail(uuid) {
            // todo: 路由跳转
        },
        confirmShare() {
            // todo:
        }
    }
};
</script>

<style>

</style>
