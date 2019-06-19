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
                v-auth.image.button="'IMAGE_BUILDER:BUILD_BASIC'"
            >
                基于文件构建
            </SdxuButton>
        </div>
        <div>
            <div
                class="sdxv-image-management__nav-menu"
                v-if="projectType === 'image'"
            >
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
                <sdxw-search-layout
                    @search="search"
                    @reset="reset"
                    style="width: 100%"
                    label-width="72px"
                >
                    <sdxw-search-item label="镜像名称:">
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            size="small"
                            placeholder="请输入镜像名称"
                        />
                    </sdxw-search-item>
                    <sdxw-search-item label="镜像种类:">
                        <el-select
                            v-model="imageType"
                            size="medium"
                        >
                            <el-option
                                label="全部"
                                value=""
                            />
                            <el-option
                                v-for="(item, index) in imageTypes"
                                :key="index"
                                :value="item"
                                :label="item"
                            />
                        </el-select>
                    </sdxw-search-item>
                    <sdxw-search-item
                        label="状态:"
                        v-show="projectType === 'task'"
                    >
                        <el-select
                            v-model="state"
                            size="medium"
                        >
                            <el-option
                                label="全部"
                                value=""
                            />
                            <el-option
                                v-for="(item, index) in states"
                                :key="index"
                                :value="item.value"
                                :label="item.label"
                            />
                        </el-select>
                    </sdxw-search-item>
                    <sdxw-search-item
                        label="构建方式:"
                        v-show="imageKind !== 'basic'"
                    >
                        <el-select
                            v-model="buildType"
                            size="medium"
                        >
                            <el-option
                                label="全部"
                                value=""
                            />
                            <el-option
                                v-for="(item, index) in buildTypes"
                                :key="index"
                                :value="item.value"
                                :label="item.label"
                            />
                        </el-select>
                    </sdxw-search-item>
                </sdxw-search-layout>
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
            />
        </div>
        <div
            class="sdxv-image-management__list"
            v-if="projectType === 'task'"
        >
            <image-task-table 
                ref="imageTaskTable"
                :name="searchName"
                :image-type="imageType"
                :state="state"
                :build-type="buildType"
            />
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
import SearchLayout from  '@sdx/widget/components/search-layout';
import auth from '@sdx/widget/components/auth';
export default {
    name: 'SdxvImageManage',
    data() {
        return {
            searchName: '',
            imageType: '',
            buildType: '',
            shareType: '',
            projectType: 'image',
            imageKind: 'all',
            isOwner: '',
            taskType: '',
            state: '',
            imageTypes: [
                'JUPYTER',
                'PYTHON',
                'SPARK',
                'TENSORFLOW',
                'TENSORFLOW_SERVING',
                'SPARK_SERVING',
                'PMML_SERVING',
                'CONTAINER_DEV',
                'OTHER' ,
                'H2O',
                'NVIDIA_DIGITS'
            ],
            buildTypes: [
                {
                    label: '基础镜像',
                    value: 'BASIC'
                },
                {
                    label: '在线构建',
                    value: 'ONLINE'
                },
                {
                    label: '基于tar构建',
                    value: 'TAR'
                },
                {
                    label: '基于DockerFile构建',
                    value: 'DOCKERFILE'
                },
                {
                    label: '任务转存',
                    value: 'TASK'
                }
            ],
            states: [
                {
                    label: '创建中',
                    value: 'BUILDING'
                },
                {
                    label: '创建完成',
                    value: 'BUILDED'
                },
                {
                    label: '上传中',
                    value: 'UPLOADING'
                },
                {
                    label: '失败',
                    value: 'FAILED'
                },
                {
                    label: '已完成',
                    value: 'FINISHED'
                }
            ]
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
        ImageTaskTable,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
    },
    directives: {
        auth
    },
    methods: {
        search() {
            this.$nextTick(() => {
                if(this.projectType === 'image') {
                    this.updateTable();
                } else {
                    this.updateTaskTable();
                }
            });
        },
        reset() {
            this.resetFilters();
            this.$nextTick(() => {
                if(this.projectType === 'image') {
                    this.updateTable();
                } else {
                    this.updateTaskTable();
                }
            });
        },
        switchProjectType() {
            this.$router.push({
                name: 'imageList',
                params: {
                    tab: this.projectType === 'image'? 'imageTab':'taskTab'
                }
            });
        },
        selectImageKind(key) {
            this.resetVariables();
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
        resetFilters() {
            this.searchName = '';
            this.imageType = '';
            this.buildType = '';
            this.state = '';
        },
        resetVariables() {
            this.searchName = '';
            this.imageType = '';
            this.shareType = '';
            this.isOwner = '';
            this.buildType = '';
            this.state = '';
        },
        updateTable() {
            this.$refs.imageListTable.initImageList(true);
        },
        updateTaskTable() {
            this.$refs.imageTaskTable.initImageTaskList(true);
        }
    }
};
</script>

<style scoped lang="scss">
</style>

