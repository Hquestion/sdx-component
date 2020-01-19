<template>
    <div class="sdxv-dataset-creation">
        <div class="sdxv-dataset-creation__title">
            {{ t('view.dataManagement.CreateDataset') }}
        </div>
        <div class="sdxv-dataset-creation__container">
            <div class="sdxv-dataset-creation__container--content">
                <el-form
                    :model="formData"
                    :label-width="labelWidth"
                    ref="form"
                    :rules="rules"
                >
                    <SdxuArticlePanel :title="t('view.dataManagement.BasicSetting')">
                        <el-form-item
                            prop="name"
                            :label="t('view.dataManagement.DatasetName') + '：'"
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
                            prop="coverUpPath"
                            :label="t('view.dataManagement.CoverImage') + '：'"
                        >
                            <SdxuUploadImage :image.sync="formData.coverUpPath" />
                        </el-form-item>
                    </SdxuArticlePanel>
                    <SdxuArticlePanel :title="t('view.dataManagement.DataSourceSetting')">
                        <el-form-item
                            prop="sourcePaths"
                            :label="t('view.dataManagement.SelectFile') + '：'"
                        >
                            <SdxwFileSelect
                                v-model="formData.sourcePaths"
                                :string-model="true"
                                check-type="all"
                                source="all"
                                :limit="-1"
                            />
                        </el-form-item>
                        <el-form-item :label="t('view.dataManagement.FileType') + '：'">
                            <div class="sdxv-dataset-creation__container--show-bar">
                                <span>{{ fileType }}</span>
                            </div>
                        </el-form-item>
                    </SdxuArticlePanel>
                    <SdxuArticlePanel :title="t('view.dataManagement.DataSave')">
                        <el-form-item :label="t('view.dataManagement.SaveDirectory') + '：'">
                            <div class="sdxv-dataset-creation__container--show-bar">
                                <span>/.datasets</span>
                            </div>
                        </el-form-item>
                        <SdxwShareForm :label-width="labelWidth" />
                    </SdxuArticlePanel>
                    <SdxuArticlePanel
                        :title="t('view.dataManagement.AdvancedSetting')"
                        expandable
                        :expanded.sync="expanded"
                    >
                        <el-form-item
                            v-if="expanded"
                            :label="t('view.dataManagement.DetailedDescription') + '：'"
                        >
                            <SdxuInput
                                v-model="formData.advancedConfig"
                                type="textarea"
                                :placeholder="t('view.dataManagement.DetailedDescPlaceholder')"
                                :rows="5"
                            />
                        </el-form-item>
                    </SdxuArticlePanel>
                </el-form>
                <div
                    class="sdxv-dataset-creation__container-button"
                    :style="{ 'margin-left': buttonMarginLeft }"
                >
                    <SdxuButton
                        type="default"
                        @click="handleCancel"
                    >
                        {{ t('sdxCommon.Cancel') }}
                    </SdxuButton>
                    <SdxuButton @click="handleConfirm">
                        {{ t('sdxCommon.Confirm') }}
                    </SdxuButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import FileSelect from '@sdx/widget/components/file-select';
import SdxwShareForm from '@sdx/widget/components/share-form';
import SdxuArticlePanel from '@sdx/ui/components/article-panel';
import SdxuUploadImage from '@sdx/ui/components/upload-image';
import locale from '@sdx/utils/src/mixins/locale';
import { getLabels, createDataset } from '@sdx/utils/src/api/dataset';
import { nameWithChineseValidator, tagArrayValidator, descValidator } from '@sdx/utils/src/helper/validate';
import { DATA_FORMAT_MAP, DATA_FORMAT } from './config';

import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';

export default {
    name: 'SdxvDatasetCreation',
    mixins: [locale],
    components: {
        SdxuInput,
        SdxwShareForm,
        SdxuButton,
        SdxuArticlePanel,
        ElSelect,
        ElOption,
        ElForm,
        ElFormItem,
        SdxuUploadImage,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
    },
    data() {
        return {
            formData: {
                name: '',
                description: '',
                labels: [],
                users: [],
                groups: [],
                isPublic: false,
                sourcePaths: [],
                coverUpPath: '',
                dataFormat: '',
                advancedConfig: '',
            },
            rules: {
                name: [
                    { required: true, message: this.t('view.dataManagement.DatasetNameNotBeNull'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                sourcePaths: [
                    { required: true, message: this.t('view.dataManagement.FileRequired'), trigger: 'blur' }
                ],
                labels: [
                    { validator: tagArrayValidator, trigger: 'change' }
                ],
                description: [
                    { validator: descValidator, trigger: 'blur' }
                ]
            },
            labelList: [],
            enLabelWidth: 160,
            zhLabelWidth: 110,
            expanded: false,
            labelValidateMsg: ''
        };
    },
    computed: {
        labelWidth() {
            return (this.lang$ === 'en' ? this.enLabelWidth : this.zhLabelWidth) + 'px';
        },
        buttonMarginLeft() {
            return (this.lang$ === 'en' ? this.enLabelWidth : this.zhLabelWidth) + 16 + 'px';
        },
        fileType() {
            let type = '';
            if (this.formData.sourcePaths.length > 1) {
                type = DATA_FORMAT.Other;
            } else if (this.formData.sourcePaths.length === 1) {
                // 
                let name = this.formData.sourcePaths[0];
                let index = name.lastIndexOf('.');
                let suffix = index === 0 || index === -1 ? '' : name.slice(index + 1).toLowerCase();
                if (suffix === '') {
                    type = DATA_FORMAT.Other;
                } else if (DATA_FORMAT_MAP.CSV.includes(suffix)) {
                    type = DATA_FORMAT.CSV;
                } else if (DATA_FORMAT_MAP.JPEG.includes(suffix)) {
                    type = DATA_FORMAT.JPEG;
                } else if (DATA_FORMAT_MAP.Text.includes(suffix)) {
                    type = DATA_FORMAT.Text;
                }
            }
            return type;
        }
    },
    methods: {
        handleCancel() {
            this.$router.go(-1);
        },
        handleConfirm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    createDataset(this.formData)
                        .then(() => {
                            this.$router.go(-1);
                        });
                } else {
                    return false;
                }
            });
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
