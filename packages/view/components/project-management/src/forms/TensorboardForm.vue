<template>
    <BaseForm
        :title="`${params.uuid ? '编辑':'新建'}TensorBoard任务`"
        class="form-tensorboard"
        :label-width="100"
        icon="sdx-icon-tensorflow"
        @commit="commit"
    >
        <el-form
            label-position="right"
            label-width="100px"
            slot="form"
            @submit.native.prevent
            ref="tensorboard"
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
                    placeholder="请选择运行环境"
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
                <SdxwResourceConfig
                    v-model="cpuObj"
                    type="onlycpu"
                />
            </el-form-item>
            <el-form-item
                prop="logPaths"
                label="日志目录:"
            >
                <SdxwFileSelect
                    v-model="params.logPaths"
                    check-type="folder"
                    :string-model="true"
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
import { nameWithChineseValidator } from '@sdx/utils/src/helper/validate';
export default {
    name: 'TensorboardForm',
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
                    { required: true, message: '请输入任务名称', trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
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
                logPaths: [
                    { required: true, message: '请选择日志目录', trigger: 'blur' }
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
                imageType: 'TENSORFLOW',
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
            this.params = { ...this.params, ...nval, ...{imageId:nval.image.uuid}};
            this.cpuObj = {
                cpu: this.params.resourceConfig.EXECUTOR_CPUS/1000,
                memory: this.params.resourceConfig.EXECUTOR_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.EXECUTOR_CPUS/1000}-${this.params.resourceConfig.EXECUTOR_MEMORY / (1024*1024*1024)}`
            };
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

<style lang="scss" scoped>
    .form-tensorboard {
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
