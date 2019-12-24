<template>
    <SdxuDialog
        class="sdxv-dataset-edit-dialog"
        :visible.sync="dialogVisible"
        :title="t('view.dataManagement.EditDataset')"
    >
        <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            :label-width="lang$ === 'en' ? '160px' : '110px'"
        >
            <el-form-item
                prop="name"
                :label="t('view.dataManagement.DatasetName') + '：'"
                required
            >
                <SdxuInput
                    v-model="formData.name"
                    :placeholder="t('view.dataManagement.DatasetNamePlaceholder')"
                />
            </el-form-item>
            <el-form-item
                prop="description"
                :label="t('view.dataManagement.DatasetDescription') + '：'"
            >
                <SdxuInput
                    v-model="formData.description"
                    type="textarea"
                    :placeholder="t('view.dataManagement.DatasetDescPlaceholder')"
                    :rows="5"
                />
            </el-form-item>
            <el-form-item
                prop="labels"
                :label="t('view.dataManagement.DatasetLabel') + '：'"
            >
                <el-select
                    v-model="formData.labels"
                    multiple
                    filterable
                    allow-create
                    :multiple-limit="2"
                    :placeholder="t('view.dataManagement.PleaseSelectOrInput')"
                >
                    <el-option
                        v-for="(item, i) in labelList"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                prop="coverImg"
                :label="t('view.dataManagement.CoverImage') + '：'"
            >
                <SdxuUploadImage :image.sync="formData.coverImg" />
            </el-form-item>
        </el-form>
        <template #footer>
            <SdxuButton
                type="default"
                size="large"
                @click="handleCancel"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="large"
                @click="handleConfirm"
            >
                {{ t('sdxCommon.Confirm') }}
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuInput from '@sdx/ui/components/input';
import SdxuUploadImage from '@sdx/ui/components/upload-image';
import SdxuButton from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';
import { nameWithChineseValidator } from '@sdx/utils/src/helper/validate';
import { updateDataset, getLabels } from '@sdx/utils/src/api/dataset';

import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';

export default {
    name: 'SdxvDatasetEditDialog',
    mixins: [locale],
    components: {
        SdxuInput,
        SdxuDialog,
        SdxuButton,
        SdxuUploadImage,
        ElForm,
        ElFormItem,
        ElSelect,
        ElOption,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        dataset: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            formData: {
                name: this.dataset.name || '',
                description: this.dataset.description || '',
                labels: this.dataset.labels || [],
                coverImg: this.dataset.coverImg || ''
            },
            rules: {
                name: [
                    { required: true, message: this.t('view.dataManagement.DatasetNameNotBeNull'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ]
            },
            labelList: []
        };
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
        handleConfirm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    updateDataset(this.dataset.uuid, this.formData)
                        .then(() => {
                            // todo: 验证刷新
                            this.$emit('refresh');
                        })
                        .finally(() => {
                            this.dialogVisible = false;
                        });
                } else {
                    return false;
                }
            });
        },
        handleCancel() {
            this.dialogVisible = false;
        },
        getLabelList() {
            getLabels()
                .then(data => {
                    this.labelList = data.items.map(item => ({
                        label: item.label,
                        value: item.label
                    }));
                })
                .catch(err => {
                    window.console.error(err);
                    this.labelList = [];
                });
        },
    },
    created() {
        this.getLabelList();
    }
};
</script>

<style>

</style>
