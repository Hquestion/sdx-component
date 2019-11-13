<template>
    <div class="sdxv-model-list">
        <div class="sdxv-model-list__title">
            模型仓库
        </div>
        <div class="sdxv-model-list__sort">
            <SdxuTabRadioGroup
                v-model="modelType"
                @switch="switchModelType"
            >
                <SdxuTabRadioItem name="ALL">
                    {{ t('view.model.tabs.all') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="PRIVATE">
                    {{ t('view.model.tabs.private') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="MY_SHARE">
                    {{ t('view.model.tabs.myShare') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="OTHER_SHARE">
                    {{ t('view.model.tabs.otherShare') }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
        </div>
    </div>
    <!-- <sdxu-content-panel
        class="sdxv-model-management"
        fullscreen
    >
        <div class="sdxv-model-management__header">
            <SdxuTabRadioGroup
                v-model="modelType"
                @switch="switchModelType"
            >
                <SdxuTabRadioItem name="ALL">
                    {{ t('view.model.tabs.all') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="PRIVATE">
                    {{ t('view.model.tabs.private') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="MY_SHARE">
                    {{ t('view.model.tabs.myShare') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="OTHER_SHARE">
                    {{ t('view.model.tabs.otherShare') }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <SdxuButton
                type="primary"
                icon="sdx-icon-plus"
                size="small"
                @click="createModel"
                v-auth.model.button="'MODEL:CREATE'"
            >
                {{ t('view.model.createModel') }}
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
                            :placeholder="t('view.model.searchModelName')"
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
    </sdxu-content-panel> -->
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
import locale from '@sdx/utils/src/mixins/locale';
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
    mixins: [locale],
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
