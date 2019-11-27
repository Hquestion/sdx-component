<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-model"
        :title="title"
        size="large"
    >
        <div class="sdxv-create-model__form">
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
                    :label="`${t('view.model.modelType')}`"
                    prop="modelType"
                >
                    <sdxu-select
                        v-model="modelInfoForm.modelType"
                        filterable
                        allow-create
                        :show-icon="true"
                        :placeholder="t('view.model.enterOrSelectModelType')"
                    >
                        <sdxu-option
                            v-for="item in modelTypes"
                            :key="item.icon"
                            :label="item.name"
                            :svg-icon="item.icon"
                            :value="item.name"
                        />
                    </sdxu-select>
                </el-form-item>
                <el-form-item
                    :label="t('view.model.createModelForm.label')"
                    prop="labels"
                >
                    <sdxu-select
                        v-model="modelInfoForm.labels"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        :placeholder="t('view.model.selectLabel')"
                        :multiple-limit="2"
                    >
                        <sdxu-option
                            v-for="item in labelOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label"
                        />
                    </sdxu-select>
                </el-form-item>
                <el-form-item
                    :label="`${t('view.model.modelVersion')}`"
                    v-if="!editingModel"
                >
                    <div class="sdxv-create-model__version">
                        V 1.0
                    </div>
                </el-form-item>
                <el-form-item
                    :label="`${t('view.model.versionDesription')}`"
                    v-if="!editingModel"
                >
                    <sdxu-input
                        v-model="modelInfoForm.versionDescription"
                        type="textarea"
                        :placeholder="t('view.model.enterDescription')"
                        :rows="3"
                    />
                </el-form-item>
                <el-form-item
                    :label="`${t('view.model.modelFile')}`"
                    v-if="!editingModel"
                    prop="modelPath"
                >
                    <SdxwFileSelect
                        check-type="file"
                        string-model
                        v-model="modelInfoForm.modelPath"
                    />
                </el-form-item>
            </el-form>
            <SdxwShareForm
                v-if="!editingModel"
                :default-users.sync="modelInfoForm.users"
                :default-groups.sync="modelInfoForm.groups"
                :default-share-type.sync="modelInfoForm.shareType"
            />
        </div>


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
import ShareForm from '@sdx/widget/components/share-form';
import Select from '@sdx/ui/components/select';
import { getLabels, getModelTypes, createModel, updateModel, createVersion } from '@sdx/utils/src/api/model';
import { nameWithChineseValidator, descValidator, tagArrayValidator } from '@sdx/utils/src/helper/validate';
import locale from '@sdx/utils/src/mixins/locale';
import FileSelect from '@sdx/widget/lib/file-select';
import { MODEL_TYPES_ICON, DEFAULT_MODEL_TYPE_ICON, getLabelByName } from '@sdx/utils/src/const/model';

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
                labels: [],
                modelPath: '',
                modelType: '',
                users: [],
                groups: [],
                shareType: 'PRIVATE',
                isPublic: false,
                versionDescription: ''
            },
            modelInfoFormRule: {
                name: [
                    { required: true, message: this.t('view.model.searchModelName'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                modelType: [
                    { required: true, message: this.t('view.model.enterOrSelectModelType'), trigger: 'change' }
                ],
                modelPath: [
                    { required: true, message: this.t('view.model.enterModelFile'), trigger: 'blur' }
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
            needRefresh: false,
            modelTypes: []
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
        [ShareForm.name]: ShareForm,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        [Select.Option.name]: Select.Option,
        [Select.Select.name]: Select.Select,
        ElForm,
        ElFormItem
    },
    created() {
        getLabels().then(res => {
            this.labelOptions = res.items;
        });
        getModelTypes().then(res => {
            res.items.forEach(item => {
                let icon = MODEL_TYPES_ICON.find(icon => icon.name === item);
                this.modelTypes.push({
                    name: this.t(getLabelByName(item)),
                    icon: icon ? icon.icon : DEFAULT_MODEL_TYPE_ICON
                });
            });
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
                        if (this.modelInfoForm.shareType === 'PUBLIC') {
                            this.modelInfoForm.users = [];
                            this.modelInfoForm.groups = [];
                            this.modelInfoForm.isPublic = true;
                        }
                        createModel(this.modelInfoForm).then((res) => {
                            const params = {
                                description: this.modelInfoForm.versionDescription,
                                modelPath: this.modelInfoForm.modelPath
                            };
                            createVersion(res.uuid, params).then(() => {
                                Message({
                                    message: this.t('sdxCommon.CreateSuccess'),
                                    type: 'success'
                                });
                                this.needRefresh = true;
                                this.dialogVisible = false;
                            });
                        });
                    }
                }
            });
        }
    }
};
</script>
