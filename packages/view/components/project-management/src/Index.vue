<template>
    <div>
        <router-view />
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
import { Select, Message } from 'element-ui';
import { getProjectList, removeProject } from '@sdx/utils/src/api/project';
export default {
    name: 'SdxvProjectManagement',
    data() {
        return {
            searchName: '',
            sort: 'created_time',
            current: 1,
            pageSize: 10,
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
        [ContentPanel.name]: ContentPanel
    },
    created() {
        this.initList();
    },
    methods: {
        sortChange(sort) {
            this.sort = sort;
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
                count: this.pageSize,
                order: 'asc',
                orderBy: ''
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
