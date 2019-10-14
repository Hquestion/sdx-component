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
            <sdxu-button
                placement="right"
                size="small"
                trigger="click"
                style="margin-left: 20px;"
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
                    <sdxw-subject-card-list>
                        <sdxw-subject-card 
                            v-for="(item, index) in projectList"
                            :key="index"
                            :meta="item.meta"
                            @operate="handleOperate"
                        />
                    </sdxw-subject-card-list>
                </el-tab-pane>
            </el-tabs>
        </div>
        <sdxu-pagination />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import auth from '@sdx/widget/components/auth';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { Tabs, TabPane } from 'element-ui';
import SubCard from '@sdx/widget/components/subject-card';
import Pagination from '@sdx/ui/components/pagination';
import { removeProject, getProjectTemplates, getSelfCreatedProjects, getSharingProjects, getProjectList } from '@sdx/utils/src/api/project';
import { paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
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
    },
    created() {
        this.initProjectsList();
    },
    methods: {
        // tab切换
        tabClick(name) {
            console.log(name,'tab');
            name = name == 0 ? '' : this.tabName;
        },
        searchProject() {
            console.log(this.searchName, this.tabName);
        },
        initProjectsList() {
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

            // 项目列表
            getProjectList(params).then(res => {
                this.projectList = res.data.items;
                this.projectList.forEach(item => {
                    const isOwn = getUser().userId === item.owner.uuid;
                    let tempalteWriteAuth = true;
                    if (item.isTempalte)  {
                        tempalteWriteAuth = auth.checkAuth('PROJECT-MANAGER:TEMPLATE_PROJECT:WRITE', 'BUTTON');
                    } else {
                        tempalteWriteAuth = true;
                    }
                    item.meta = {
                        title: item.name,
                        description: item.description,
                        creator: item.owner.fullName,
                        createdAt: item.createdAt,
                        tempalteWriteAuth: tempalteWriteAuth,
                        showEdit: isOwn && tempalteWriteAuth,
                        showRemove: isOwn && tempalteWriteAuth,
                        type: 'project',
                        icon: 'sdx-icon-UserInfo',
                        taskNumber: 6
                    };
                });
            });
        },
        // card 操作
        handleOperate(operate) {
                
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-project-manage-list {
    .condition {
        display: flex;
    }
    .search {

    }
}
</style>
