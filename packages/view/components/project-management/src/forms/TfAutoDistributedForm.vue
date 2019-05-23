<template>
    <BaseForm
        :title="`${params.uuid ? '编辑':'新建'}Tensorflow自动并行任务`"
        class="form-tfautodistributed"
        :label-width="240"
        icon="sdx-icon-tensorboard"
        @commit="commit"
    >
        <el-form
            label-position="right"
            label-width="240px"
            slot="form"
            @submit.native.prevent
            ref="tfautodistributed"
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
                prop="resourceConfig"
                label="资源配置:"
            >
                <i class="icon">*</i>
                <ResourceConfig
                    v-model="cpuMain"
                    type="cpu"
                    cpulabel="主节点CPU/内存"
                />
                <ResourceConfig
                    v-model="cpuService"
                    type="cpu"
                    cpulabel="参数服务器CPU/内存"
                />
               
                <ResourceConfig
                    v-model="cpuCompute"
                    type="cpu"
                    cpulabel="计算节点CPU/内存"
                />
                <ResourceConfig
                    v-if="isGpuEnt"
                    v-model="gpuObj"
                    gpulabel="计算节点GPU"
                    type="gpu"
                /> 
            </el-form-item>
            <el-form-item
                prop="instances.TF_EXECUTOR_INSTANCES"
                label="参数服务器/计算节点实例个数:"
            >
                <el-input-number
                    v-model="params.instances.TF_EXECUTOR_INSTANCES"
                    :min="1"
                    :max="InputNumberMax"
                />
            </el-form-item>
            <!-- <el-form-item
                prop="instances.TF_WORKER_INSTANCES"
                label="计算节点实例个数:"
            >
                <el-input-number
                    v-model="params.instances.TF_WORKER_INSTANCES"
                    :min="1"
                    :max="InputNumberMax"
                />
            </el-form-item> -->
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
                    placeholder="请输入创建的参数，~/ 代表家目录， ./ 代表代码所在的目录"
                />
            </el-form-item>
            <el-form-item
                prop="outputPaths"
                label="训练输出目录:"
            >
                <SdxwFileSelect
                    check-type="folder"
                    v-model="params.outputPaths"
                />
            </el-form-item>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import {Form, FormItem, Select, InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';
import { getImageList } from '@sdx/utils/src/api/image';
import ResourceConfig from './ResourceConfig';
import { createTask ,updateTask} from '@sdx/utils/src/api/project';
import { cNameValidate } from '@sdx/utils/src/validate/validate';
export default {
    name: 'TfAutoDistributedForm',
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        [InputNumber.name]: InputNumber,
        SdxuInput,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        ResourceConfig
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
                if(value.TF_PS_CPUS === 0) {
                    callback(new Error('需要配置参数服务器CPU/内存'));
                } else if (value.TF_WORKER_CPUS === 0) {
                    callback(new Error('需要配置计算节点CPU/内存'));
                } else if (value.TF_WORKER_GPUS === 0){
                    callback(new Error('需要配置计算节点GPU'));
                } else {
                    callback();
                }
            } else {
                if(value.TF_PS_CPUS === 0) {
                    callback(new Error('需要配置参数服务器CPU/内存'));
                } else if (value.TF_WORKER_CPUS === 0) {
                    callback(new Error('需要配置计算节点CPU/内存'));
                } else {
                    callback();
                }
            }
        };
        return {
            InputNumberMax: 100,
            params: {
                projectId: this.$route.params.projectId,
                name: '',
                description: '',
                type: 'TENSORFLOW_AUTO_DIST',
                imageId: '',
                resourceConfig: {
                    'TF_EXECUTOR_INSTANCES': 1,
                    'TF_WORKER_CPUS': 0,
                    'TF_PS_CPUS': 0,
                    'TF_MASTER_CPUS': 0,
                    'TF_WORKER_GPUS': 0,
                    'TF_WORKER_MEMORY': 0,
                    'TF_PS_MEMORY': 0,
                    'TF_MASTER_MEMORY': 0,
                    'GPU_MODEL': ''
                },
                sourcePaths: [],
                args: '',
                outputPaths: [],
                instances: {
                    TF_EXECUTOR_INSTANCES: 1
                }
            },
            imageOptions: [],
            cpuMain: {},
            cpuService: {},
            cpuCompute: {},
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
                resourceConfig: [
                    {
                        validator: resourceValidate,
                        trigger: 'change'
                    }
                ],
                sourcePaths: [
                    { required: true, message: '请选择源代码', trigger: 'blur' }
                ],
                outputPaths: [
                    { required: true, message: '请选择训练输出目录', trigger: 'blur' }
                ],
                'instances.TF_EXECUTOR_INSTANCES': [
                    { required: true, message: '请输入参数服务器/计算节点实例个数',trigger: 'change' }
                ],
                // 'instances.TF_PS_INSTANCES': [
                //     { required: true, message: '请输入参数服务器实例个数',trigger: 'change' }
                // ],
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
                imageType: 'TENSORFLOW_AUTO_DIST',
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
            this.$refs.tfautodistributed.validate().then(() => {
                this.params.resourceConfig = Object.assign({},  this.params.resourceConfig , {
                    'TF_EXECUTOR_INSTANCES': this.params.instances.TF_EXECUTOR_INSTANCES,
                });
                createTask(this.params)
                    .then (() => {
                        this.$router.go(-1);
                    });
            });
        }

    },

    watch: {
        task(nval) {
            this.params = { ...this.params, ...nval };
            this.cpuMain = {
                cpu: this.params.resourceConfig.TF_MASTER_CPUS/1000,
                memory: this.params.resourceConfig.TF_MASTER_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.TF_MASTER_CPUS/1000}-${this.params.resourceConfig.TF_MASTER_MEMORY / (1024*1024*1024)}`
            };
            this.cpuService = {
                cpu: this.params.resourceConfig.TF_PS_CPUS/1000,
                memory: this.params.resourceConfig.TF_PS_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.TF_PS_CPUS/1000}-${this.params.resourceConfig.TF_PS_MEMORY / (1024*1024*1024)}`
            };
            this.cpuCompute = {
                cpu: this.params.resourceConfig.TF_WORKER_CPUS/1000,
                memory: this.params.resourceConfig.TF_WORKER_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.TF_WORKER_CPUS/1000}-${this.params.resourceConfig.TF_WORKER_MEMORY / (1024*1024*1024)}`
            };
            this.gpuObj = {
                label:this.params.resourceConfig.GPU_MODEL,
                count: this.params.resourceConfig.TF_WORKER_GPUS,
                uuid: `${this.params.resourceConfig.GPU_MODEL}-${this.params.resourceConfig.TF_WORKER_GPUS}`
            };
        },
        cpuMain(val) {
            this.params.resourceConfig = { 
                'TF_EXECUTOR_INSTANCES': this.params.instances.TF_EXECUTOR_INSTANCES,
                'TF_WORKER_CPUS': this.params.resourceConfig.TF_WORKER_CPUS,
                'TF_PS_CPUS': this.params.resourceConfig.TF_PS_CPUS,
                'TF_MASTER_CPUS':  val.cpu*1000,
                'TF_WORKER_GPUS':  this.params.resourceConfig.TF_WORKER_GPUS,
                'TF_WORKER_MEMORY': this.params.resourceConfig.TF_WORKER_MEMORY,
                'TF_PS_MEMORY':  this.params.resourceConfig.TF_PS_MEMORY,
                'TF_MASTER_MEMORY': val.memory * 1024* 1024*1024,
                'GPU_MODEL':  this.params.resourceConfig.GPU_MODEL,
            };
        },
        cpuService(val) {
            this.params.resourceConfig = { 
                'TF_EXECUTOR_INSTANCES': this.params.instances.TF_EXECUTOR_INSTANCES,
                'TF_WORKER_CPUS': this.params.resourceConfig.TF_WORKER_CPUS,
                'TF_PS_CPUS':  val.cpu*1000,
                'TF_MASTER_CPUS':  this.params.resourceConfig.TF_MASTER_CPUS,
                'TF_WORKER_GPUS':  this.params.resourceConfig.TF_WORKER_GPUS,
                'TF_WORKER_MEMORY': this.params.resourceConfig.TF_WORKER_MEMORY,
                'TF_PS_MEMORY':  val.memory * 1024* 1024*1024,
                'TF_MASTER_MEMORY':  this.params.resourceConfig.TF_MASTER_MEMORY,
                'GPU_MODEL':  this.params.resourceConfig.GPU_MODEL,
            };
        },
        cpuCompute(val) {
            this.params.resourceConfig = { 
                'TF_EXECUTOR_INSTANCES': this.params.instances.TF_EXECUTOR_INSTANCES,
                'TF_WORKER_CPUS': val.cpu*1000,
                'TF_PS_CPUS': this.params.resourceConfig.TF_PS_CPUS,
                'TF_MASTER_CPUS':  this.params.resourceConfig.TF_MASTER_CPUS,
                'TF_WORKER_GPUS':  this.params.resourceConfig.TF_WORKER_GPUS,
                'TF_WORKER_MEMORY': val.memory * 1024* 1024*1024,
                'TF_PS_MEMORY':  this.params.resourceConfig.TF_PS_MEMORY,
                'TF_MASTER_MEMORY':  this.params.resourceConfig.TF_MASTER_MEMORY,
                'GPU_MODEL':  this.params.resourceConfig.GPU_MODEL,
            };
        },
        gpuObj(val) {
            this.params.resourceConfig = { 
                'TF_EXECUTOR_INSTANCES': this.params.instances.TF_EXECUTOR_INSTANCES,
                'TF_WORKER_CPUS': this.params.resourceConfig.TF_WORKER_CPUS,
                'TF_PS_CPUS': this.params.resourceConfig.TF_PS_CPUS,
                'TF_MASTER_CPUS':  this.params.resourceConfig.TF_MASTER_CPUS,
                'TF_WORKER_GPUS':  val.count,
                'TF_WORKER_MEMORY': this.params.resourceConfig.TF_WORKER_MEMORY,
                'TF_PS_MEMORY':  this.params.resourceConfig.TF_PS_MEMORY,
                'TF_MASTER_MEMORY':  this.params.resourceConfig.TF_MASTER_MEMORY,
                'GPU_MODEL':  val.label
            };
        }
    }
};
</script>

<style lang="scss" scoped>
    .form-tfautodistributed {
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
