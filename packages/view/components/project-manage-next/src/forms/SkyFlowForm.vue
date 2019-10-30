<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit') : t('view.task.form.create')} SkyFlow ${t('view.task.form.task')}`"
        class="form-containerdev"
        :label-width="lang$ === 'en' ? 190 : 160"
        icon="sdx-skyflowrenwu"
        @commit="commit"
        :show-create-project="showCreateProject"
        :type="`SkyFlow ${t('view.task.form.task')}`"
        @create-project-close="createProjectClose"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '160px'"
            slot="form"
            @submit.native.prevent
            ref="containerdev"
            :rules="rules"
            :model="params"
        >
            <SdxwExpandLabel
                label="基本配置"
            />
            <el-form-item
                prop="name"
                label="工作流名称:"
            >
                <SdxuInput
                    v-model="params.name"
                    :searchable="true"
                    size="small"
                    placeholder="请输入工作流名称"
                />
            </el-form-item>
            <el-form-item
                prop="description"
                label="工作流描述:"
            >
                <SdxuInput
                    type="textarea"
                    :searchable="true"
                    v-model="params.description"
                    size="small"
                    placeholder="请输入工作流描述"
                />
            </el-form-item>
            <el-form-item
                prop="params"
                label="参数:"
            >
                <SdxuInput
                    :searchable="true"
                    v-model="params.params"
                    size="small"
                    placeholder="请输入工作流参数"
                />
                <div class="form-tip">
                    工作流的参数, 可以覆盖工作流中节点的同名参数
                </div>
            </el-form-item>
            <el-form-item
                label="关联项目:"
                prop="project"
                v-if="!projectId"
            >
                <el-select
                    v-model="params.project"
                    size="small"
                    placeholder="请选择关联项目"
                    style="width:420px;margin-right:10px;"
                    filterable
                >
                    <el-option
                        v-for="item in projectOptions"
                        :key="item.uuid"
                        :label="item.name"
                        :value="item.uuid"
                    />
                </el-select>
                <SdxuButton
                    type="primary"
                    invert
                    size="small"
                    class="create-project-button"
                    @click="createProject"
                >
                    <i class="sdx-icon sdx-xinjianhao" />
                    创建新项目
                </SdxuButton>
            </el-form-item>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import Button from '@sdx/ui/components/button';
import {Form, FormItem, Select, InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {  createTask, updateTask } from '@sdx/utils/src/api/project';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
import ExpandLabel from '@sdx/widget/components/expand-label';
export default {
    name: 'SkyFlowForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [ExpandLabel.name]: ExpandLabel,
        [Select.name]: Select,
        SdxuInput,
        [InputNumber.name]: InputNumber,
        [Button.name]: Button
    },
    props: {
        task: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            params: {
                uuid: '',
                name: '',
                description: '',
                type: 'SkyFlow',
                project: ''
            },
            projectId: this.$route.params.projectId,
            rules:  {
                name: [
                    { required: true, message: this.t('view.task.form.Please_enter_the_task_name'), trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                project: [
                    { required: true, message: '请选择关联项目', trigger: 'change'}
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.getProjectList();
    },
    methods: {
        commit() {
            this.$refs.containerdev.validate().then(() => {
                (this.params.uuid ? updateTask(this.params.uuid,this.params) : createTask(this.params))
                    .then (() => {
                        this.$router.go(-1);
                    });
            });
        }
    },

    watch: {
        task(nval) {
            this.params = { ...this.params, ...nval};
        }
    }
};
</script>
