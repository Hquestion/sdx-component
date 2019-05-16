<template>
    <sdxu-content-panel class="sdxv-image-management">
        <div class="sdxv-image-management__header">
            <SdxuTabRadioGroup
                v-model="projectType"
                @switch="switchProjectType"
            >
                <SdxuTabRadioItem name="image">
                    镜像列表
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="task">
                    构建任务列表
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <SdxuButton
                type="primary"
                icon="sdx-icon-plus"
                size="small"
                @click="goFileBuild"
            >
                基于文件构建
            </SdxuButton>
        </div>
        <div v-if="projectType === 'image'">
            <div class="sdxv-image-management__nav-menu">
                <el-menu
                    default-active="all"
                    mode="horizontal"
                    @select="selectImageKind"
                    background-color="#fff"
                >
                    <el-menu-item index="all">
                        全部
                    </el-menu-item>
                    <el-menu-item index="basic">
                        基础镜像
                    </el-menu-item>
                    <el-menu-item index="private">
                        私有镜像
                    </el-menu-item>
                    <el-menu-item index="myShare">
                        我的共享
                    </el-menu-item>
                    <el-menu-item index="otherShare">
                        他人共享
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="sdxv-image-management__filter">
                <sdxu-input
                    v-model="searchName"
                    searchable
                    type="search"
                    size="small"
                    placeholder="请输入文件名"
                    @search="searchImage"
                />
                <div>
                    <span>镜像来源:</span>
                    <el-select
                        v-model="source"
                        size="medium"
                        @change="sourceChange"
                    >
                        <el-option
                            label="全部"
                            value=""
                        />
                        <el-option
                            label="按创建人排序"
                            value="created_by"
                        />
                        <el-option
                            label="按项目类型排序"
                            value="project_type"
                        />
                    </el-select>
                </div>
                <div>
                    <span>镜像种类:</span>
                    <el-select
                        v-model="imageType"
                        size="medium"
                        @change="imageTypeChange"
                    >
                        <el-option
                            label="全部"
                            value=""
                        />
                        <el-option
                            label="按创建人排序"
                            value="created_by"
                        />
                        <el-option
                            label="按项目类型排序"
                            value="project_type"
                        />
                    </el-select>
                </div>
                <div>
                    <span>构建方式:</span>
                    <el-select
                        v-model="buildType"
                        size="medium"
                        @change="buildTypeChange"
                    >
                        <el-option
                            label="全部"
                            value=""
                        />
                        <el-option
                            label="按创建人排序"
                            value="created_by"
                        />
                        <el-option
                            label="按项目类型排序"
                            value="project_type"
                        />
                    </el-select>
                </div>
                <SdxuButton
                    icon="sdx-icon-plus"
                    size="small"
                    invert
                >
                    重置查询
                </SdxuButton>
            </div>
        </div>
        <div
            class="sdxv-image-management__list"
            v-if="projectType === 'image'"
        >
            <image-list-table
                ref="imageListTable"
                :image-kind="imageKind"
                :name="searchName"
                :image-type="imageType"
                :share-type="shareType"
                :build-type="buildType"
                :task-type="taskType"
                :is-owner="isOwner"
                @selection-change="selectionChange"
            />
        </div>
        <div
            class="sdxv-image-management__list"
            v-if="projectType === 'task'"
        >
            <image-task-table />
        </div>
    </sdxu-content-panel>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import ImageListTable from './image-list-table/Index';
import ContentPanel from '@sdx/ui/components/content-panel';
import Button from '@sdx/ui/components/button';
import { Menu, MenuItem, Select } from 'element-ui';
import Input from '@sdx/ui/components/input';
import ImageTaskTable from './image-task-table/Index';
export default {
    name: 'SdxvImageManage',
    data() {
        return {
            searchName: '',
            source: '',
            imageType: '',
            buildType: '',
            shareType: '',
            projectType: 'image',
            imageKind: 'all',
            selectedImages: [],
            isOwner: ''
        };
    },
    components: {
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [Button.name]: Button,
        [Menu.name]: Menu,
        [Select.name]: Select,
        [MenuItem.name]: MenuItem,
        [Input.name]: Input,
        ImageListTable,
        [ContentPanel.name]: ContentPanel,
        ImageTaskTable
    },
    methods: {
        selectionChange(selection) {
            this.selectedImages = selection;
        },
        searchImage() {
            console.log('111111111111');
        },
        sourceChange() {
            console.log('222222222');
        },
        imageTypeChange() {
            console.log('22222222');
        },
        buildTypeChange() {
            console.log('22222');
        },
        switchProjectType() {
            console.log('22222');
        },
        selectImageKind(key) {
            this.reset();
            this.imageKind = key;
            switch (key) {
            case 'basic':
                this.buildType = 'BASIC';
                break;
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
        goFileBuild() {
            this.$router.push({ name: 'filebuild' });
        },
        reset() {
            this.searchName = '';
            this.source = '';
            this.imageType = '';
            this.shareType = '';
            this.isOwner = '';
            this.buildType = '';
            this.selectedImages = [];
        },
        updateTable() {
            this.$refs.imageListTable.initImageList(true);
        }
    }
};
</script>

<style scoped lang="scss">
</style>

