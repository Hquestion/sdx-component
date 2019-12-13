<template>
    <div class="sdxv-dataset-creation">
        <div class="sdxv-dataset-creation__title">
            {{ t('view.dataManagement.CreateDataset') }}
        </div>
        <div class="sdxv-dataset-creation__container">
            <div class="sdxv-dataset-creation__container--content">
                <SdxuArticlePanel :title="t('view.dataManagement.BasicSetting')">
                    <el-form
                        :model="formData"
                        :label-width="labelWidth"
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
                </SdxuArticlePanel>
                <SdxuArticlePanel :title="t('view.dataManagement.DataSourceSetting')">
                    <el-form
                        :model="formData"
                        :label-width="labelWidth"
                    >
                        <el-form-item
                            :label="t('view.dataManagement.SelectFile') + '：'"
                            required
                        >
                            <SdxwFileSelect
                                v-model="formData.sourcePaths"
                                :string-model="false"
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
                    </el-form>
                </SdxuArticlePanel>
                <SdxuArticlePanel :title="t('view.dataManagement.DataSave')">
                    <el-form :label-width="labelWidth">
                        <el-form-item :label="t('view.dataManagement.SaveDirectory') + '：'">
                            <div class="sdxv-dataset-creation__container--show-bar">
                                <span>/.datasets</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    <SdxwShareForm :label-width="labelWidth" />
                </SdxuArticlePanel>
                <SdxuArticlePanel
                    :title="t('view.dataManagement.AdvancedSetting')"
                    expandable
                    :expanded.sync="expanded"
                >
                    <el-form
                        v-if="expanded"
                        :label-width="labelWidth"
                    >
                        <el-form-item :label="t('view.dataManagement.DetailedDescription') + '：'">
                            <SdxuInput
                                v-model="formData.advancedConfig"
                                type="textarea"
                                :placeholder="t('view.dataManagement.DetailedDescPlaceholder')"
                                :rows="5"
                            />
                        </el-form-item>
                    </el-form>
                </SdxuArticlePanel>
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
                coverImg: '',
                dataFormat: '',
                advancedConfig: '',
            },
            // todo: 校验
            rules: [],
            // todo: 
            labelList: [],
            enLabelWidth: 160,
            zhLabelWidth: 110,
            expanded: false
        };
    },
    computed: {
        labelWidth() {
            return (this.lang$ === 'en' ? this.enLabelWidth : this.zhLabelWidth) + 'px';
        },
        buttonMarginLeft() {
            return (this.lang$ === 'en' ? this.enLabelWidth : this.zhLabelWidth) + 16 + 'px';
        },
        // todo: 
        fileType() {
            let type = '';
            if (this.formData.sourcePaths.length > 1) {
                type = 'other';
            } else if (this.formData.sourcePaths.length === 1) {
                // 
                let name = this.formData.sourcePaths[0].name;
                let index = name.lastIndexOf('.');
                type = index === 0 ? 'other' : name.slice(index + 1);
            }
            return type;
        }
    },
    methods: {
        getLabelList() {
            // todo:
        },
        handleCancel() {
            this.$router.go(-1);
        },
        handleConfirm() {
            // todo:
        }
    },
    watch: {
        'formData.sourcePaths' (nval) {
            console.error(nval);
        }
    }
};
</script>

<style>

</style>
