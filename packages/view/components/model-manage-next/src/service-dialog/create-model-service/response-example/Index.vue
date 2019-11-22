<template>
    <div class="sdxv-response-form">
        <el-form
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :model="responseForm"
            ref="responseForm"
            :rules="responseFormRule"
        >
            <el-form-item
                :label="`成功返回示例:`"
            >
                <SdxuInput
                    v-model="responseForm.successExample"
                    size="small"
                    type="textarea"
                    :rows="7"
                    :placeholder="`请输入成功返回示例`"
                />
            </el-form-item>
            <el-form-item
                :label="`失败返回示例:`"
            >
                <SdxuInput
                    v-model="responseForm.failExample"
                    size="small"
                    type="textarea"
                    :rows="7"
                    :placeholder="`请输入失败返回示例`"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import Input from '@sdx/ui/components/input';
export default {
    name: 'ResponseForm',
    data() {
        return {
            responseForm: {
                failExample: this.responseFail,
                successExample: this.responseSuccess
            },
            responseFormRule: {
            },
        };
    },
    props: {
        responseSuccess: {
            type: String,
            default: ''
        },
        responseFail: {
            type: String,
            default: ''
        }
    },
    watch: {
        responseSuccess(nVal) {
            this.responseForm.successExample = nVal;
        },
        responseFail(nVal) {
            this.responseForm.failExample = nVal;
        },
        responseForm: {
            'deep': true,
            handler(nVal) {
                this.$emit('update:responseSuccess', nVal && nVal.successExample);
                this.$emit('update:responseFail', nVal && nVal.failExample);
            }
        }
    },
    components: {
        [Input.name]: Input,
        ElForm,
        ElFormItem
    }
};
</script>

<style lang="scss" scoped>
.sdxv-response-form {
    padding-right: 20px;
}
</style>
