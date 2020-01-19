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
                <SdxuCodepan
                    style="height: 200px;"
                    ref="successCodepan"
                    v-model="responseForm.successExample"
                    light
                    type="javascript"
                    :placeholder="t('view.model.enterSuccessExample')"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.failExample')}:`"
            >
                <SdxuCodepan
                    style="height: 200px;"
                    ref="failCodepan"
                    v-model="responseForm.failExample"
                    type="javascript"
                    light
                    :placeholder="t('view.model.enterFailExample')"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import locale from '@sdx/utils/src/mixins/locale';
import Codepan from '@sdx/ui/components/codepan';
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
    methods: {
        refresh() {
            this.$refs.successCodepan.refresh();
            this.$refs.failCodepan.refresh();
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
        [Codepan.name]: Codepan,
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
