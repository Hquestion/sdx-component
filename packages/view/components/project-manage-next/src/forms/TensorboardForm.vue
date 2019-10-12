<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit'):t('view.task.form.create')} TensorBoard ${t('view.task.form.task')}`"
        class="form-tensorboard"
        :label-width="lang$ === 'en' ? 190 : 100"
        icon="sdx-icon-tensorboard"
        @commit="commit"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '100px'"
            slot="form"
            @submit.native.prevent
            ref="tensorboard"
            :rules="rules"
            :model="params"
        >
            <el-form-item
                prop="name"
                :label="`${t('view.task.taskName')}:`"
            >
                <SdxuInput
                    v-model="params.name"
                    :searchable="true"
                    size="small"
                    :placeholder="t('view.task.form.Please_enter_the_task_name')"
                />
            </el-form-item>
            <el-form-item
                prop="description"
                :label="`${t('view.task.TaskDescription')}:`"
            >
                <SdxuInput
                    type="textarea"
                    :searchable="true"
                    size="small"
                    :placeholder="t('view.task.form.Please_enter_a_task_description')"
                    v-model="params.description"
                />
            </el-form-item>
            <el-form-item
                prop="imageId"
                :label="`${t('view.task.RuntimeEnvironment')}:`"
            >
                <el-select
                    v-model="params.imageId"
                    size="small"
                    :placeholder="t('view.task.form.Please_select_the_operating_environment')"
                >
                    <el-option
                        v-for="item in imageOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                prop="resourceConfig"
                :label="`${t('view.task.form.ResourceAllocation')}:`"
            >
                <i class="icon">*</i>
                <SdxwResourceConfig
                    v-model="cpuObj"
                    type="onlycpu"
                    :data-ready="dataReady"
                />
            </el-form-item>
            <el-form-item
                prop="logPaths"
                :label="`${t('view.task.LogDirectory')}:`"
            >
                <SdxwFileSelect
                    v-model="params.logPaths"
                    check-type="folder"
                    :use-folder-path="true"
                    :string-model="true"
                    :project-enable="cooperation"
                    :private-enable="!cooperation"
                    :share-enable="!cooperation"
                    :upload-params="uploadParams"
                />
            </el-form-item>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import {Form, FormItem, Select} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';
import { getImageList } from '@sdx/utils/src/api/image';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import { createTask, updateTask } from '@sdx/utils/src/api/project';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
export default {
    name: 'TensorboardForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        SdxwResourceConfig
    },
    props: {
        task: {
            type: Object,
            default: null
        },
    },
    data() {
        const resourceValidate = (rule, value, callback) => {
            if(this.isGpuEnt) {
                if(value.EXECUTOR_CPUS === 0 || value.EXECUTOR_CPUS === null || isNaN(value.EXECUTOR_CPUS)) {
                    callback(new Error(this.t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else if (value.EXECUTOR_GPUS === 0 || value.EXECUTOR_GPUS === null || isNaN(value.EXECUTOR_GPUS)) {
                    callback(new Error(this.t('view.task.form.GPU_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            } else {
                if(value.EXECUTOR_CPUS === 0 || value.EXECUTOR_CPUS === null || isNaN(value.EXECUTOR_CPUS)) {
                    callback(new Error(this.t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            }
        };
        return {
            params: {
                projectId: this.$route.params.projectId,
                name: '',
                description: '',
                type: 'TENSORBOARD',
                imageId: '',
                resourceConfig: {
                    'EXECUTOR_INSTANCES': 1,
                    'EXECUTOR_CPUS': 0,
                    'EXECUTOR_GPUS': 0,
                    'EXECUTOR_MEMORY': 0,
                    'GPU_MODEL':''
                },
                logPaths: []
            },
            imageOptions: [],
            cpuObj: {},
            rules:  {
                name: [
                    { required: true, message: this.t('view.task.form.Please_enter_the_task_name'), trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ],
                imageId: [
                    { required: true, message: this.t('view.task.form.Please_select_the_operating_environment'), trigger: 'change' }
                ],
                resourceConfig: [
                    {
                        validator: resourceValidate,
                        trigger: 'change'
                    }
                ],
                logPaths: [
                    { required: true, message: this.t('view.task.form.Please_select_the_log_directory'), trigger: 'blur' }
                ]
            },
            dataReady: false,
            cooperation:true
        };
    },
    computed: {
      
    },
    created() {
        this.imageList();
        this.projectCooperation();
    },
    methods: {
        imageList() {
            const params = {
                imageType: 'TENSORFLOW',
                start: 1,
                count: -1,
                ownerId: getUser().userId || ''
            };
            getImageList(params)
                .then(data => {
                    for(let i=0; i<data.data.length; i++) {
                        this.imageOptions.push({value: data.data[i].uuid, label:data.data[i].name});
                    }
                });
        },
        commit() {
            this.$refs.tensorboard.validate().then(() => {
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
            this.cpuObj = {
                cpu: this.params.resourceConfig.EXECUTOR_CPUS/1000,
                memory: this.params.resourceConfig.EXECUTOR_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.EXECUTOR_CPUS/1000}-${this.params.resourceConfig.EXECUTOR_MEMORY / (1024*1024*1024)}`
            };
            this.$nextTick(()=> {
                this.dataReady = true;
            });
        },
        cpuObj(val) {
            this.params.resourceConfig = { 
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': val.cpu * 1000,
                'EXECUTOR_GPUS': 0,
                'EXECUTOR_MEMORY': val.memory * 1024* 1024*1024,
                'GPU_MODEL': ''
            };
        },
        'params.imageId'() {
            this.$refs.tensorboard.clearValidate('resourceConfig');
        }
    }
};
</script>

