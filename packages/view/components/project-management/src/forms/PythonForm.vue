<template>
    <BaseForm
        :title="'新建Python任务'"
        class="form-python"
        :label-width="100"
        icon="sdx-icon-python"
        @commit="commit"
    >
        <el-form
            label-position="right"
            label-width="100px"
            slot="form"
            @submit.native.prevent
            ref="python"
            :rules="rules"
            :model="params"
        >
            <el-form-item
                prop="name"
                label="任务名称:"
            >
                <SdxuInput
                    v-model="params.name"
                    :searchable="true"
                    size="small"
                    placeholder="请输入任务名称"
                />
            </el-form-item>
            <el-form-item
                prop="description"
                label="任务描述:"
            >
                <SdxuInput
                    type="textarea"
                    :searchable="true"
                    v-model="params.description"
                    size="small"
                    placeholder="请输入任务描述"
                />
            </el-form-item>
            <el-form-item
                prop="imageId"
                label="运行环境:"
            >
                <el-select
                    v-model="params.imageId"
                    size="small"
                    placeholder="请输入运行环境"
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
                prop="resource"
                label="资源配置:"
            >
                <i class="icon">*</i>
                <ResourceConfig
                    v-if="!isGpuEnt"
                    v-model="cpuObj"
                    type="onlycpu"
                />

                <div v-if="isGpuEnt">
                    <ResourceConfig
                        v-model="cpuObj"
                        type="cpu"
                    />
                    <ResourceConfig
                        v-model="gpuObj"
                        type="gpu"
                    /> 
                </div>
            </el-form-item>
            <el-form-item
                prop="sourcePaths"
                label="源代码:"
            >
                <SdxwFileSelect
                    v-model="params.sourcePaths"
                    :accept="'.py'"
                />
            </el-form-item>
            <el-form-item
                prop="args"
                label="启动参数:"
            >
                <SdxuInput
                    v-model="params.args"
                    :searchable="true"
                    size="small"
                    placeholder="请输入启动参数"
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
import ResourceConfig from './ResourceConfig';
import { createTask } from '@sdx/utils/src/api/project';
import { cNameValidate } from '@sdx/utils/src/validate/validate';
export default {
    name: 'PythonForm',
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        ResourceConfig
    },
    props: {
        
    },
    data() {
        const resourceValidate = (rule, value, callback) => {
            if(this.isGpuEnt) {
                if(value.EXECUTOR_CPUS === 0) {
                    callback(new Error('需要配置CPU/内存资源'));
                } else if (value.EXECUTOR_GPUS === 0) {
                    callback(new Error('需要配置GPU资源'));
                } else {
                    callback();
                }
            } else {
                if(value.EXECUTOR_CPUS === 0) {
                    callback(new Error('需要配置CPU/内存资源'));
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
                type: 'PYTHON',
                imageId: '',
                resource: {
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
                    { required: true, message: '请输入任务名称', trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: cNameValidate, trigger: 'blur' }
                ],
                imageId: [
                    { required: true, message: '请选择运行环境', trigger: 'change' }
                ],
                resource: [
                    {
                        validator: resourceValidate,
                        trigger: 'change'
                    }
                ],
                sourcePaths: [
                    { required: true, message: '请选择源代码', trigger: 'blur' }
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
                imageType: 'PYTHON',
                start: 1,
                count: -1
            };
            getImageList(params)
                .then(data => {
                    for(let i=0; i<data.data.length; i++) {
                        this.imageOptions.push({value: data.data[i].uuid, label:data.data[i].name});
                    }
                });
        },
        commit() {
            this.$refs.python.validate().then(() => {
                createTask(this.params)
                    .then (() => {
                        this.$router.go(-1);
                    });
            });
        }
    },

    watch: {
        cpuObj(val) {
            this.params.resource = { 
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': val.cpu * 1000,
                'EXECUTOR_GPUS': this.params.resource.EXECUTOR_GPUS,
                'EXECUTOR_MEMORY': val.memory * 1024* 1024*1024,
                'GPU_MODEL': this.params.resource.GPU_MODEL
            };
        },
        gpuObj(val) {
            this.params.resource = { 
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': this.params.resource.EXECUTOR_CPUS,
                'EXECUTOR_GPUS': val.count,
                'EXECUTOR_MEMORY': this.params.resource.EXECUTOR_MEMORY,
                'GPU_MODEL': val.label
            };
        }
    }
};
</script>

<style lang="scss" scoped>
    .form-python {
        .el-form-item__content {
            position: relative;
        }
        .icon {
            color: #F56C6C;
            position: absolute;
            top: 2px;
            left: -83px;
        }
    }
</style>
