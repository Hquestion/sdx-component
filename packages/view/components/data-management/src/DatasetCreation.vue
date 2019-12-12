<template>
    <div class="sdxv-dataset-creation">
        <div class="sdxv-dataset-creation__title">
            新建数据集
        </div>
        <div class="sdxv-dataset-creation__container">
            <div class="sdxv-dataset-creation__container--content">
                <SdxuArticlePanel title="基本配置">
                    <el-form
                        :model="formData"
                        :label-width="labelWidth"
                    >
                        <el-form-item
                            prop="name"
                            label="数据集名称："
                            required
                        >
                            <SdxuInput
                                v-model="formData.name"
                                placeholder="请输入数据集名称"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="description"
                            label="数据集描述："
                        >
                            <SdxuInput
                                v-model="formData.description"
                                type="textarea"
                                placeholder="请输入数据集描述"
                                :rows="5"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="name"
                            label="数据集标签："
                        >
                            <el-select
                                v-model="formData.tags"
                                multiple
                                filterable
                                allow-create
                                placeholder="请选择或输入"
                            >
                                <el-option
                                    v-for="(item, i) in tagList"
                                    :key="i"
                                    :label="item.name"
                                    :value="item.name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            prop="name"
                            label="封面："
                        >
                            <SdxuUploadImage :image-url.sync="formData.imageUrl" />
                        </el-form-item>
                    </el-form>
                </SdxuArticlePanel>
                <SdxuArticlePanel title="数据源配置">
                    <el-form
                        :model="formData"
                        :label-width="labelWidth"
                    >
                        <el-form-item
                            label="选择文件："
                            required
                        >
                            <SdxwFileSelect
                                v-model="formData.filePath"
                                :string-model="false"
                                check-type="all"
                                source="all"
                                :limit="-1"
                            />
                        </el-form-item>
                        <el-form-item label="文件类型：">
                            <div class="sdxv-dataset-creation__container--show-bar">
                                <span>{{ fileType }}</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </SdxuArticlePanel>
                <SdxuArticlePanel title="数据保存">
                    <el-form :label-width="labelWidth">
                        <el-form-item label="存储目录：">
                            <div class="sdxv-dataset-creation__container--show-bar">
                                <span>/.datasets</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    <SdxwShareForm :label-width="labelWidth" />
                </SdxuArticlePanel>
                <SdxuArticlePanel
                    title="高级配置"
                    expandable
                    :expanded.sync="expanded"
                >
                    <el-form
                        v-if="expanded"
                        :label-width="labelWidth"
                    >
                        <el-form-item label="详细说明：">
                            <SdxuInput
                                v-model="formData.detail"
                                type="textarea"
                                placeholder="Markdown格式内容"
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
                        取消
                    </SdxuButton>
                    <SdxuButton @click="handleConfirm">
                        确定
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
                tags: [],
                image: '',
                file: '',
                imageUrl: '',
                filePath: [],
                detail: ''
            },
            // todo: 校验
            rules: [],
            tagList: [],
            enLabelWidth: 120,
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
        fileType() {
            let type = '';
            if (this.formData.filePath.length > 1) {
                type = 'other';
            } else if (this.formData.filePath.length === 1) {
                // 
                let name = this.formData.filePath[0].name;
                let index = name.lastIndexOf('.');
                type = index === 0 ? 'other' : name.slice(index + 1);
            }
            return type;
        }
    },
    methods: {
        handleCancel() {
            // todo:
        },
        handleConfirm() {
            // todo:
        }
    },
    watch: {
        'formData.filePath' (nval) {
            console.error(nval);
        }
    }
};
</script>

<style>

</style>
