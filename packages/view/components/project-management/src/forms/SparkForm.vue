<template>
    <BaseForm
        :title="`${params.uuid ? '编辑':'新建'}Spark任务`"
        class="form-spark"
        :label-width="120"
        icon="sdx-Apache_Spark_logo"
        @commit="commit"
    >
        <el-form
            label-position="right"
            label-width="120px"
            slot="form"
            @submit.native.prevent
            ref="spark"
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
                    size="small"
                    placeholder="请输入任务描述"
                    v-model="params.description"
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
                    v-model="cpuDriver"
                    type="cpu"
                    cpulabel="驱动器CPU/内存"
                />
                <ResourceConfig
                    v-model="cpuExecute"
                    type="cpu"
                    cpulabel="执行器CPU/内存"
                />
            </el-form-item>
            <el-form-item
                prop="instances.SPARK_EXECUTOR_INSTANCES"
                label="执行器实例数:"
            >
                <el-input-number
                    v-model="params.instances.SPARK_EXECUTOR_INSTANCES"
                    :min="1"
                    :max="InputNumberMax"
                />
            </el-form-item>
            <el-form-item
                prop="sourcePaths"
                label="源代码:"
            >
                <SdxwFileSelect
                    v-model="params.sourcePaths"
                    :accept="'.jar'"
                />
            </el-form-item>
            <el-form-item
                prop="mainClass"
                label="主类名称:"
            >
                <SdxuInput
                    v-model="params.mainClass"
                    :searchable="true"
                    size="small"
                    placeholder="请输入主类名称"
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
import {Form, FormItem, Select,InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';
import { getImageList } from '@sdx/utils/src/api/image';
import ResourceConfig from './ResourceConfig';
import { createTask,updateTask} from '@sdx/utils/src/api/project';
import { cNameValidate } from '@sdx/utils/src/validate/validate';
export default {
    name: 'SparkForm',
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        [InputNumber.name]: InputNumber,
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
            if(value.SPARK_DRIVER_CPUS === 0) {
                callback(new Error('需要配置驱动器CPU/内存'));
            }else  if (value.SPARK_EXECUTOR_CPUS === 0) {
                callback(new Error('需要配置执行器CPU/内存'));
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
                instances: {
                    'SPARK_EXECUTOR_INSTANCES': 1,
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
                'instances.SPARK_EXECUTOR_INSTANCES': [
                    { required: true, message: '请输入实例个数',trigger: 'change' }
                ],
                mainClass: [
                    { required: true, message: '请输入主类名称', trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                ]
            }
        };
    },
    computed: {
       
    },
    created() {
        this.imageList();
    },
    methods: {
        imageList() {
            const params = {
                imageType: 'SPARK',
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
            this.params = { ...this.params, ...nval };
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
        },
        cpuDriver(val) {
            this.params.resourceConfig = { 
                'SPARK_DRIVER_CPUS': val.cpu *1000,
                'SPARK_EXECUTOR_INSTANCES': this.params.instances.SPARK_EXECUTOR_INSTANCES,
                'SPARK_EXECUTOR_CPUS': this.params.resourceConfig.SPARK_EXECUTOR_CPUS,
                'SPARK_DRIVER_MEMORY': val.memory * 1024* 1024*1024,
                'SPARK_EXECUTOR_MEMORY': this.params.resourceConfig.SPARK_EXECUTOR_MEMORY,
            };
        },
        cpuExecute(val) {
            this.params.resourceConfig = { 
                'SPARK_DRIVER_CPUS': this.params.resourceConfig.SPARK_DRIVER_CPUS,
                'SPARK_EXECUTOR_INSTANCES': this.params.instances.SPARK_EXECUTOR_INSTANCES,
                'SPARK_EXECUTOR_CPUS': val.cpu *1000,
                'SPARK_DRIVER_MEMORY': this.params.resourceConfig.SPARK_DRIVER_MEMORY,
                'SPARK_EXECUTOR_MEMORY': val.memory * 1024* 1024*1024,
            };
        }
    }
};
</script>

<style lang="scss" scoped>
    .form-spark {
        .title {
            color: #909399;
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
