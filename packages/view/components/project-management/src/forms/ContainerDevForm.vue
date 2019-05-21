<template>
    <BaseForm
        :title="'新建ContainerDev任务'"
        class="form-containerdev"
        :label-width="80"
        icon="sdx-icon-docker"
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

export default {
    name: 'ContainerDevForm',
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
