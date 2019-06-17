<template>
    <sdxu-content-panel
        class="sdxv-project-management"
        title="项目列表"
    >
        <div class="sdxv-project-management__header">
            <div class="sdxv-project-management__header--left">
                <sdxu-button
                    placement="right"
                    size="small"
                    icon="sdx-icon-plus"
                >
                    新建项目
                    <template slot="dropdown">
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('empty')"
                        >
                            空白创建
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('template')"
                        >
                            模板创建
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('project')"
                        >
                            复制创建
                        </SdxuButton>
                    </template>
                </sdxu-button>
                <SdxuSortButton
                    title="按创建时间排序"
                    @sortChange="sortChange"
                    :order="order"
                />
            </div>
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
                        placeholder="请输入项目名"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div
            class="sdxv-project-management__content"
        >
            <sdxw-project-card-list v-loading="loading">
                <sdxw-project-card
                    @operate="handleOperate"
                    v-for="(item, index) in projectList"
                    :key="index"
                    :meta="item"
                />
            </sdxw-project-card-list>
        </div>
        <sdxv-create-project
            :visible.sync="createProjectVisible"
            v-if="createProjectVisible"
            @close="createProjectClose"
            :data="editingProject"
            :create-type="createType"
        />
    </sdxu-content-panel>
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
import { getProjectList, removeProject } from '@sdx/utils/src/api/project';
import SortButton from '@sdx/ui/components/sort-button';
export default {
    name: 'SdxvProjectList',
    data() {
        return {
            searchName: '',
            order: 'desc',
            current: 1,
            total: 0,
            createProjectVisible: false,
            createType: '',
            projectList: [],
            loading: false,
            editingProject: null
        };
    },
    components: {
        [Select.name]: Select,
        [Button.name]: Button,
        [Input.name]: Input,
        [Pagination.name]: Pagination,
        [CreateProject.name]: CreateProject,
        [Project.ProjectCard.name]: Project.ProjectCard,
        [Project.ProjectCardList.name]: Project.ProjectCardList,
        [ContentPanel.name]: ContentPanel,
        [SortButton.name]:SortButton
    },
    created() {
        this.initList();
    },
    methods: {
        sortChange(order) {
            this.order =  order;
            this.initList();
        },
        searchProject() {
            this.initList();
        },
        initList() {
            this.loading = true;
            const params = {
                name: this.searchName,
                start: this.current,
                count: -1,
                order: this.order,
                orderBy: 'createdAt'
            };
            getProjectList(params).then(res => {
                this.projectList = res.data.items;
                this.total = res.data.total;
                this.loading = false;
            });
        },
        handleOperate(operation) {
            if (operation && operation.type) {
                switch(operation.type) {
                case 'delete':
                    MessageBox({
                        title: '确定删除吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeProject(operation.id).then(() => {
                            Message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.initList();
                        });
                    }).catch(() => {});
                    break;
                case 'edit':
                    this.editingProject = this.projectList.find(item => item.uuid === operation.id);
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
