<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit'):t('view.task.form.create')} ${t('view.task.officiaType.TENSORFLOW_AUTO_DIST')} ${t('view.task.form.task')}`"
        class="form-tfautodistributed"
        :label-width="lang$ === 'en' ? 256 : 240"
        icon="sdx-icon-tensorflow"
        @commit="commit"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '256px' : '240px'"
            slot="form"
            @submit.native.prevent
            ref="tfautodistributed"
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
                    v-model="params.description"
                    size="small"
                    :placeholder="t('view.task.form.Please_enter_a_task_description')"
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
                    v-model="cpuMain"
                    type="cpu"
                    :cpulabel="t('widget.resourceConfig.Main_Node_CPU_Memory')"
                    :data-ready="dataReady"
                />
                <SdxwResourceConfig
                    v-model="cpuService"
                    type="cpu"
                    :cpulabel="t('widget.resourceConfig.Parametric_Server_CPU_Memory')"
                    :data-ready="dataReady"
                />
                <SdxwResourceConfig
                    v-model="cpuCompute"
                    type="cpu"
                    :cpulabel="t('widget.resourceConfig.Computing_Node_CPU_Memory')"
                    :data-ready="dataReady"
                />
                <SdxwResourceConfig
                    v-if="isGpuEnt"
                    v-model="gpuObj"
                    :gpulabel="t('widget.resourceConfig.Computing_Node_GPU')"
                    type="gpu"
                    :data-ready="dataReady"
                /> 
            </el-form-item>
            <el-form-item
                prop="resourceConfig.TF_EXECUTOR_INSTANCES"
                :label="`${t('view.task.form.ParametricServer')}/${t('view.task.ComputationalNodeInstanceCount')}:`"
            >
                <el-input-number
                    v-model="params.resourceConfig.TF_EXECUTOR_INSTANCES"
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
                :label="`${t('view.task.SourceCode')}:`"
            >
                <SdxwFileSelect
                    v-model="params.sourcePaths"
                    :accept="'.py'"
                    :string-model="true"
                    check-type="file"
                    :project-enable="cooperation"
                    :private-enable="!cooperation"
                    :share-enable="!cooperation"
                    :upload-params="uploadParams"
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
            <el-form-item
                prop="outputPaths"
                :label="`${t('view.task.TrainingOutputDirectory')}:`"
            >
                <SdxwFileSelect
                    check-type="folder"
                    v-model="params.outputPaths"
                    :string-model="true"
                    :project-enable="cooperation"
                    :private-enable="!cooperation"
                    :share-enable="false"
                    :upload-params="uploadParams"
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
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import { createTask ,updateTask} from '@sdx/utils/src/api/project';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
export default {
    name: 'TfAutoDistributedForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        [InputNumber.name]: InputNumber,
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
                if (value.TF_MASTER_CPUS === 0 || value.TF_MASTER_CPUS === null || isNaN(value.TF_MASTER_CPUS)) {
                    callback(new Error(this.t('view.task.form.Need_to_configure_master_CPU_memory')));
                } else if(value.TF_PS_CPUS === 0 || value.TF_PS_CPUS === null || isNaN(value.TF_PS_CPUS)) {
                    callback(new Error(this.t('view.task.form.Parameter_server_CPU_Memory_need_to_be_configured')));
                } else if (value.TF_WORKER_CPUS === 0 || value.TF_WORKER_CPUS === null || isNaN(value.TF_WORKER_CPUS)) {
                    callback(new Error(this.t('view.task.form.Computing_node_CPU_Memory_need_to_be_configured')));
                } else if (value.TF_WORKER_GPUS === 0 || value.TF_WORKER_GPUS === null || isNaN(value.TF_WORKER_GPUS)){
                    callback(new Error(this.t('view.task.form.Computing_node_GPU_needs_to_be_configured')));
                }  else {
                    callback();
                }
            } else {
                if (value.TF_MASTER_CPUS === 0 || value.TF_MASTER_CPUS === null || isNaN(value.TF_MASTER_CPUS)) {
                    callback(new Error(this.t('view.task.form.Need_to_configure_master_CPU_memory')));
                }else if(value.TF_PS_CPUS === 0 || value.TF_PS_CPUS === null || isNaN(value.TF_PS_CPUS)) {
                    callback(new Error(this.t('view.task.form.Parameter_server_CPU_Memory_need_to_be_configured')));
                } else if (value.TF_WORKER_CPUS === 0 || value.TF_WORKER_CPUS === null || isNaN(value.TF_WORKER_CPUS)) {
                    callback(new Error(this.t('view.task.form.Computing_node_CPU_Memory_need_to_be_configured')));
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
                outputPaths: []
            },
            imageOptions: [],
            cpuMain: {},
            cpuService: {},
            cpuCompute: {},
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
                ],
                outputPaths: [
                    { required: true, message: this.t('view.task.form.Please_select_the_training_output_directory'), trigger: 'blur' }
                ],
                'resourceConfig.TF_EXECUTOR_INSTANCES': [
                    { required: true, message: this.t('view.task.form.Please_enter_the_parameter_server_calculate_the_number_of_node_instances'),trigger: 'change' }
                ],
                // 'resourceConfig.TF_PS_INSTANCES': [
                //     { required: true, message: '请输入参数服务器实例个数',trigger: 'change' }
                // ],
            },
            dataReady: false,
            cooperation:true
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
            if (!this.isGpuEnt) {
                this.params.resourceConfig.TF_WORKER_GPUS = 0; 
                this.params.resourceConfig.GPU_MODEL = '';
            }
            this.$refs.tfautodistributed.validate().then(() => {
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
            this.$nextTick(()=> {
                this.dataReady = true;
            });
        },
        cpuMain(val) {
            this.params.resourceConfig = { 
                'TF_EXECUTOR_INSTANCES': this.params.resourceConfig.TF_EXECUTOR_INSTANCES,
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
                'TF_EXECUTOR_INSTANCES': this.params.resourceConfig.TF_EXECUTOR_INSTANCES,
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
                'TF_EXECUTOR_INSTANCES': this.params.resourceConfig.TF_EXECUTOR_INSTANCES,
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
                'TF_EXECUTOR_INSTANCES': this.params.resourceConfig.TF_EXECUTOR_INSTANCES,
                'TF_WORKER_CPUS': this.params.resourceConfig.TF_WORKER_CPUS,
                'TF_PS_CPUS': this.params.resourceConfig.TF_PS_CPUS,
                'TF_MASTER_CPUS':  this.params.resourceConfig.TF_MASTER_CPUS,
                'TF_WORKER_GPUS':  val.count,
                'TF_WORKER_MEMORY': this.params.resourceConfig.TF_WORKER_MEMORY,
                'TF_PS_MEMORY':  this.params.resourceConfig.TF_PS_MEMORY,
                'TF_MASTER_MEMORY':  this.params.resourceConfig.TF_MASTER_MEMORY,
                'GPU_MODEL':  val.label
            };
        },
        'params.imageId'() {
            this.$refs.tfautodistributed.clearValidate('resourceConfig');
        }
    }
};
</script>

