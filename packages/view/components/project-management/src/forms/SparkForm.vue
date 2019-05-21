<template>
    <BaseForm
        :title="'新建Spark任务'"
        class="form-spark"
        :label-width="120"
        icon="sdx-Apache_Spark_logo"
    >
        <el-form
            label-position="right"
            label-width="120px"
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
                        驱动器CPU/内存
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择驱动器CPU/内存"
                    />
                </div>
                <div>
                    <div class="title">
                        执行器CPU/内存
                    </div>
                    <el-select
                        :searchable="true"
                        size="small"
                        placeholder="请选择执行器CPU/内存"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="name"
                label="执行器实例数:"
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
                label="主类名称:"
            >
                <SdxuInput
                    
                    :searchable="true"
                    size="small"
                    placeholder="请输入主类名称"
                />
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
import {Form, FormItem, Select,InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';
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
    .form-spark {
        .title {
            color: #909399;
        }
    }
</style>
