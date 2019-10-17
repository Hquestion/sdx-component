<template>
    <div class="sdxv-project-manage-list">
        <div class="condition"> 
            <SdxwSearchLayout
                @search="searchProject"
                :block="false"
                align="left"
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
            <div>
                <sdxu-button
                    placement="right"
                    size="small"
                    trigger="click"
                    style="margin-right: 20px;"
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
        <div class="search">
            <el-tabs
                v-model="tabName"
                @tab-click="tabClick(tabName)"
            >
                <el-tab-pane
                    v-for="item in projectTabs"
                    v-if="item.label"
                    :key="item.name"
                    :label="item.label"
                    :name="item.name"
                >
                    <sdxw-subject-card-list
                        v-loading="projectListLoading"
                        v-if="projectList.length"
                    >
                        <sdxw-subject-card 
                            v-for="(val, index) in projectList"
                            :key="index"
                            :meta="val.meta"
                            @operate="handleOperate"
                        />
                    </sdxw-subject-card-list>
                    <SdxuEmpty v-else />
                </el-tab-pane>
            </el-tabs>
        </div>
        <sdxu-pagination
            class="pagination"
            v-if="total"
            :current-page.sync="current"
            :page-size="pageSize"
            :total="total"
            @current-change="currentChange"
        />
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
import locale from '@sdx/utils/src/mixins/locale';
import auth from '@sdx/widget/components/auth';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { Tabs, TabPane, Message } from 'element-ui';
import SubCard from '@sdx/widget/components/subject-card';
import Pagination from '@sdx/ui/components/pagination';
import { removeProject, getProjectTemplates, getSelfCreatedProjects, getSharingProjects, getProjectList } from '@sdx/utils/src/api/project';
import { paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import MessageBox from '@sdx/ui/components/message-box';
import SortButton from '@sdx/ui/components/sort-button';
import CreateProject from './CreateProject';
import Empty from '@sdx/ui/components/empty';
export default {
    name: 'SdxvProjectList',
    data() {
        return {
            projectTabs: [
                {
                    label: '所有项目',
                    name: ''
                },
                {
                    label: '私有项目',
                    name: 'private'
                },
                {
                    label: '协作项目',
                    name: 'public'
                },
                {
                    label: '模板项目',
                    name: 'template'
                }
            ],
            tabName: '',
            searchName: '',
            order: 'desc',
            current: 1,
            total: 0,
            pageSize: 10,
            projectList: [],
            projectListLoading: false,
            projectsLoaded: false,
            createProjectVisible: false,
            createType: '',
            editingProject: null
        };
    },
    directives: {
        auth
    },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [Tabs.name]: Tabs,
        [TabPane.name]: TabPane,
        [SubCard.SubjectCard.name]: SubCard.SubjectCard,
        [SubCard.SubjectCardList.name]: SubCard.SubjectCardList,
        [Pagination.name]: Pagination,
        [SortButton.name]:SortButton,
        [CreateProject.name]: CreateProject,
        [Empty.name]: Empty,
    },
    created() {
        this.initProjectsList();
    },
    methods: {
        // tab切换
        tabClick(name) {
            name = name == 0 ? '' : this.tabName;
            this.type = name;
            this.initProjectsList();
        },
        searchProject() {
            this.initProjectsList();
        },
        initProjectsList() {
            this.projectListLoading = true;
            this.projectsLoaded = false;
            let [hasPrivateAuth, hasPublicAuth, hasTemplateAuth]=[auth.checkAuth('PROJECT-MANAGER:PROJECT:READ', 'API'),
                auth.checkAuth('PROJECT-MANAGER:COOPERATE_PROJECT:CREATE', 'API'),
                auth.checkAuth('PROJECT-MANAGER:TEMPLATE_PROJECT:READ', 'API'),
            ];
            let projectType = [hasPrivateAuth ? 'private': '', hasPublicAuth ? 'public' : '', hasTemplateAuth ? 'template' : ''];
            projectType = projectType.filter( item => item !== '');
            console.log(hasPrivateAuth,hasPublicAuth ,hasTemplateAuth,projectType, 9999);
            let params = {
                name: this.searchName,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: 'createdAt',
                type: this.tabName == 0 ? '' : this.tabName
            };
            let fn = null; 
            if(this.tabName == 0) {
                fn = getProjectList;
            } else if (this.tabName === 'private') {
                fn = getSelfCreatedProjects;
            } else if (this.tabName === 'public') {
                fn = getSharingProjects;
            } else if(this.tabName === 'template') {
                fn = getProjectTemplates;
            }
            // 项目列表
            fn(params).then(res => {
                this.projectListLoading = false;
                this.projectsLoaded = true;
                this.projectList = res.data.items;
                this.projectList.forEach(item => {
                    const isOwn = getUser().userId === item.owner.uuid;
                    let tempalteWriteAuth = true;
                    if (item.isTempalte)  {
                        tempalteWriteAuth = auth.checkAuth('PROJECT-MANAGER:TEMPLATE_PROJECT:WRITE', 'BUTTON');
                    } else {
                        tempalteWriteAuth = true;
                    }
                    item.meta = Object.assign({}, item, {
                        title: item.name,
                        creator: item.owner.fullName,
                        tempalteWriteAuth: tempalteWriteAuth,
                        showEdit: isOwn && tempalteWriteAuth,
                        showRemove: isOwn && tempalteWriteAuth,
                        type: 'project',
                        icon: 'sdx-icon-UserInfo',
                        taskNumber: 6
                    });
                });
                this.total = res.data.total;
            });
        },
        currentChange(val) {
            this.current = val;
            this.initProjectsList();
        },
        sortChange() {
            this.initProjectsList();
        },
        // card 操作
        handleOperate(operate) {
            if(operate && operate.type) {
                switch(operate.type) {
                    case 'delete':
                        MessageBox({
                            title: this.t('view.project.confirmRemove'),
                            content: this.t('sdxCommon.ConfirmRemove'),
                        }).then(() => {
                            removeProject(operate.id).then(() => {
                                Message({
                                    message: this.t('sdxCommon.RemoveSuccess'),
                                    type: 'success'
                                });
                                this.initProjectsList();
                            });
                        }).catch(() => {});
                        break;
                    case 'edit': 
                        this.editingProject = Object.assign({}, operate.item, { 
                            name: operate.item.title
                        });
                        this.showCreateProject('empty');
                        break;
                }
            }
        },
        showCreateProject(type) {
            this.createType = type;
            this.createProjectVisible = true;
        },
        createProjectClose(needRefresh) {
            if (needRefresh) this.initProjectsList();
            this.createType = '';
            this.editingProject = null;
        },
    }
};
</script>

<style lang="scss" scoped>
.sdxv-project-manage-list {
    position: relative;
    
    .condition {
        display: flex;
        justify-content: space-between;
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
