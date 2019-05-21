<template>
    <BaseForm
        :title="'新建TensorBoard任务'"
        class="form-jupyter"
        :label-width="80"
        icon="sdx-icon-tensorflow"
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
                <el-select
                    :searchable="true"
                    size="small"
                    placeholder="请选择资源配置"
                />
            </el-form-item>
            <el-form-item
                prop="name"
                label="日志目录:"
            >
                <SdxwFileSelect
                    v-model="file"
                    check-type="folder"
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
    name: 'TensorboardForm',
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
            file: []
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
    .form-jupyter {
     
    }
</style>
