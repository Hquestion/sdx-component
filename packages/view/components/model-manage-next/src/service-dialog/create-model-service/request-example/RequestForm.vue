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
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.requestExample')}:`"
            >
                <SdxuCodepan
                    style="height: 200px;"
                    v-model="requestForm.code"
                    type="javascript"
                    light
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
import locale from '@sdx/utils/src/mixins/locale';
import Codepan from '@sdx/ui/components/codepan';
export default {
    name: 'RequestForm',
    data() {
        return {
            requestForm: this.data,
            types: [
                {
                    name: this.t('view.model.crukExample'),
                    value: 'curl'
                },
                {
                    name: this.t('view.model.pythonExample'),
                    value: 'python'
                },
                {
                    name: this.t('view.model.javaExample'),
                    value: 'java'
                }
            ],
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
        [Codepan.name]: Codepan,
        ElForm,
        ElFormItem,
        ElSelect,
    },
    watch: {
        data(nVal) {
            this.requestForm = nVal;
        },
        requestForm: {
            deep: true,
            handler(nVal) {
                this.$emit('update:data', nVal);
            }
        }
    }
};
</script>
