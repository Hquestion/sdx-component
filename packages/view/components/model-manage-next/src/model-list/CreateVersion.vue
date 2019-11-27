<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-version"
        :title="title"
    >
        <div class="sdxv-create-version__form">
            <el-form
                :label-width="lang$==='en' ? '150px' : '110px'"
                label-position="right"
                :model="versionInfoForm"
                ref="versionInfoForm"
                :rules="versionInfoFormRule"
            >
                <el-form-item
                    :label="t('view.model.createModelForm.name')"
                    prop="name"
                    v-if="!modelId"
                >
                    <el-select
                        v-model="versionInfoForm.name"
                        :placeholder="t('view.model.selectModel')"
                        @change="modelSelected"
                    >
                        <el-option
                            v-for="item in modelOptions"
                            :key="item.uuid"
                            :label="item.name"
                            :value="item.uuid"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="`${t('view.model.modelVersion')}`"
                    v-if="(modelId && !editingVersion) || (!modelId && versionInfoForm.version)"
                >
                    <div class="sdxv-create-version__version">
                        {{ versionInfoForm.version }}
                    </div>
                </el-form-item>
                <el-form-item
                    :label="`${t('view.model.versionDesription')}`"
                    v-if="!editingVersion"
                >
                    <sdxu-input
                        v-model="versionInfoForm.versionDescription"
                        type="textarea"
                        :placeholder="t('view.model.enterDescription')"
                        :rows="3"
                    />
                </el-form-item>
                <el-form-item
                    :label="`${t('view.model.modelFile')}`"
                    v-if="!editingVersion"
                    prop="modelPath"
                >
                    <SdxwFileSelect
                        check-type="file"
                        string-model
                        v-model="versionInfoForm.modelPath"
                    />
                </el-form-item>
            </el-form>
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
import ElSelect from 'element-ui/lib/select';
import { createVersion, getModelList, getModelInfo } from '@sdx/utils/src/api/model';
import { nameWithChineseValidator, descValidator } from '@sdx/utils/src/helper/validate';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'CreateVersion',
    data() {
        return {
            dialogVisible: this.visible,
            title: '',
            versionInfoForm: {
                name: '',
                version: '',
                description: '',
                modelPath: ''
            },
            modelOptions: [],
            versionInfoFormRule: {
                name: [
                    { required: true, message: this.t('view.model.searchModelName'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                modelPath: [
                    { required: true, message: this.t('view.model.enterModelFile'), trigger: 'blur' }
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
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
        editingVersion: {
            type: Object,
            default: null
        },
        modelId: {
            type: String,
            default: ''
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
        this.title = !this.modelId ? this.t('view.model.addExistingVersion') : (this.editingVersion ? this.t('view.model.editVersion') : this.t('view.model.createVersion'));
        if (!this.modelId) this.getModelOptions();
        if (this.editingVersion) {
            this.title = this.t('view.model.editModel');
            Object.assign(this.versionInfoForm, this.editingVersion);
        }
    },
    methods: {
        modelSelected(modelId) {
            getModelInfo(modelId).then(res => {
                const latest = res.versions.latest || 'v0';
                this.versionInfoForm.version = `v${parseInt(latest.slice(1))+1}`;
            });
        },
        getModelOptions() {
            const params = {
                start: 1,
                count: 30
            };
            getModelList(params).then((res) => {
                this.modelOptions = res.items;
            });
        },
        dialogClose() {
            this.versionInfoForm = {
                name: '',
                description: ''
            };
            this.$refs.versionInfoForm.clearValidate();
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.versionInfoForm.validate(valid => {
                if (!valid) {
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    if (this.editingVersion) {

                    } else {
                        createVersion(this.modelId || this.versionInfoForm.name, this.versionInfoForm).then(() => {
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
