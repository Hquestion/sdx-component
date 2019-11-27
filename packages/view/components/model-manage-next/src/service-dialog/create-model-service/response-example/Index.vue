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
                :label="`${t('view.model.successExample')}:`"
            >
                <SdxuInput
                    v-model="responseForm.successExample"
                    size="small"
                    type="textarea"
                    :rows="7"
                    :placeholder="t('view.model.enterSuccessExample')"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.failExample')}:`"
            >
                <SdxuInput
                    v-model="responseForm.failExample"
                    size="small"
                    type="textarea"
                    :rows="7"
                    :placeholder="t('view.model.enterFailExample')"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import Input from '@sdx/ui/components/input';
import locale from '@sdx/utils/src/mixins/locale';
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
    mixins: [locale],
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
