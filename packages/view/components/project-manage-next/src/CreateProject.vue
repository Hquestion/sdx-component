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
            :label-width="lang$ === 'en' ? '155px' : '110px'"
            label-position="right"
            :model="projectForm"
            ref="projectForm"
            :rules="projectFormRule"
            v-if="createType === 'empty'"
        >
            <el-form-item
                :label="t('view.project.createForm.name')"
                prop="name"
            >
                <sdxu-input
                    v-model="projectForm.name"
                    :placeholder="t('view.project.enterProjectName')"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.project.createForm.description')"
                prop="description"
            >
                <sdxu-input
                    v-model="projectForm.description"
                    :placeholder="t('view.project.enterProjectDescription')"
                    type="textarea"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.project.createForm.setTemplate')"
                v-auth.project.button="'TEMPLATE_PROJECT:CREATE'"
            >
                <el-radio
                    v-model="projectForm.isTemplate"
                    :label="true"
                >
                    {{ t('sdxCommon.Yes') }}
                </el-radio>
                <el-radio
                    v-model="projectForm.isTemplate"
                    :label="false"
                >
                    {{ t('sdxCommon.No') }}
                </el-radio>
            </el-form-item>
            <el-form-item
                :label="t('sdxCommon.UserGroup')"
                v-if="!projectForm.isTemplate"
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
                        {{ t('view.project.selfCreateProject') }}
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem name="public">
                        {{ t('view.project.otherProject') }}
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <sdxu-input
                    v-model="searchName"
                    searchable
                    type="search"
                    size="small"
                    :placeholder="t('view.project.enterProjectName')"
                    @search="filterProjects"
                />
            </div>
            <div v-loading="loading">
                <sdxw-project-card-list
                    class="sdxv-create-project__template-list"
                    v-if="!!totalProjects.length"
                >
                    <sdxw-project-card
                        @operate="handleOperate"
                        v-for="(item, index) in projectList"
                        :key="index"
                        :meta="item"
                        :operate-type="createType"
                    />
                </sdxw-project-card-list>
                <sdxu-empty v-else />
            </div>
        </el-scrollbar>
        <div
            slot="footer"
        >
            <SdxuButton
                type="default"
                size="small"
                @click="cancel"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                {{ t('sdxCommon.Confirm') }}
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
import { Form, FormItem, Message, Radio, Scrollbar } from 'element-ui';
import Transfer from '@sdx/ui/components/transfer';
import { updateProject, createProject, getProjectTemplates, getSelfCreatedProjects, getSharingProjects } from '@sdx/utils/src/api/project';
import auth from '@sdx/widget/components/auth';
import { nameWithChineseValidator, descValidator } from '@sdx/utils/src/helper/validate';
import locale from '@sdx/utils/src/mixins/locale';
import Empty from '@sdx/ui/components/empty';
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
                    { required: true, message: this.t('view.project.enterProjectName'), trigger: 'blur' },
                    {
                        validator: nameWithChineseValidator,
                        trigger: 'blur'
                    }
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ]
            },
            title: this.t('view.project.createProject'),
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
        [Radio.name]: Radio,
        [Input.name]: Input,
        [Button.name]: Button,
        [Transfer.name]: Transfer,
        [Project.ProjectCard.name]: Project.ProjectCard,
        [Project.ProjectCardList.name]: Project.ProjectCardList,
        [Scrollbar.name]: Scrollbar,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [SelectGroupUser.name]: SelectGroupUser,
        [Empty.name]: Empty
    },
    directives: {
        auth
    },
    mixins: [locale],
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
        }
    },
    created() {
        if (this.isEditing) {
            Object.assign(this.projectForm, this.data);
            this.selectedGroups = this.data.groups;
            this.selectedUsers = this.data.users;
            this.title = this.t('view.project.editProject');
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
                        message: this.t('sdxCommon.CreateSuccess'),
                        type: 'success'
                    });
                    this.needRefresh = true;
                    this.dialogVisible = false;
                });
            }
        },
        getProjectList(type, name) {
            this.loading = true;
            const params = {
                name: name || '',
                start: 1,
                count: 1000,
                type
            };
            const fn = type === 'template' ? getProjectTemplates : (type === 'private' ? getSelfCreatedProjects : getSharingProjects);
            fn(params).then(res => {
                this.projectList = res.data.items;
                this.loading = false;
                this.totalProjects = [...this.projectList];
            }).finally(() => {
                this.loading = false;
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
                            message: this.t('sdxCommon.UpdateSuccess'),
                            type: 'success'
                        });
                        this.needRefresh = true;
                        this.dialogVisible = false;
                    }).catch(() => {});
                } else {
                    createProject(this.projectForm).then(() => {
                        Message({
                            message: this.t('sdxCommon.CreateSuccess'),
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

