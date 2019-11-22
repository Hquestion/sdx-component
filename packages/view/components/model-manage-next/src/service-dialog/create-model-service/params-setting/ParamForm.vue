<template>
    <div class="sdxv-param-form">
        <el-form
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :model="paramForm"
            ref="paramForm"
            :rules="paramFormRule"
        >
            <el-form-item
                :label="`参数名:`"
                prop="name"
            >
                <SdxuInput
                    v-model="paramForm.name"
                    size="small"
                    :placeholder="`请输入参数名`"
                />
            </el-form-item>
            <el-form-item
                prop="type"
                :label="`参数类型:`"
            >
                <el-select
                    v-model="paramForm.type"
                    size="small"
                    :placeholder="`请选择参数类型`"
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
                :label="`参数范围:`"
            >
                <div style="display: flex; justify-content: space-between;">
                    <SdxuInput
                        v-model="paramForm.paramFrom"
                        style="width:150px;"
                        :placeholder="`开始值`"
                    />
                    <span>-</span>
                    <SdxuInput
                        v-model="paramForm.paramTo"
                        style="width:150px;"
                        :placeholder="`结束值`"
                    />
                </div>
            </el-form-item>
            <el-form-item
                :label="`默认值:`"
            >
                <SdxuInput
                    v-model="paramForm.default"
                    size="small"
                    :placeholder="`请输入默认值`"
                />
            </el-form-item>
            <el-form-item
                :label="`参数说明:`"
            >
                <SdxuInput
                    v-model="paramForm.description"
                    size="small"
                    type="textarea"
                    :rows="3"
                    :placeholder="`请输入参数说明`"
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
    name: 'ParamForm',
    data() {
        return {
            paramForm: this.data,
            types: ['数字', '字符串', '布尔值'],
            paramFormRule: {
                name: [
                    { required: true, message: '请输入参数名', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择参数类型', trigger: 'change'}
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
            this.$refs.paramForm.validate(valid => {
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
            this.paramForm = nVal;
        }
    }
};
</script>

<style scoped lang="scss">
</style>
