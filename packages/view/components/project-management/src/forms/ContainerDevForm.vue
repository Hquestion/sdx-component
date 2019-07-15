<template>
    <BaseForm
        :title="`${params.uuid ? $t('view.task.form.edit') : $t('view.task.form.create')} ContainerDev ${$t('view.task.form.task')}`"
        class="form-containerdev"
        :label-width="100"
        icon="sdx-icon-docker"
        @commit="commit"
    >
        <el-form
            label-position="right"
            label-width="100px"
            slot="form"
            @submit.native.prevent
            ref="containerdev"
            :rules="rules"
            :model="params"
        >
            <el-form-item
                prop="name"
                :label="`${$t('view.task.taskName')}:`"
            >
                <SdxuInput
                    v-model="params.name"
                    :searchable="true"
                    size="small"
                    :placeholder="$t('view.task.form.Please_enter_the_task_name')"
                />
            </el-form-item>
            <el-form-item
                prop="description"
                :label="`${$t('view.task.TaskDescription')}:`"
            >
                <SdxuInput
                    type="textarea"
                    :searchable="true"
                    v-model="params.description"
                    size="small"
                    :placeholder="$t('view.task.form.Please_enter_a_task_description')"
                />
            </el-form-item>
            <el-form-item
                prop="imageId"
                :label="`${$t('view.task.RuntimeEnvironment')}:`"
            >
                <el-select
                    v-model="params.imageId"
                    :searchable="true"
                    size="small"
                    :placeholder="$t('view.task.form.Please_select_the_operating_environment')"
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
                :label="`${$t('view.task.form.ResourceAllocation')}:`"
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
                v-if="!cooperation"
                prop="datasources"
                :label="`${$t('view.task.form.DataSource')}:`"
            >
                <data-source-select v-model="params.datasources" />
            </el-form-item>
            <el-form-item
                prop="datasets"
                :label="`${$t('view.task.DataSet')}:`"
            >
                <el-select
                    v-model="params.datasets"
                    size="small"
                    :placeholder="$t('view.task.form.Please_select_the_dataset')"
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
import {  createTask, updateTask, getDataSet, getProjectDetail} from '@sdx/utils/src/api/project';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
export default {
    name: 'ContainerDevForm',
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
                if(value.EXECUTOR_CPUS === 0) {
                    callback(new Error(this.$t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else if (value.EXECUTOR_GPUS === 0) {
                    callback(new Error(this.$t('view.task.form.GPU_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            } else {
                if(value.EXECUTOR_CPUS === 0) {
                    callback(new Error(this.$t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
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
                    { required: true, message: '请输入任务名称', trigger: 'blur',
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
                    { required: true, message: '请选择运行环境', trigger: 'change' }
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
        getProjectDetail(this.$route.params.projectId)
            .then(res => {
                this.cooperation = res.data.groups.length > 0 ? true : false;
            });
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

<style lang="scss" scoped>
    .form-containerdev {
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
