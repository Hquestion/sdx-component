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
                :label="`${t('view.model.paramName')}:`"
                prop="name"
            >
                <SdxuInput
                    v-model="paramForm.name"
                    size="small"
                    :placeholder="t('view.model.enterParamName')"
                />
            </el-form-item>
            <el-form-item
                prop="dtype"
                :label="`${t('view.model.paramType')}:`"
            >
                <el-select
                    v-model="paramForm.dtype"
                    size="small"
                    :placeholder="t('view.model.selectParamType')"
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
                :label="`${t('view.model.paramRange')}:`"
            >
                <div style="display: flex; justify-content: space-between;">
                    <SdxuInput
                        v-model="paramForm.begin"
                        style="width:150px;"
                        :placeholder="t('view.model.beginVal')"
                    />
                    <span>-</span>
                    <SdxuInput
                        v-model="paramForm.end"
                        style="width:150px;"
                        :placeholder="t('view.model.endVal')"
                    />
                </div>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.defaultVal')}:`"
            >
                <SdxuInput
                    v-model="paramForm.default"
                    size="small"
                    :placeholder="t('view.model.enterDefaultVal')"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.paramDesc')}:`"
            >
                <SdxuInput
                    v-model="paramForm.description"
                    size="small"
                    type="textarea"
                    :rows="3"
                    :placeholder="t('view.model.enterParamsDesc')"
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
import Input from '@sdx/ui/components/input';
export default {
    name: 'ParamForm',
    data() {
        return {
            paramForm: this.data,
            types: [
                {
                    name: this.t('view.model.number'),
                    value: 'NUMBER'
                },
                {
                    name: this.t('view.model.string'),
                    value: 'STRING'
                },
                {
                    name: this.t('view.model.bool'),
                    value: 'BOOLEAN'
                }
            ],
            paramFormRule: {
                name: [
                    { required: true, message: this.t('view.model.enterParamName'), trigger: 'blur' }
                ],
                dtype: [
                    { required: true, message: this.t('view.model.selectParamType'), trigger: 'change'}
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
            return this.$refs.paramForm.validate();
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
        },
        paramForm: {
            deep: true,
            handler(nVal) {
                this.$emit('update:data', nVal);
            }
        }
    }
};
</script>

<style scoped lang="scss">
</style>
