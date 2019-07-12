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
                <el-tabs
                    v-model="activeName"
                    @tab-click="selectImageKind"
                >
                    <el-tab-pane
                        label="全部"
                        name="all"
                    />
                    <el-tab-pane
                        label="基础镜像"
                        name="basic"
                    />
                    <el-tab-pane
                        label="私有镜像"
                        name="private"
                    />
                    <el-tab-pane
                        label="我的共享"
                        name="myShare"
                    />
                    <el-tab-pane
                        label="他人共享"
                        name="otherShare"
                    />
                </el-tabs>
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
                                v-for="(item, index) in dynamicBuildTypes"
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
import ElSelect from 'element-ui/lib/select';
import ElTabs from 'element-ui/lib/tabs';
import ElTabPane from 'element-ui/lib/tab-pane';
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
            projectType: this.$route.params.tab === 'imageTab' ? 'image' : 'task',
            imageKind: 'all',
            isOwner: '',
            taskType: '',
            activeName: 'all',
            state: '',
            imageTypes: [
                'JUPYTER',
                'PYTHON',
                'SPARK',
                'TENSORFLOW',
                'TENSORFLOW_DEPLOYMENT',
                'SPARK_DEPLOYMENT',
                'PMML_DEPLOYMENT',
                'CONTAINER_DEV',
                'OTHER'
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
                    value: 'CREATED'
                },
                {
                    label: '构建中',
                    value: 'BUILDING'
                },
                {
                    label: '构建完成',
                    value: 'BUILDED'
                },
                {
                    label: '上传中',
                    value: 'UPLOADING'
                },
                {
                    label: '已失败',
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
        ElSelect,
        ElTabs,
        ElTabPane,
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
    computed: {
        dynamicBuildTypes() {
            if (this.imageKind === 'all' || this.imageKind === 'basic') {
                return this.buildTypes;
            } else {
                return this.buildTypes.filter(item => item.value !== 'BASIC');
            }
        }
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
        selectImageKind(tab) {
            this.resetVariables();
            this.imageKind = tab.name;
            switch (tab.name) {
            case 'basic':
                this.buildType = 'BASIC';
                break;
            case 'private':
                this.shareType = 'PRIVATE';
                this.isOwner = 'true';
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

