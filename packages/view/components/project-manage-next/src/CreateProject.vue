<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :close-on-click-modal="false"
        class="sdxv-create-project"
        width="720px"
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
        
        <div
            class="sdxv-create-project__filter"
            v-if="createType === 'project'"
        >
            <SdxwSearchLayout
                @search="filterProjects"
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
            <SdxuTabRadioGroup
                v-model="projectType"
                @switch="switchProjectType"
            >
                <SdxuTabRadioItem name="private">
                    {{ t('view.project.iconName.private') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="public">
                    {{ t('view.project.iconName.cooperation') }}
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
        </div>
        <div v-loading="loading">
            <el-scrollbar
                :native="false"
                wrap-class="sdxv-create-project__wrap"
                v-if="createType !== 'empty'"
            >
                <div
                    class="template-list"
                    v-if="projectList.length || !projectsLoaded"
                >
                    <sdxw-create-project-card
                        @operate="handleOperate"
                        v-for="(item, index) in projectList"
                        :key="index"
                        :meta="item"
                        :operate-type="createType"
                    />
                </div>
                <sdxu-empty v-else />
            </el-scrollbar>
        </div>
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
import ProjectCard from '@sdx/widget/components/create-project-card';
import SelectGroupUser from '@sdx/widget/components/select-group-user';
import { Form, FormItem, Message, Radio, Scrollbar } from 'element-ui';
import Transfer from '@sdx/ui/components/transfer';
import { updateProject, createProject, getProjectTemplates, getSelfCreatedProjects, getSharingProjects } from '@sdx/utils/src/api/project';
import auth from '@sdx/widget/components/auth';
import { nameWithChineseValidator, descValidator } from '@sdx/utils/src/helper/validate';
import locale from '@sdx/utils/src/mixins/locale';
import Empty from '@sdx/ui/components/empty';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
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
            needRefresh: false,
            projectList: [],
            loading: false,
            projectType: 'private',
            totalProjects: [],
            searchName: '',
            selectedUsers: [],
            selectedGroups: [],
            projectsLoaded: false,
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
        [ProjectCard.name]: ProjectCard,
        [Scrollbar.name]: Scrollbar,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [SelectGroupUser.name]: SelectGroupUser,
        [Empty.name]: Empty,
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
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
        },
        title() {
            let title = '';
            if (this.isEditing) {
                if (this.createType === 'empty') {
                    title =this.t('view.project.emptyEdit');
                } else if(this.createType === 'template') {
                    title =this.t('view.project.templateEdit');
                } else if(this.createType === 'project') {
                    title =this.t('view.project.copyEdit');
                }
            } else {
                if (this.createType === 'empty') {
                    title = this.t('view.project.emptyCreate');
                } else if(this.createType === 'template') {
                    title =this.t('view.project.templateCreate');
                } else if(this.createType === 'project') {
                    title =this.t('view.project.copyCreate');
                }
            }
            return title;
        }
    },
    created() {
        if (this.isEditing) {
            Object.assign(this.projectForm, this.data);
            this.selectedGroups = this.data.groups;
            this.selectedUsers = this.data.users;
        } else if (this.createType === 'template') {
            this.getProjectList('template');
        } else if (this.createType === 'project') {
            this.getProjectList(this.projectType);
        }
    },
    methods: {
        filterProjects() {
            this.projectList = [...this.totalProjects.filter(item => item.name.includes(this.searchName))];
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
            this.projectsLoaded = false;
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
                this.projectsLoaded = true;
                this.totalProjects = [...this.projectList];
            }).finally(() => {
                this.loading = false;
                this.projectsLoaded = true;
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


