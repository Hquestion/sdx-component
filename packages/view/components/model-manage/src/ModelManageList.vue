<template>
    <sdxu-content-panel class="sdxv-model-management">
        <div class="sdxv-model-management__header">
            <SdxuTabRadioGroup
                v-model="modelType"
                @switch="switchModelType"
            >
                <SdxuTabRadioItem name="ALL">
                    全部列表
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="PRIVATE">
                    私有模型列表
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="MY_SHARE">
                    我的共享列表
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="OTHER_SHARE">
                    他人共享列表
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <SdxuButton
                type="primary"
                icon="sdx-icon-plus"
                size="small"
                @click="createModel"
                v-auth.model.button="'MODEL:CREATE'"
            >
                新建模型
            </SdxuButton>
        </div>
        <div>
            <div class="sdxv-model-management__filter">
                <sdxw-search-layout
                    @search="search"
                    style="width: 100%"
                >
                    <sdxw-search-item>
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            size="small"
                            placeholder="请输入模型名称"
                        />
                    </sdxw-search-item>
                </sdxw-search-layout>
            </div>
        </div>
        <div
            class="sdxv-model-management__list"
        >
            <model-list-table
                ref="modelListTable"
                :model-type="modelType"
                :name="searchName"
                :is-owner="isOwner"
            />
        </div>
        <div>
            <create-model
                :visible.sync="createDialogVisible"
                v-if="createDialogVisible"
                @close="dialogClose"
            />
        </div>
    </sdxu-content-panel>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import ModelListTable from './model-list-table/Index';
import CreateModel from './CreateModel';
import ContentPanel from '@sdx/ui/components/content-panel';
import Button from '@sdx/ui/components/button';
import Input from '@sdx/ui/components/input';
import SearchLayout from  '@sdx/widget/components/search-layout';
import auth from '@sdx/widget/components/auth';
export default {
    name: 'SdxvModelManage',
    data() {
        return {
            searchName: '',
            buildType: '',
            shareType: '',
            modelType: 'ALL',
            isOwner: '',
            createDialogVisible: false
        };
    },
    components: {
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [Button.name]: Button,
        [Input.name]: Input,
        ModelListTable,
        [ContentPanel.name]: ContentPanel,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        CreateModel
    },
    directives: {
        auth
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
        reset() {
            this.resetFilters();
            this.$nextTick(() => {
                this.updateTable();
            });
        },
        switchModelType(val) {
            this.resetVariables();
            this.modelType = val;
            switch (val) {
            case 'private':
                this.shareType = 'PRIVATE';
                break;
            case 'myShare':
                this.shareType = 'PUBLIC';
                this.isOwner = 'true';
                break;
            case 'otherShare':
                this.shareType = 'PUBLIC';
                this.isOwner = 'false';
                break;
            default:
                break;
            }
            this.$nextTick(() => {
                this.updateTable();
            });
        },
        createModel() {
            this.createDialogVisible = true;
        },
        resetFilters() {
            this.searchName = '';
            this.buildType = '';
        },
        resetVariables() {
            this.searchName = '';
            this.shareType = '';
            this.isOwner = '';
            this.buildType = '';
        },
        updateTable() {
            this.$refs.modelListTable.initModelList(true);
        }
    }
};
</script>
