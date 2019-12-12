<template>
    <div class="sdxv-dataset-edit">
        <SdxuDialog
            :visible.sync="dialogVisible"
            title="编辑数据集"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        >
            <el-form
                :model="formData"
                :rules="rules"
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
                        :placeholder="t('view.dataManagement.PleaseSelectOrInput')"
                    >
                        <el-option
                            v-for="(item, i) in labelList"
                            :key="i"
                            :label="item.name"
                            :value="item.name"
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
        </SdxuDialog>
    </div>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuInput from '@sdx/ui/components/input';
import SdxuUploadImage from '@sdx/ui/components/upload-image';
import locale from '@sdx/utils/src/mixins/locale';

import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';

export default {
    name: 'SdxvDatasetEdit',
    mixins: [locale],
    components: {
        SdxuInput,
        SdxuDialog,
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
                name: this.dataset.name,
                description: this.dataset.description,
                labels: this.dataset.labels,
                coverImg: this.dataset.coverImg
            },
            // todo:
            rules: []
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
            // todo:
        },
        handleCancel() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style>

</style>
