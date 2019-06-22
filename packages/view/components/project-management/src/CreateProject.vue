<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :close-on-click-modal="false"
        class="sdxv-create-project"
        size="large"
        :no-footer="createType !== 'empty'"
    >
        <div
            slot="title"
        >
            <span>{{ title }}</span>
        </div>
        <el-form
            label-width="110px"
            label-position="left"
            :model="projectForm"
            ref="projectForm"
            :rules="projectFormRule"
            v-if="createType === 'empty'"
        >
            <el-form-item
                label="项目名称："
                prop="name"
            >
                <sdxu-input
                    v-model="projectForm.name"
                    placeholder="请输入项目名称"
                />
            </el-form-item>
            <el-form-item
                label="项目描述："
                prop="description"
            >
                <sdxu-input
                    v-model="projectForm.description"
                    placeholder="请输入项目描述"
                    type="textarea"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                label="设为模板："
                v-if="isAdmin"
                v-auth.project.button="'TEMPLATE_PROJECT:CREATE'"
            >
                <el-switch
                    v-model="projectForm.isTemplate"
                />
            </el-form-item>
            <el-form-item
                label="协作者/组："
                v-show="!projectForm.isTemplate"
                v-auth.project.button="'COOPERATE_PROJECT:CREATE'"
            >
                <sdxw-select-group-user
                    :users.sync="selectedUsers"
                    :groups.sync="selectedGroups"
                />
            </el-form-item>
        </el-form>
        <el-scrollbar
            :native="false"
            wrap-class="sdxv-create-project__wrap"
            v-if="createType !== 'empty'"
        >
            <div
                class="sdxv-create-project__filter"
                v-if="createType === 'project'"
            >
                <SdxuTabRadioGroup
                    v-model="projectType"
                    @switch="switchProjectType"
                >
                    <SdxuTabRadioItem name="private">
                        自建项目
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem name="public">
                        其他项目
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <sdxu-input
                    v-model="searchName"
                    searchable
                    type="search"
                    size="small"
                    placeholder="请输入项目名"
                    @search="filterProjects"
                />
            </div>
            <sdxw-project-card-list
                v-loading="loading"
                class="sdxv-create-project__template-list"
            >
                <sdxw-project-card
                    @operate="handleOperate"
                    v-for="(item, index) in projectList"
                    :key="index"
                    :meta="item"
                    :operate-type="createType"
                />
            </sdxw-project-card-list>
        </el-scrollbar>
        <div
            slot="footer"
        >
            <SdxuButton
                type="default"
                size="small"
                @click="cancel"
            >
                取消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                确认
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import TabRadio from '@sdx/ui/components/tab-radio';
import Project from '@sdx/widget/components/projectcard';
import SelectGroupUser from '@sdx/widget/components/select-group-user';
import { Form, FormItem, Message, Switch, Scrollbar } from 'element-ui';
import Transfer from '@sdx/ui/components/transfer';
import { updateProject, getProjectList, createProject } from '@sdx/utils/src/api/project';
import auth from '@sdx/widget/components/auth';
export default {
    name: 'SdxvCreateProject',
    data() {
        return {
            dialogVisible: this.visible,
            projectForm: {
                name: '',
                description: '',
                member: '',
                isTemplate: false
            },
            projectFormRule: {
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ]
            },
            title: '新建项目',
            needRefresh: false,
            projectList: [],
            loading: false,
            projectType: 'private',
            totalProjects: [],
            searchName: '',
            selectedUsers: [],
            selectedGroups: []
        };
    },
    components: {
        [Dialog.name]: Dialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Switch.name]: Switch,
        [Input.name]: Input,
        [Button.name]: Button,
        [Transfer.name]: Transfer,
        [Project.ProjectCard.name]: Project.ProjectCard,
        [Project.ProjectCardList.name]: Project.ProjectCardList,
        [Scrollbar.name]: Scrollbar,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [SelectGroupUser.name]: SelectGroupUser
    },
    directives: {
        auth
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: null
        },
        createType: {
            type: String,
            default: 'empty'
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    computed: {
        isEditing() {
            return !!this.data;
        },
        isAdmin() {
            return true;
        }
    },
    created() {
        if (this.isEditing) {
            Object.assign(this.projectForm, this.data);
            this.selectedGroups = this.data.groups;
            this.selectedUsers = this.data.users;
            this.title = '编辑项目';
        } else if (this.createType === 'template') {
            this.getProjectList('template');
        } else if (this.createType === 'project') {
            this.getProjectList(this.projectType);
        }
    },
    methods: {
        filterProjects() {
            this.projectList = [...this.totalProjects.filter(item => item.name.indexOf(this.searchName) > -1)];
        },
        switchProjectType(type) {
            this.projectType = type;
            this.searchName = '';
            this.getProjectList(this.projectType);
        },
        handleOperate(operation) {
            if (operation && operation.type && operation.id) {
                const params = {
                    uuid: operation.id
                };
                createProject(params).then(() => {
                    Message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.needRefresh = true;
                    this.dialogVisible = false;
                });
            }
        },
        getProjectList(type, name) {
            const params = {
                name: name || '',
                start: 1,
                count: 1000,
                type
            };
            getProjectList(params).then(res => {
                this.projectList = res.data.items;
                this.loading = false;
                this.totalProjects = this.createType === 'project' ? [...this.projectList] : '';
            });
        },
        confirm() {
            this.$refs.projectForm.validate().then(() => {
                this.projectForm.users = [];
                this.projectForm.groups = [];
                if (!this.projectForm.isTemplate) {
                    this.projectForm.groups = this.selectedGroups;
                    this.projectForm.users = this.selectedUsers;
                }
                if (this.isEditing) {
                    updateProject(this.projectForm.uuid, this.projectForm).then(() => {
                        Message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.needRefresh = true;
                        this.dialogVisible = false;
                    }).catch(() => {});
                } else {
                    createProject(this.projectForm).then(() => {
                        Message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.needRefresh = true;
                        this.dialogVisible = false;
                    }).catch(() => {});
                }

            });

        },
        dialogClose() {
            if (this.createType === 'empty') {
                this.$refs.projectForm.clearValidate();
                this.projectForm = {
                    name: '',
                    description: '',
                    member: ''
                };
            }
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        cancel() {
            this.dialogVisible = false;
        }
    }
};
</script>

