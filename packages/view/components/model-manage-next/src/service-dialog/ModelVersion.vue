<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        class="sdxv-model-version"
        :title="isEdit ? t('view.model.editVersion'): t('view.model.Create_a_new_version')"
    >
        <el-form
            ref="form"
            :model="params"
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                :label="t('view.model.createModelForm.name')"
                prop="name"
            >
                <sdxu-input
                    v-model="params.name"
                    :disabled="true"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.modelVersion')}`"
                prop="version"
            >
                <sdxu-input
                    v-model="params.version"
                    :disabled="true"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.versionDesription')}`"
            >
                <sdxu-input
                    v-model="params.description"
                    type="textarea"
                    :placeholder="t('view.model.enterDescription')"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.modelFile')}`"
                prop="modelPath"
            >
                <SdxwFileSelect
                    check-type="folder"
                    :string-model="true"
                    v-model="params.modelPath"
                />
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
import locale from '@sdx/utils/src/mixins/locale';
import SdxuDialog from '@sdx/ui/components/dialog';
import { Form, FormItem}  from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';
import FileSelect from '@sdx/widget/components/file-select';
import { descValidator } from '@sdx/utils/src/helper/validate';
import { createVersion, updateVersion} from '@sdx/utils/src/api/model';
import Message from 'element-ui/lib/message';
export default {
    name: 'SdxvModelVersion',
    mixins: [locale],
    data() {
        return {
            params: {
                name: '',
                version: '',
                description: '',
                modelPath: ''
            },
            rules: {
                name: [
                    { required: true},
                ],
                version: [
                    { required: true},
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ],
                modelPath: [
                    { required: true, message: this.t('view.model.enterModelFile'), trigger: 'blur' }
                ],
            },
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: null
        }
    },
    components: {
        SdxuDialog,
        SdxuButton,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        }
    },
    methods: {
        cancel() {
            this.$emit('update:visible', false);
        },
        confirm() {
            this.$refs.form.validate((valid) => {
                let params = {
                    description: this.params.description,
                    modelPath: this.params.modelPath
                };
                if(valid) {
                    if(this.isEdit) {
                        updateVersion(this.info.modelId, this.info.versionId, params).then(() => {
                            Message({
                                message: this.t('sdxCommon.UpdateSuccess'),
                                type: 'success'
                            });
                            this.$emit('update:visible', false);
                            this.$emit('confirm');
                        });
                    } else {
                        createVersion(this.info.modelId, params).then(() => {
                            Message({
                                message: this.t('sdxCommon.CreateSuccess'),
                                type: 'success'
                            });
                            this.$emit('update:visible', false);
                            this.$emit('confirm');
                        });
                    }
                }
            });
        }
    },
    created() {
        if(this.isEdit) {
            this.params = Object.assign(this.info);
        } else {
            this.params = Object.assign({}, {
                name: this.info.name,
                version: `V${this.info.latestV + 1}`,
                modelPath: ''
            });
        }
    }
};
</script>
