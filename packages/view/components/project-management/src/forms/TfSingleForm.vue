<template>
    <BaseForm
        :title="'新建Tensorflow单机版任务'"
        class="form-python"
        :label-width="80"
        icon="sdx-icon-tensorboard"
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
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import {Form, FormItem, Select} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';
export default {
    name: 'TfSingleForm',
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
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
    .form-python {
       
    }
</style>
