<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit') : t('view.task.form.create')} ContainerDev ${t('view.task.form.task')}`"
        class="form-containerdev"
        :label-width="lang$ === 'en' ? 190 : 100"
        icon="sdx-icon-docker"
        @commit="commit"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '100px'"
            slot="form"
            @submit.native.prevent
            ref="containerdev"
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
                    :searchable="true"
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
                    :data-ready="dataReady"
                />

                <div v-if="isGpuEnt">
                    <SdxwResourceConfig
                        v-model="cpuObj"
                        type="cpu"
                        :data-ready="dataReady"
                    />
                    <SdxwResourceConfig
                        v-model="gpuObj"
                        type="gpu"
                        :data-ready="dataReady"
                    />
                </div>
            </el-form-item>
            <el-form-item
                v-if="!cooperation"
                prop="datasources"
                :label="`${t('view.task.form.DataSource')}:`"
            >
                <data-source-select v-model="params.datasources" />
            </el-form-item>
            <el-form-item
                prop="datasets"
                :label="`${t('view.task.DataSet')}:`"
            >
                <el-select
                    v-model="params.datasets"
                    size="small"
                    :placeholder="t('view.task.form.Please_select_the_dataset')"
                    multiple
                >
                    <el-option
                        v-for="item in datasetsOptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import {Form, FormItem, Select} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {  createTask, updateTask, getDataSet} from '@sdx/utils/src/api/project';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
export default {
    name: 'ContainerDevForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        SdxwResourceConfig,
        DataSourceSelect
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
                uuid: '',
                projectId: this.$route.params.projectId,
                name: '',
                description: '',
                type: 'CONTAINERDEV',
                imageId: '',
                resourceConfig: {
                    'EXECUTOR_INSTANCES': 1,
                    'EXECUTOR_CPUS': 0,
                    'EXECUTOR_GPUS': 0,
                    'EXECUTOR_MEMORY': 0,
                    'GPU_MODEL': ''
                },
                datasources: [],
                datasets: []
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
            },
            datasetsOptions: [],
            cooperation:true,
            dataReady: false
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
        this.getDataSetList();
        // 判断是否协作
        this.projectCooperation();
    },
    methods: {
        // 数据集列表
        getDataSetList() {
            getDataSet({ share_kinds: '1,2,3' })
                .then(data => {
                    this.datasetsOptions = data.data.options;
                });
        },
        imageList() {
            const params = {
                imageType: 'CONTAINER_DEV',
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
                this.params.resourceConfig.EXECUTOR_GPUS = 0; 
                this.params.resourceConfig.GPU_MODEL = '';
            }
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
            this.$nextTick(()=> {
                this.dataReady = true;
            });
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
            this.$refs.containerdev.clearValidate('resourceConfig');
        }
    }
};
</script>
