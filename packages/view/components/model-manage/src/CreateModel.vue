<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-model"
        :title="title"
    >
        <el-form
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :model="modelInfoForm"
            ref="modelInfoForm"
            :rules="modelInfoFormRule"
        >
            <el-form-item
                :label="t('view.model.createModelForm.name')"
                prop="name"
            >
                <sdxu-input
                    v-model="modelInfoForm.name"
                    :placeholder="t('view.model.searchModelName')"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.model.createModelForm.description')"
                prop="description"
            >
                <sdxu-input
                    v-model="modelInfoForm.description"
                    type="textarea"
                    :placeholder="t('view.model.modelDescription')"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.model.createModelForm.label')"
                prop="labels"
            >
                <el-select
                    v-model="modelInfoForm.labels"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    :placeholder="t('view.model.selectLabel')"
                    :multiple-limit="2"
                >
                    <el-option
                        v-for="item in labelOptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.label"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <div
            slot="footer"
        >
            <SdxuButton
                type="default"
                size="small"
                @click="cancel"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                {{ t('sdxCommon.Confirm') }}
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import Message from 'element-ui/lib/message';
import ElSelect from 'element-ui/lib/select';
import { getLabels, createModel, updateModel } from '@sdx/utils/src/api/model';
import { nameWithChineseValidator, descValidator, tagArrayValidator } from '@sdx/utils/src/helper/validate';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'CreateModel',
    data() {
        return {
            dialogVisible: this.visible,
            title: this.t('view.model.createModel'),
            labelOptions: [],
            modelInfoForm: {
                name: '',
                description: '',
                labels: []
            },
            modelInfoFormRule: {
                name: [
                    { required: true, message: this.t('view.model.searchModelName'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ],
                labels: [
                    { required: true, message: this.t('view.model.selectLabel'), trigger: 'change' },
                    { validator: tagArrayValidator, trigger: 'change' }
                ]
            },
            needRefresh: false
        };
    },
    mixins: [locale],
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        editingModel: {
            type: Object,
            default: null
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Input.name]: Input,
        ElForm,
        ElFormItem,
        ElSelect
    },
    created() {
        getLabels().then(res => {
            this.labelOptions = res.items;
        });
        if (this.editingModel) {
            this.title = this.t('view.model.editModel');
            Object.assign(this.modelInfoForm, this.editingModel);
        }
    },
    methods: {
        dialogClose() {
            this.modelInfoForm = {
                name: '',
                description: '',
                labels: []
            };
            this.$refs.modelInfoForm.clearValidate();
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.modelInfoForm.validate(valid => {
                if (!valid) {
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    if (this.editingModel) {
                        updateModel(this.editingModel.uuid, this.modelInfoForm).then(() => {
                            Message({
                                message: this.t('sdxCommon.UpdateSuccess'),
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        createModel(this.modelInfoForm).then(() => {
                            Message({
                                message: this.t('sdxCommon.CreateSuccess'),
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    }
                }
            });
        }
    }
};
</script>
