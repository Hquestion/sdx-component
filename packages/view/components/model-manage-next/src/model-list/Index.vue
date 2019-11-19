<template>
    <div class="sdxv-model-list">
        <div class="sdxv-model-list__sort">
            <SdxuTabRadioGroup
                v-model="shareType"
                @switch="switchShareType"
            >
                <SdxuTabRadioItem name="ALL">
                    所有模型
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="PRIVATE">
                    私有模型
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="MY_SHARE">
                    我的共享
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="OTHER_SHARE">
                    他人共享
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <div>
                <sdxu-button
                    placement="right"
                    trigger="click"
                    style="margin-right: 24px; vertical-align: middle"
                >
                    <i class="sdx-icon sdx-icon-plus" />
                    导入模型
                    <template slot="dropdown">
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="createModel"
                        >
                            新建模型
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="createVersion"
                        >
                            添加已有版本
                        </SdxuButton>
                    </template>
                </sdxu-button>
                <SdxuSortButton
                    :title="t('view.project.sortByCreateTime')"
                    @sortChange="updateTable"
                    :order.sync="order"
                    style="vertical-align: middle"
                />
            </div>
        </div>
        <div class="sdxv-model-list__filter">
            <sdxw-search-layout
                @search="updateTable"
                @reset="reset"
            >
                <sdxw-search-item label="模型名称:">
                    <sdxu-input
                        v-model="searchName"
                        type="search"
                        size="small"
                        :placeholder="t('view.model.searchModelName')"
                    />
                </sdxw-search-item>
                <sdxw-search-item label="模型类型:">
                    <el-select
                        v-model="modelType"
                        :placeholder="`请选择模型类型`"
                    >
                        <el-option
                            v-for="item in labelOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label"
                        />
                    </el-select>
                </sdxw-search-item>
                <sdxw-search-item label="模型标签:">
                    <el-select
                        v-model="searchLabels"
                        multiple
                        filterable
                        :placeholder="t('view.model.selectLabel')"
                    >
                        <el-option
                            v-for="item in labelOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label"
                        />
                    </el-select>
                </sdxw-search-item>
            </sdxw-search-layout>
        </div>
        <div
            class=""
        >
            <model-list-table
                :name="searchName"
                ref="modelListTable"
                :order="order"
                :order-by="orderBy"
                :share-type="shareType"
                :search-labels="searchLabels"
                :model-type="modelType"
            />
        </div>
        <div>
            <create-model
                :visible.sync="createDialogVisible"
                v-if="createDialogVisible"
                @close="dialogClose"
            />
            <create-version
                :visible.sync="createVersionVisible"
                v-if="createVersionVisible"
                @close="dialogClose"
            />
        </div>
    </div>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import ElSelect from 'element-ui/lib/select';
import ModelListTable from './model-list-table/Index';
import CreateModel from './CreateModel';
import CreateVersion from './CreateVersion';
import Button from '@sdx/ui/components/button';
import Input from '@sdx/ui/components/input';
import { getLabels } from '@sdx/utils/src/api/model';
import SearchLayout from  '@sdx/widget/components/search-layout';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxvModelManage',
    data() {
        return {
            searchName: '',
            shareType: 'ALL',
            order: 'desc',
            orderBy: 'createdAt',
            createDialogVisible: false,
            createVersionVisible: false,
            labelOptions: [],
            modelTypeOptions: [],
            searchLabels: [],
            modelType: ''
        };
    },
    components: {
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [Button.name]: Button,
        [Input.name]: Input,
        ModelListTable,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        CreateModel,
        CreateVersion,
        ElSelect
    },
    mixins: [locale],
    directives: {
        auth
    },
    created() {
        getLabels().then(res => {
            this.labelOptions = res.items;
        });
    },
    methods: {
        dialogClose(needRefresh) {
            if (needRefresh) this.updateTable();
        },
        search() {
            this.$nextTick(() => {
                this.updateTable();
            });
        },
        switchShareType(val) {
            this.resetFilters();
            this.shareType = val;
            this.updateTable();
        },
        createModel() {
            this.createDialogVisible = true;
        },
        createVersion() {
            this.createVersionVisible = true;
        },
        reset() {
            this.resetFilters();
            this.updateTable();
        },
        resetFilters() {
            this.searchName = '';
            this.searchLabels = [];
            this.modelType = '';
        },
        updateTable() {
            this.$nextTick(() => {
                this.$refs.modelListTable.initModelList(true);
            });
        }
    }
};
</script>
