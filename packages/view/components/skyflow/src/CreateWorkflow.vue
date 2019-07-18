<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :close-on-click-modal="false"
        class="sdxv-create-workflow"
        size="large"
        :no-footer="createType !== 'empty'"
    >
        <div
            slot="title"
        >
            <span>{{ title }}</span>
        </div>
        <el-form
            label-width="130px"
            label-position="right"
            :model="workflowForm"
            ref="workflowForm"
            :rules="workflowFormRule"
            v-if="createType === 'empty'"
        >
            <el-form-item
                label="工作流处理方式："
            >
                <el-radio
                    v-model="workflowForm.processType"
                    label="PATCH"
                    :disabled="isEditing"
                >
                    批处理
                </el-radio>
                <el-radio
                    v-model="workflowForm.processType"
                    label="STREAM"
                    :disabled="isEditing"
                >
                    流处理
                </el-radio>
            </el-form-item>
            <el-form-item
                label="工作流名称："
                prop="name"
            >
                <sdxu-input
                    v-model="workflowForm.name"
                    placeholder="请输入工作流名称"
                />
            </el-form-item>
            <el-form-item
                label="工作流描述："
                prop="description"
            >
                <sdxu-input
                    v-model="workflowForm.description"
                    placeholder="请输入工作流描述"
                    type="textarea"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                label="设为模板："
                v-auth.skyflow.button="'TEMPLATE_FLOW:CREATE'"
            >
                <el-radio
                    v-model="workflowForm.isTemplate"
                    :label="true"
                >
                    是
                </el-radio>
                <el-radio
                    v-model="workflowForm.isTemplate"
                    :label="false"
                >
                    否
                </el-radio>
            </el-form-item>
            <el-form-item
                label="模板种类："
                prop="skyflowTemplate"
                v-if="workflowForm.isTemplate"
                key="skyflowTemplate"
            >
                <el-select
                    v-model="workflowForm.skyflowTemplate"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择模板种类"
                >
                    <el-option
                        v-for="item in skyflowTemplates"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="共享设置："
                v-if="!workflowForm.isTemplate"
                v-auth.skyflow.button="'FLOW:SHARE'"
                key="share"
            >
                <sdxw-select-group-user
                    :users.sync="selectedUsers"
                    :groups.sync="selectedGroups"
                />
            </el-form-item>
        </el-form>
        <SdxuScroll
            style="height: 50vh;"
            v-if="createType !== 'empty'"
            v-loading="loading"
        >
            <div
                class="sdxv-create-workflow__filter"
            >
                <SdxuTabRadioGroup
                    v-model="workflowType"
                    @switch="switchWorkflowType"
                    v-if="createType === 'workflow'"
                >
                    <SdxuTabRadioItem name="private">
                        私有工作流
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem name="public">
                        共享工作流
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <SdxuTabRadioGroup
                    v-model="templateType"
                    @switch="switchTemplateType"
                    v-if="createType === 'template'"
                >
                    <SdxuTabRadioItem
                        v-for="(item, index) in skyflowTemplates"
                        :key="index"
                        :name="item.name"
                    >
                        {{ item.name }}
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <sdxu-input
                    v-model="searchName"
                    searchable
                    type="search"
                    size="small"
                    placeholder="请输入工作流名称"
                    @search="filterWorkflows"
                />
            </div>
            <sdxv-workflow-card-list
                class="sdxv-create-workflow__template-list"
            >
                <sdxv-workflow-card
                    @operate="handleOperate"
                    v-for="(item, index) in workflowList"
                    :key="index"
                    :meta="item"
                    :operate-type="createType"
                />
            </sdxv-workflow-card-list>
        </SdxuScroll>
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
                :loading="loading"
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
import SelectGroupUser from '@sdx/widget/components/select-group-user';
import WorkflowCard from './workflow-card/WorkflowCard';
import WorkflowCardList from './workflow-card/WorkflowCardList';
import { Form, FormItem, Message, Scrollbar, Radio } from 'element-ui';
import Transfer from '@sdx/ui/components/transfer';
import { updateWorkflow, getSkyflowList, createWorkflow, getSkyflowTemplates } from '@sdx/utils/src/api/skyflow';
import ElSelect from 'element-ui/lib/select';
import Scroll from '@sdx/ui/components/scroll';
import auth from '@sdx/widget/components/auth';
import { nameWithChineseValidator, descValidator } from '@sdx/utils/src/helper/validate';
export default {
    name: 'SdxvCreateWorkflow',
    data() {
        return {
            dialogVisible: this.visible,
            workflowForm: {
                processType: 'PATCH',
                name: '',
                description: '',
                users: [],
                groups: [],
                isTemplate: false,
                skyflowTemplate: ''
            },
            workflowFormRule: {
                name: [
                    { required: true, message: '请输入工作流名称', trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                description: [
                    { validator: descValidator, trigger: 'blur' }
                ],
                skyflowTemplate: [
                    { required: true, message: '请选择模板种类', trigger: 'change' }
                ]
            },
            title: '新建工作流',
            needRefresh: false,
            workflowList: [],
            loading: false,
            workflowType: 'private',
            totalWorkflows: [],
            searchName: '',
            selectedUsers: [],
            selectedGroups: [],
            skyflowTemplates: [],
            templateType: ''
        };
    },
    components: {
        [Dialog.name]: Dialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Input.name]: Input,
        [Button.name]: Button,
        [Radio.name]: Radio,
        [Transfer.name]: Transfer,
        [Scrollbar.name]: Scrollbar,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [SelectGroupUser.name]: SelectGroupUser,
        [WorkflowCard.name]: WorkflowCard,
        [WorkflowCardList.name]: WorkflowCardList,
        ElSelect,
        [Scroll.name]: Scroll
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
        },
        isCopying: {
            type: Boolean,
            default: false
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
        getSkyflowTemplates().then(res => {
            this.skyflowTemplates = res.items;
            if (this.skyflowTemplates.length) {
                this.templateType = this.skyflowTemplates[0].name;
            }
        });
        if (this.isEditing || this.isCopying) {
            Object.assign(this.workflowForm, this.data);
            this.selectedGroups = this.data.groups;
            this.selectedUsers = this.data.users;
            this.title = this.isCopying ? '复制工作流' : '编辑工作流';
        } else if (this.createType === 'template') {
            this.getWorkflowList('template');
        } else if (this.createType === 'workflow') {
            this.getWorkflowList(this.workflowType);
        }
    },
    methods: {
        switchTemplateType(type) {
            this.workflowList = [...this.totalWorkflows.filter(item => item.skyflowTemplate === type)];
        },
        filterWorkflows() {
            this.workflowList = [...this.totalWorkflows.filter(item => item.name.indexOf(this.searchName) > -1)];
        },
        switchWorkflowType(type) {
            this.workflowType = type;
            this.searchName = '';
            this.getWorkflowList(this.workflowType);
        },
        handleOperate(operation) {
            if (operation && operation.type && operation.id) {
                const params = {
                    uuid: operation.id
                };
                createWorkflow(params).then(() => {
                    Message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.needRefresh = true;
                    this.dialogVisible = false;
                });
            }
        },
        getWorkflowList(type) {
            this.loading = true;
            const params = {
                start: 1,
                count: -1,
                type: type === 'template' ? '' : type,
                isTemplate: type === 'template'
            };
            getSkyflowList(params).then(res => {
                this.loading = false;
                this.totalWorkflows = res.items;
                if (type === 'template') {
                    this.workflowList = this.totalWorkflows.filter(item => item.skyflowTemplate === this.templateType);
                } else {
                    this.workflowList = this.totalWorkflows;
                }
            });
        },
        confirm() {
            this.$refs.workflowForm.validate(valid => {
                if (!valid) {
                    Message.error('请输入必填信息');
                } else {
                    this.loading = true;
                    this.workflowForm.users = [];
                    this.workflowForm.groups = [];
                    if (!this.workflowForm.isTemplate) {
                        this.workflowForm.groups = this.selectedGroups;
                        this.workflowForm.users = this.selectedUsers;
                    }
                    if (this.isEditing && !this.isCopying) {
                        updateWorkflow(this.workflowForm.uuid, this.workflowForm).then(() => {
                            Message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                            this.loading = false;
                        }).catch(() => {});
                    } else {
                        delete this.workflowForm.uuid;
                        createWorkflow(this.workflowForm).then(() => {
                            Message({
                                message: '创建成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                            this.loading = false;
                        }).catch(() => {});
                    }
                }
            });
        },
        dialogClose() {
            if (this.createType === 'empty') {
                this.$refs.workflowForm.clearValidate();
                this.workflowForm = {};
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

