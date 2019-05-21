<template>
    <BaseForm
        :title="'新建Jupyter任务'"
        class="form-jupyter"
        :label-width="80"
        icon="sdx-Jupter"
    >
        <el-form
            label-position="right"
            label-width="80px"
            slot="form"
            @submit.native.prevent
            ref="user"
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
                prop="name"
                label="任务描述:"
            >
                <SdxuInput
                    type="textarea"
                    :searchable="true"
                    size="small"
                    placeholder="请输入任务描述"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="运行环境:"
            >
                <el-select
                    type="textarea"
                    :searchable="true"
                    size="small"
                    placeholder="请输入任务描述"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="资源配置:"
            >
                <!-- <el-select
                    :searchable="true"
                    size="small"
                    placeholder="请选择资源配置"
                /> -->
                <div>
                    <div class="title">
                        CPU/内存
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择资源配置"
                    />
                </div>
                <div>
                    <div class="title">
                        GPU
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择资源配置"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="name"
                label="数据源:"
            >
                <el-select
                    :searchable="true"
                    size="small"
                    placeholder="请选择数据源"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="数据集:"
            >
                <el-select
                    :searchable="true"
                    size="small"
                    placeholder="请选择数据集"
                />
            </el-form-item>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import {Form, FormItem, Select} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
// import { getImageList } from '@sdx/utils/src/api/image';
export default {
    name: 'JupyterForm',
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        
    },
    props: {
        
    },
    data() {
        return {
            params: {
                projectId: '',
                name: '',
                description: '',
                type: '',
                imageId: '',
                resource: {
                    EXECUTOR_CPU_CORES: 0,
                    EXECUTOR_GPUS: 0,
                    EXECUTOR_MEMORY_GB: 0
                },
                gpu_model: '',
                datasources: []
            },
        };
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
        imageList() {
            const params = {
                imageType: 'JUPYTER',
                start: 1,
                count: -1
            };
            // getImageList(params)
            //     .then(data => {
                
            //     });
        }
    },

    watch: {
       
    }
};
</script>

<style lang="scss" scoped>
    .form-jupyter {
        .title {
            color: #909399;
        }
    }
</style>
