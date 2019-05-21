<template>
    <BaseForm
        :title="'新建Tensorflow自动并行任务'"
        class="form-tfsingleform"
        :label-width="160"
        icon="sdx-icon-tensorboard"
    >
        <el-form
            label-position="right"
            label-width="160px"
            slot="form"
            @submit.native.prevent
            ref="user"
        >
            <el-form-item
                prop="name"
                label="任务名称:"
            >
                <SdxuInput
                    
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
                <div>
                    <div class="title">
                        主节点CPU/内存
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择主节点CPU/内存"
                    />
                </div>
                <div>
                    <div class="title">
                        参数服务器CPU/内存
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择参数服务器CPU/内存"
                    />
                </div>
                <div>
                    <div class="title">
                        计算节点CPU/内存
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择计算节点CPU/内存"
                    />
                </div>
                <div>
                    <div class="title">
                        计算节点GPU
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择计算节点GPU"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="name"
                label="参数服务器实例个数:"
            >
                <el-input-number
                  
                   
                    label="描述文字"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="计算节点实例个数:"
            >
                <el-input-number
                    label="描述文字"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="源代码:"
            >
                <SdxwFileSelect />
            </el-form-item>
            <el-form-item
                prop="name"
                label="启动参数:"
            >
                <SdxuInput
                    
                    :searchable="true"
                    size="small"
                    placeholder="请输入启动参数"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="训练输出目录:"
            >
                <SdxwFileSelect
                    source="folder"
                    value=""
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
    },
    props: {
        
    },
    data() {
        return {
        
        };
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
     

    },

    watch: {
       
    }
};
</script>

<style lang="scss" scoped>
    .form-tfsingleform {
        .title {
            color: #909399;
        }
    }
</style>
