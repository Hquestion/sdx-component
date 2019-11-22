<template>
    <div class="sdxv-request-form">
        <el-form
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :model="requestForm"
            ref="requestForm"
            :rules="requestFormRule"
        >
            <el-form-item
                prop="type"
                :label="`请求类型:`"
            >
                <el-select
                    v-model="requestForm.type"
                    size="small"
                    :placeholder="`请选择请求类型`"
                >
                    <el-option
                        v-for="item in types"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                :label="`请求示例:`"
            >
                <SdxuInput
                    v-model="requestForm.example"
                    size="small"
                    type="textarea"
                    :rows="7"
                    :placeholder="`请输入请求示例`"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import ElSelect from 'element-ui/lib/select';
import Input from '@sdx/ui/components/input';
export default {
    name: 'RequestForm',
    data() {
        return {
            requestForm: {
                type: '',
                example: ''
            },
            types: ['CRUL请求示例', 'Python请求示例', 'JAVA请求示例'],
            requestFormRule: {
                type: [
                    { required: true, message: '请选择请求类型', trigger: 'change'}
                ]
            },
        };
    },
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        validate() {
            this.$refs.requestForm.validate(valid => {
                return valid;
            });
        }
    },
    components: {
        [Input.name]: Input,
        ElForm,
        ElFormItem,
        ElSelect,
    },
    watch: {
        data(nVal) {
            this.requestForm = nVal;
        }
    }
};
</script>
