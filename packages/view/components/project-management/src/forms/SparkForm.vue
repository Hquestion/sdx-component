<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit'):t('view.task.form.create')} Spark ${t('view.task.form.task')}`"
        class="form-spark"
        :label-width="lang$ === 'en' ? 190 : 120"
        icon="sdx-Apache_Spark_logo"
        @commit="commit"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '120px'"
            slot="form"
            @submit.native.prevent
            ref="spark"
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
                    v-model="cpuDriver"
                    type="cpu"
                    :cpulabel="t('widget.resourceConfig.Driver_CPU_Memory')"
                    :data-ready="dataReady"
                />
                <SdxwResourceConfig
                    v-model="cpuExecute"
                    type="cpu"
                    :cpulabel="t('widget.resourceConfig.Actuator_CPU_Memory')"
                    :data-ready="dataReady"
                />
            </el-form-item>
            <el-form-item
                prop="resourceConfig.SPARK_EXECUTOR_INSTANCES"
                :label="`${t('view.task.ExectorInstanceCount')}:`"
            >
                <el-input-number
                    v-model="params.resourceConfig.SPARK_EXECUTOR_INSTANCES"
                    :min="1"
                    :max="InputNumberMax"
                />
            </el-form-item>
            <el-form-item
                prop="sourcePaths"
                :label="`${t('view.task.SourceCode')}:`"
            >
                <SdxwFileSelect
                    v-model="params.sourcePaths"
                    accept=".jar,.py,.zip,.egg"
                    :string-model="true"
                    check-type="file"
                    :project-enable="cooperation"
                    :private-enable="!cooperation"
                    :share-enable="!cooperation"
                    :upload-params="uploadParams"
                />
            </el-form-item>
            <el-form-item
                prop="mainClass"
                :label="`${t('view.task.MainClassName')}:`"
                v-if="params.sourcePaths[0] && params.sourcePaths[0].includes('.jar')"
            >
                <SdxuInput
                    v-model="params.mainClass"
                    :searchable="true"
                    size="small"
                    :label="`${t('view.task.StartupParameter')}:`"
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
import {Form, FormItem, Select,InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';
import { getImageList } from '@sdx/utils/src/api/image';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import { createTask,updateTask} from '@sdx/utils/src/api/project';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
export default {
    name: 'SparkForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        [InputNumber.name]: InputNumber,
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
            if(value.SPARK_DRIVER_CPUS === 0 || value.SPARK_DRIVER_CPUS === null || isNaN(value.SPARK_DRIVER_CPUS)) {
                callback(new Error(this.t('view.task.form.Driver_CPU_memory_needs_to_be_configured')));
            }else  if (value.SPARK_EXECUTOR_CPUS === 0 || value.SPARK_EXECUTOR_CPUS === null || isNaN(value.SPARK_EXECUTOR_CPUS)) {
                callback(new Error(this.t('view.task.form.Executor_CPU_memory_needs_to_be_configured')));
            } else {
                callback();
            }
        };
        return {
            InputNumberMax: 100,
            params: {
                projectId: this.$route.params.projectId,
                name: '',
                description: '',
                type: 'SPARK',
                imageId: '',
                resourceConfig: {
                    'SPARK_DRIVER_CPUS': 0,
                    'SPARK_EXECUTOR_INSTANCES': 1,
                    'SPARK_EXECUTOR_CPUS': 0,
                    'SPARK_DRIVER_MEMORY': 0,
                    'SPARK_EXECUTOR_MEMORY': 0,
                },
                sourcePaths: [],
                args: '',
                mainClass: ''
            },
            imageOptions: [],
            cpuDriver: {},
            cpuExecute: {},
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
                'resourceConfig.SPARK_EXECUTOR_INSTANCES': [
                    { required: true, message: this.t('view.task.form.Please_enter_the_number_of_instances'),trigger: 'change' }
                ],
                mainClass: [
                    { required: true, message: this.t('view.task.form.Please_enter_the_name_of_the_main_class'), trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
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
                imageType: 'SPARK',
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
            this.$refs.spark.validate().then(() => {
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
            this.cpuDriver = {
                cpu: this.params.resourceConfig.SPARK_DRIVER_CPUS/1000,
                memory: this.params.resourceConfig.SPARK_DRIVER_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.SPARK_DRIVER_CPUS/1000}-${this.params.resourceConfig.SPARK_DRIVER_MEMORY / (1024*1024*1024)}`
            };
            this.cpuExecute = {
                cpu: this.params.resourceConfig.SPARK_EXECUTOR_CPUS/1000,
                memory: this.params.resourceConfig.SPARK_EXECUTOR_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.SPARK_EXECUTOR_CPUS/1000}-${this.params.resourceConfig.SPARK_EXECUTOR_MEMORY / (1024*1024*1024)}`
            };
            this.$nextTick(()=> {
                this.dataReady = true;
            });
        },
        cpuDriver(val) {
            this.params.resourceConfig = { 
                'SPARK_DRIVER_CPUS': val.cpu *1000,
                'SPARK_EXECUTOR_INSTANCES': this.params.resourceConfig.SPARK_EXECUTOR_INSTANCES,
                'SPARK_EXECUTOR_CPUS': this.params.resourceConfig.SPARK_EXECUTOR_CPUS,
                'SPARK_DRIVER_MEMORY': val.memory * 1024* 1024*1024,
                'SPARK_EXECUTOR_MEMORY': this.params.resourceConfig.SPARK_EXECUTOR_MEMORY,
            };
        },
        cpuExecute(val) {
            this.params.resourceConfig = { 
                'SPARK_DRIVER_CPUS': this.params.resourceConfig.SPARK_DRIVER_CPUS,
                'SPARK_EXECUTOR_INSTANCES': this.params.resourceConfig.SPARK_EXECUTOR_INSTANCES,
                'SPARK_EXECUTOR_CPUS': val.cpu *1000,
                'SPARK_DRIVER_MEMORY': this.params.resourceConfig.SPARK_DRIVER_MEMORY,
                'SPARK_EXECUTOR_MEMORY': val.memory * 1024* 1024*1024,
            };
        },
        'params.imageId'() {
            this.$refs.spark.clearValidate('resourceConfig');
        }
    }
};
</script>

