<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit'):t('view.task.form.create')} Tensorflow ${t('view.task.form.task')}`"
        class="form-tfsingle"
        :label-width="100"
        icon="sdx-icon-tensorboard"
        @commit="commit"
    >
        <el-form
            label-position="right"
            label-width="100px"
            slot="form"
            @submit.native.prevent
            ref="tfsingle"
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
                    v-if="!isGpuEnt"
                    v-model="cpuObj"
                    type="onlycpu"
                />

                <div v-if="isGpuEnt">
                    <SdxwResourceConfig
                        v-model="cpuObj"
                        type="cpu"
                    />
                    <SdxwResourceConfig
                        v-model="gpuObj"
                        type="gpu"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="sourcePaths"
                :label="`${t('view.task.SourceCode')}:`"
            >
                <SdxwFileSelect
                    v-model="params.sourcePaths"
                    :accept="'.py'"
                    :string-model="true"
                    check-type="file"
                />
            </el-form-item>
            <el-form-item
                prop="args"
                :label="`${t('view.task.StartupParameter')}:`"
            >
                <SdxuInput
                    v-model="params.args"
                    :searchable="true"
                    size="small"
                    :placeholder="`${t('view.task.form.Start_up_parameter_holder')}`"
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
import { createTask,updateTask } from '@sdx/utils/src/api/project';
import { nameWithChineseValidator , descValidator} from '@sdx/utils/src/helper/validate';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'TfSingleForm',
    mixins: [locale],
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
                if(value.EXECUTOR_CPUS === 0) {
                    callback(new Error(this.t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else if (value.EXECUTOR_GPUS === 0) {
                    callback(new Error(this.t('view.task.form.GPU_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            } else {
                if(value.EXECUTOR_CPUS === 0) {
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
                type: 'TENSORFLOW',
                imageId: '',
                resourceConfig: {
                    'EXECUTOR_INSTANCES': 1,
                    'EXECUTOR_CPUS': 0,
                    'EXECUTOR_GPUS': 0,
                    'EXECUTOR_MEMORY': 0,
                    'GPU_MODEL': ''
                },
                sourcePaths: [],
                args: ''
            },
            imageOptions: [],
            cpuObj: {},
            gpuObj: {},
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
                sourcePaths: [
                    { required: true, message: this.t('view.task.form.Please_select_the_source_code'), trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        isGpuEnt() {
            let isGpuEnt = false;
            for(let i=0; i<this.imageOptions.length; i++) {
                if(this.imageOptions[i].value ===this.params.imageId) {
                    if(this.imageOptions[i].label.includes('gpu')) {
                        isGpuEnt =true;
                    } else {
                        isGpuEnt = false;
                    }
                }
            }
            return isGpuEnt;
        }
    },
    created() {
        this.imageList();
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
            this.$refs.tfsingle.validate().then(() => {
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
            this.gpuObj = {
                label:this.params.resourceConfig.GPU_MODEL,
                count: this.params.resourceConfig.EXECUTOR_GPUS,
                uuid: `${this.params.resourceConfig.GPU_MODEL}-${this.params.resourceConfig.EXECUTOR_GPUS}`
            };
        },
        cpuObj(val) {
            this.params.resourceConfig = {
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': val.cpu * 1000,
                'EXECUTOR_GPUS': this.params.resourceConfig.EXECUTOR_GPUS,
                'EXECUTOR_MEMORY': val.memory * 1024* 1024*1024,
                'GPU_MODEL': this.params.resourceConfig.GPU_MODEL
            };
        },
        gpuObj(val) {
            this.params.resourceConfig = {
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': this.params.resourceConfig.EXECUTOR_CPUS,
                'EXECUTOR_GPUS': val.count,
                'EXECUTOR_MEMORY': this.params.resourceConfig.EXECUTOR_MEMORY,
                'GPU_MODEL': val.label
            };
        },
        'params.imageId'() {
            this.$refs.tfsingle.clearValidate('resourceConfig');
        }
    }
};
</script>

<style lang="scss" scoped>
    .form-tfsingle {
        .el-form-item__content {
            position: relative;
        }
        .icon {
            color: #F56C6C;
            position: absolute;
            top: 2px;
            left: -83px;
        }
        .sdxw-file-select {
            max-width: 560px;
        }
    }
</style>
