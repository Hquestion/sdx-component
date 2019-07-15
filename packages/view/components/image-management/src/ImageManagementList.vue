<template>
    <sdxu-content-panel class="sdxv-image-management">
        <div class="sdxv-image-management__header">
            <SdxuTabRadioGroup
                v-model="projectType"
                @switch="switchProjectType"
            >
                <SdxuTabRadioItem name="image">
                    {{ t('view.image.ImageList') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="task">
                    {{ t('view.image.BuildTaskList') }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <SdxuButton
                type="primary"
                icon="sdx-icon-plus"
                size="small"
                @click="goFileBuild"
                v-auth.image.button="'IMAGE_BUILDER:BUILD_BASIC'"
            >
                {{ t('view.image.BuildBasedOnFile') }}
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
                        :label="t('ALL')"
                        name="all"
                    />
                    <el-tab-pane
                        :label="t('view.image.ImageKind.Basic')"
                        name="basic"
                    />
                    <el-tab-pane
                        :label="t('view.image.ImageKind.Private')"
                        name="private"
                    />
                    <el-tab-pane
                        :label="t('view.image.ImageKind.MyShare')"
                        name="myShare"
                    />
                    <el-tab-pane
                        :label="t('view.image.ImageKind.OtherShare')"
                        name="otherShare"
                    />
                </el-tabs>
            </div>
            <div class="sdxv-image-management__filter">
                <sdxw-search-layout
                    @search="search"
                    @reset="reset"
                    style="width: 100%"
                    label-width="100px"
                >
                    <sdxw-search-item :label="t('view.image.SearchImageName')">
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            size="small"
                            :placeholder="t('view.image.ImageNameInputPlaceholder')"
                        />
                    </sdxw-search-item>
                    <sdxw-search-item :label="t('view.image.SearchImageKind')">
                        <el-select
                            v-model="imageType"
                            size="medium"
                        >
                            <el-option
                                :label="t('ALL')"
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
                        :label="t('view.image.SearchImageState')"
                        v-show="projectType === 'task'"
                    >
                        <el-select
                            v-model="state"
                            size="medium"
                        >
                            <el-option
                                :label="t('ALL')"
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
                        :label="t('view.image.SearchBuildType')"
                        v-show="imageKind !== 'basic'"
                    >
                        <el-select
                            v-model="buildType"
                            size="medium"
                        >
                            <el-option
                                :label="t('ALL')"
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
import locale from '@sdx/utils/src/mixins/locale';
import {t} from '@sdx/utils/src/locale';
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
                    label: t('view.image.BuildTypes.Basic'),
                    value: 'BASIC'
                },
                {
                    label: t('view.image.BuildTypes.Online'),
                    value: 'ONLINE'
                },
                {
                    label: t('view.image.BuildTypes.Tar'),
                    value: 'TAR'
                },
                {
                    label: t('view.image.BuildTypes.Dockerfile'),
                    value: 'DOCKERFILE'
                },
                {
                    label: t('view.image.BuildTypes.Task'),
                    value: 'TASK'
                }
            ],
            states: [
                {
                    label: t('view.image.States.Created'),
                    value: 'CREATED'
                },
                {
                    label: t('view.image.States.Building'),
                    value: 'BUILDING'
                },
                {
                    label: t('view.image.States.Builded'),
                    value: 'BUILDED'
                },
                {
                    label: t('view.image.States.Uploading'),
                    value: 'UPLOADING'
                },
                {
                    label: t('view.image.States.Failed'),
                    value: 'FAILED'
                },
                {
                    label: t('view.image.States.Finished'),
                    value: 'FINISHED'
                }
            ]
        };
    },
    mixins: [locale],
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

