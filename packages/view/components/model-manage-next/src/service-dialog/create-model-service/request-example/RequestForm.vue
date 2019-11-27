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
                :label="`${t('view.model.requestType')}:`"
            >
                <el-select
                    v-model="requestForm.type"
                    size="small"
                    :placeholder="t('view.model.enterRequestType')"
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
                :label="`${t('view.model.requestExample')}:`"
            >
                <SdxuInput
                    v-model="requestForm.code"
                    size="small"
                    type="textarea"
                    :rows="7"
                    :placeholder="t('view.model.enterReqExample')"
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
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'RequestForm',
    data() {
        return {
            requestForm: {
                type: '',
                code: ''
            },
            types: [this.t('view.model.crukExample'), this.t('view.model.pythonExample'), this.t('view.model.javaExample')],
            requestFormRule: {
                type: [
                    { required: true, message: this.t('view.model.enterRequestType'), trigger: 'change'}
                ]
            },
        };
    },
    mixins: [locale],
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        validate() {
            return this.$refs.requestForm.validate();
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
