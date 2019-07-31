<template>
    <div class="sdxv-project-management">
        <div class="sdxv-project-management__header">
            {{ t('view.project.projectList') }}
        </div>
        <div class="sdxv-project-management__tool">
            <div class="sdxv-project-management__tool--left">
                <SdxwSearchLayout
                    @search="searchProject"
                    :block="false"
                    align="right"
                    style="flex: 1"
                >
                    <SdxwSearchItem>
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            size="small"
                            :placeholder="t('view.project.enterProjectName')"
                        />
                    </SdxwSearchItem>
                </SdxwSearchLayout>
            </div>
            <div class="sdxv-project-management__tool--right">
                <sdxu-button
                    placement="right"
                    size="small"
                    trigger="click"
                    style="margin-right: 10px;"
                    v-auth.project.button="'PROJECT:CREATE'"
                >
                    {{ t('view.project.createProject') }}
                    <template slot="dropdown">
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('empty')"
                        >
                            {{ t('view.project.emptyCreate') }}
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('template')"
                        >
                            {{ t('view.project.templateCreate') }}
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('project')"
                        >
                            {{ t('view.project.copyCreate') }}
                        </SdxuButton>
                    </template>
                </sdxu-button>
                <SdxuSortButton
                    :title="t('view.project.sortByCreateTime')"
                    @sortChange="sortChange"
                    :order.sync="order"
                />
            </div>
        </div>
        <sdxu-content-panel
            style="margin-bottom: 30px;"
            :title="t('view.project.template')"
            v-loading="templatesLoading"
        >
            <div v-if="templateList.length || !templatesLoaded">
                <SdxuScroll style="height: 230px;">
                    <sdxw-project-card-list>
                        <sdxw-project-card
                            @operate="handleOperate"
                            v-for="(item, index) in templateList"
                            :key="index"
                            :meta="item"
                            :edit-able="item.showEdit"
                            :delete-able="item.showRemove"
                        />
                    </sdxw-project-card-list>
                </SdxuScroll>
            </div>
            <SdxuEmpty v-else />
        </sdxu-content-panel>
        <sdxu-content-panel
            :title="t('view.project.privateAndShare')"
            class="sdxv-project-management__bottom-panel"
        >
            <div class="sdxv-project-management__bottom-panel--content">
                <SdxuTabRadioGroup
                    v-model="projectType"
                    style="margin-bottom: 10px;"
                    @switch="switchProjectType"
                >
                    <SdxuTabRadioItem
                        name="private"
                    >
                        {{ t('view.project.selfCreateProject') }}
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem
                        name="public"
                    >
                        {{ t('view.project.otherProject') }}
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <div v-if="projectList.length || !projectsLoaded">
                    <div>
                        <sdxw-project-card-list v-loading="projectsLoading">
                            <sdxw-project-card
                                @operate="handleOperate"
                                v-for="(item, index) in projectList"
                                :key="index"
                                :meta="item"
                                :edit-able="item.showEdit"
                                :delete-able="item.showRemove"
                            />
                        </sdxw-project-card-list>
                    </div>
                </div>
                <SdxuEmpty v-else />
            </div>
            <div
                class="sdxv-project-management__footer"
                slot="footer"
            >
                <div />
                <sdxu-pagination
                    v-if="total"
                    :current-page.sync="current"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="currentChange"
                />
            </div>
        </sdxu-content-panel>
        <sdxv-create-project
            :visible.sync="createProjectVisible"
            v-if="createProjectVisible"
            @close="createProjectClose"
            :data="editingProject"
            :create-type="createType"
        />
    </div>
</template>

<script>
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import CreateProject from './CreateProject';
import Pagination from '@sdx/ui/components/pagination';
import ContentPanel from '@sdx/ui/components/content-panel';
import Project from '@sdx/widget/components/projectcard';
import MessageBox from '@sdx/ui/components/message-box';
import Select from 'element-ui/lib/select';
import Message from 'element-ui/lib/message';
import { removeProject, getProjectTemplates, getSelfCreatedProjects, getSharingProjects } from '@sdx/utils/src/api/project';
import SortButton from '@sdx/ui/components/sort-button';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
import TabRadio from '@sdx/ui/components/tab-radio';
import { paginate } from '@sdx/utils/src/helper/tool';
export default {
    name: 'SdxvProjectList',
    data() {
        return {
            searchName: '',
            order: 'desc',
            current: 1,
            total: 0,
            pageSize: 10,
            createProjectVisible: false,
            createType: '',
            templateList: [],
            projectList: [],
            projectType: 'private',
            templatesLoading: false,
            templatesLoaded: false,
            projectsLoaded: false,
            projectsLoading: false,
            editingProject: null
        };
    },
    directives: {
        auth
    },
    mixins: [locale],
    components: {
        [Select.name]: Select,
        [Button.name]: Button,
        [Input.name]: Input,
        [Pagination.name]: Pagination,
        [CreateProject.name]: CreateProject,
        [Project.ProjectCard.name]: Project.ProjectCard,
        [Project.ProjectCardList.name]: Project.ProjectCardList,
        [ContentPanel.name]: ContentPanel,
        [SortButton.name]:SortButton,
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
    },
    created() {
        this.initList();
    },
    methods: {
        switchProjectType() {
            this.initProjectsList();
        },
        async initList() {
            this.initProjectsList();
            this.initTemplatesList();
        },
        sortChange() {
            this.initList();
        },
        searchProject() {
            this.initList();
        },
        initTemplatesList() {
            this.templatesLoading = true;
            this.templatesLoaded = false;
            const params = {
                name: this.searchName,
                start: 1,
                count: -1,
                order: this.order,
                orderBy: 'createdAt',
                type: 'template'
            };
            getProjectTemplates(params).then(res => {
                this.templateList = res.data.items;
                this.templateList.forEach(item => {
                    const isOwn = getUser().userId === item.owner.uuid;
                    let hasWriteAuth = true;
                    if (item.isTempalte) hasWriteAuth = auth.checkAuth('PROJECT-MANAGER:TEMPLATE_PROJECT:WRITE', 'BUTTON');
                    item.showEdit = isOwn && hasWriteAuth;
                    item.showRemove = isOwn && hasWriteAuth;
                });
            }).finally(() => {
                this.templatesLoading = false;
                this.templatesLoaded = true;
            });
        },
        initProjectsList() {
            this.projectsLoading = true;
            this.projectsLoaded = false;
            const params = {
                name: this.searchName,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: 'createdAt',
                type: this.projectType
            };
            const fn = this.projectType === 'private' ? getSelfCreatedProjects : getSharingProjects;
            fn(params).then(res => {
                this.projectList = res.data.items;
                this.projectList.forEach(item => {
                    const isOwn = getUser().userId === item.owner.uuid;
                    let hasWriteAuth = true;
                    if (item.isTempalte) hasWriteAuth = auth.checkAuth('PROJECT-MANAGER:TEMPLATE_PROJECT:WRITE', 'BUTTON');
                    item.showEdit = isOwn && hasWriteAuth;
                    item.showRemove = isOwn && hasWriteAuth;
                });
                this.total = res.data.total;
            }).finally(() => {
                this.projectsLoading = false;
                this.projectsLoaded = true;
            });
        },
        handleOperate(operation) {
            if (operation && operation.type) {
                switch(operation.type) {
                case 'delete':
                    MessageBox({
                        title: this.t('view.project.confirmRemove'),
                        content: this.t('sdxCommon.ConfirmRemove'),
                    }).then(() => {
                        removeProject(operation.id).then(() => {
                            Message({
                                message: this.t('sdxCommon.RemoveSuccess'),
                                type: 'success'
                            });
                            this.initList();
                        });
                    }).catch(() => {});
                    break;
                case 'edit':
                    this.editingProject = { ...operation.item };
                    this.showCreateProject('empty');
                    break;
                case 'detail':
                    this.$router.push({
                        name: 'ProjectDetail',
                        params: {
                            id: operation.id
                        }
                    });
                    break;
                default:
                    break;
                }
            }
        },
        showCreateProject(type) {
            this.createType = type;
            this.createProjectVisible = true;
        },
        createProjectClose(needRefresh) {
            if (needRefresh) this.initList();
            this.createType = '';
            this.editingProject = null;
        },
        currentChange(val) {
            this.current = val;
            this.initList();
        }
    }
};
</script>
