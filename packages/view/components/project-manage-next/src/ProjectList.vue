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
                        :placeholder="t('view.project.enterProjectName')"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
            <div>
                <sdxu-button
                    placement="right"
                    trigger="click"
                    style="margin-right: 24px; vertical-align: middle"
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
                    style="vertical-align: middle"
                />
            </div>
        </div>
        <div class="search">
            <SdxuTabRadioGroup
                v-model="tabName"
                @switch="tabClick"
                class="radio-group"
            >
                <SdxuTabRadioItem
                    v-for="item in tabs"
                    :key="item.name"
                    :name="item.name"
                >
                    {{ item.label }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <sdxw-subject-card-list
                v-loading="projectListLoading"
                v-if="projectList.length || !projectsLoaded"
            >
                <sdxw-subject-card
                    v-for="(val, index) in projectList"
                    :key="index"
                    :meta="val.meta"
                    size="large"
                    @operate="handleOperate"
                >
                    <template #footerRight>
                        <div>
                            <sdxu-button
                                type="text"
                                icon="sdx-icon sdx-icon-edit"
                                v-if="val.meta.showEdit"
                                @click="handleOperate({item: val.meta, type: 'edit'})"
                            >
                                {{ t('widget.projectCard.title.Edit') }}
                            </sdxu-button>
                            <sdxu-button
                                type="text"
                                icon="sdx-icon sdx-icon-delete"
                                v-if="val.meta.showRemove"
                                @click="handleOperate({id: val.meta.uuid, type: 'delete'})"
                            >
                                {{ t('widget.projectCard.title.Delete') }}
                            </sdxu-button>
                        </div>
                    </template>
                </sdxw-subject-card>
            </sdxw-subject-card-list>
            <SdxuEmpty v-else />
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
import { Message } from 'element-ui';
import SubCard from '@sdx/widget/components/subject-card';
import Pagination from '@sdx/ui/components/pagination';
import { removeProject, getProjectTemplates, getSelfCreatedProjects, getSharingProjects, getProjectList } from '@sdx/utils/src/api/project';
import { paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import MessageBox from '@sdx/ui/components/message-box';
import SortButton from '@sdx/ui/components/sort-button';
import CreateProject from './CreateProject';
import Empty from '@sdx/ui/components/empty';
import TabRadio from '@sdx/ui/components/tab-radio';
export default {
    name: 'SdxvProjectList',
    data() {
        return {
            projectTabs: [
                {
                    label: this.t('view.project.allProject'),
                    name: ''
                },
                {
                    label: this.t('view.project.selfCreateProject'),
                    name: 'private'
                },
                {
                    label: this.t('view.project.otherProject'),
                    name: 'public'
                },
                {
                    label: this.t('view.project.templateProject'),
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
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
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
    computed: {
        tabs() {
            let tabs = this.projectTabs.filter(item => item.auth === true);
            return tabs;
        }
    },
    methods: {
        // tab切换
        tabClick(name) {
            name = name == 0 ? '' : this.tabName;
            this.type = name;
            this.current = 1;
            this.initProjectsList();
        },
        searchProject() {
            this.initProjectsList();
        },
        initProjectsList() {
            this.projectListLoading = true;
            this.projectsLoaded = false;
            // 添加权限
            let [hasPrivateAuth, hasPublicAuth, hasTemplateAuth]=[auth.checkAuth('PROJECT-MANAGER:PROJECT:READ', 'API'),
                auth.checkAuth('PROJECT-MANAGER:COOPERATE_PROJECT:CREATE', 'API'),
                auth.checkAuth('PROJECT-MANAGER:TEMPLATE_PROJECT:READ', 'API'),
            ];
            let allAuths = hasPrivateAuth || hasPublicAuth || hasTemplateAuth;
            let auths = [allAuths, hasPrivateAuth, hasPublicAuth, hasTemplateAuth];
            for(let i = 0; i < auths.length; i++) {
                this.projectTabs[i].auth = auths[i];
            }
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
                    // 图标
                    let [icon, iconName] = ['',''];
                    if (item.type === 'private' && !item.isTemplate) {
                        icon = 'sdx-siyouxiangmu';
                        iconName = this.t('view.project.iconName.private');
                    } else if(item.type === 'public' && !item.isTemplate) {
                        icon = 'sdx-xiezuoxiangmu';
                        iconName = this.t('view.project.iconName.cooperation');
                    } else if(item.isTemplate === true) {
                        icon = 'sdx-mobanxiangmu';
                        iconName = this.t('view.project.iconName.template');
                    }
                    item.meta = Object.assign({}, item, {
                        title: item.name,
                        creator: item.owner.fullName,
                        tempalteWriteAuth: tempalteWriteAuth,
                        showEdit: isOwn && tempalteWriteAuth,
                        showRemove: isOwn && tempalteWriteAuth,
                        icon: icon,
                        iconName:iconName,
                        footer: isOwn && tempalteWriteAuth,
                        taskNumber: item.taskCount
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
                    case 'detail':
                        this.$router.push({
                            name: 'ProjectDetailNext',
                            params: {
                                id: operate.id
                            }
                        });

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
    .title {
        font-size: 24px;
        color: #13264D;
        margin-bottom: 32px;
    }
    .search {
        .sdxu-tab-radio-group {
            margin-bottom: 24px;
        }
    }
    .condition {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
    }
}
</style>
