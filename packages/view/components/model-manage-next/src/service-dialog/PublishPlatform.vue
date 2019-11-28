<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.model.Release_to_AI_open_platform')"
        class="sdxv-online-testing"
        width="720px"
    >
        <el-form
            ref="form"
            :model="params"
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.name') : t('view.model.APIName')}：`"
                prop="name"
            >
                <sdxu-input
                    v-model="params.name"
                    :placeholder="t('view.model.searchModelName')"
                />
            </el-form-item>
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.description') : t('view.model.APIDescription')}：`"
                prop="description"
            >
                <sdxu-input
                    v-model="params.description"
                    type="textarea"
                    :placeholder="t('view.model.modelDescription')"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.type') : t('view.model.APIType')}：`"
                prop="modelType"
            >
                <sdxu-select
                    v-model="params.modelType"
                    filterable
                    allow-create
                    :show-icon="true"
                    :placeholder="t('view.model.enterOrSelectModelType')"
                >
                    <sdxu-option
                        v-for="item in modelTypes"
                        :key="item.name"
                        :label="item.name"
                        :svg-icon="item.icon"
                        :value="item.name"
                    />
                </sdxu-select>
            </el-form-item>
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.label') : t('view.model.APILabel')}：`"
                prop="labels"
            >
                <sdxu-select
                    v-model="params.labels"
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
                :label="`${t('view.model.cover')}：`"
                prop="cover"
                class="image-test"
            >
                <el-upload
                    class="upload-image"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-success="handleAvatarSuccess"
                    :show-file-list="false"
                    accept="image/x-png,image/jpeg"
                >
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                    >
                    <div
                        v-else
                        class="occupying-box"
                    >
                        <span>
                            {{ t('view.model.Click_the_select_Picture_button') }}
                        </span>
                        <span>
                            {{ t('view.model.Upload_pictures') }}
                        </span>
                    </div>
                    <div class="upload-btn">
                        <SdxuButton type="default">
                            {{ t('view.model.Select_pictures') }}
                        </SdxuButton>
                        <div
                            slot="tip"
                            class="el-upload__tip"
                        >
                            {{ t('view.model.Support_uploading_JPG_PNG_files') }}
                        </div>
                    </div>
                </el-upload>
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
import {Select, Option, Upload, Form, FormItem}  from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';
import { nameWithChineseValidator, descValidator, tagArrayValidator } from '@sdx/utils/src/helper/validate';
import { getLabels, getModelTypes,updateModel } from '@sdx/utils/src/api/model';
import { MODEL_TYPES_ICON, DEFAULT_MODEL_TYPE_ICON, getLabelByName } from '@sdx/utils/src/const/model';
import Message from 'element-ui/lib/message';
export default {
    name: 'SdxvPublishPlatform',
    mixins: [locale],
    data() {
        return {
            params: {
                uuid: '',
                name: '',
                description: '',
                modelType: '',
                labels: [],
            },
            modelTypes: [],
            labelOptions: [],
            imageUrl: '',
            rules: {
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
                modelType: [
                    { required: true, message: this.t('view.model.enterOrSelectModelType'), trigger: 'change' }
                ],
                labels: [
                    { required: true, message: this.t('view.model.selectLabel'), trigger: 'change' },
                    { validator: tagArrayValidator, trigger: 'change' }
                ]
            }
        };
    },
    components: {
        SdxuDialog,
        [Select.name]: Select,
        [Option.name]: Option,
        [Upload.name]: Upload,
        SdxuButton,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        isModel: {
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
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        cancel() {
            this.$emit('update:visible', false);
        },
        confirm() {
            this.$refs.form.validate((valid) => {
                if(valid) {
                    updateModel(this.params.uuid, this.params).then(() => {
                        Message({
                            message: this.t('sdxCommon.UpdateSuccess'),
                            type: 'success'
                        });
                        this.$emit('update:visible', false);
                        this.$emit('confirmPublish');
                    });
                }
            });
        }
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
        if(this.isEdit) {
            this.params = Object.assign(this.info);
        }
    },
};
</script>

<style lang="scss" scoped>
.sdxv-online-testing {
    .service-url {
        /deep/ {
            .el-form-item__content {
                display: flex;
                position: relative;
            }
            .sdxu-input.sdxu-input--regular {
                width: calc(100% - 100px);
            }
            .sdxu-button.sdxu-button--regular {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 68px;
                height: 40px;
                i {
                    font-size: 24px;
                }
            }
        }
    }
    .api-key {
        @extend .service-url;
    }
    .machine-test {
        /deep/ {
            div:first-child {
                display: flex;
                .el-select {
                    width: calc(100% - 60px);
                }
            }
            .sdxu-button.sdxu-button--regular.sdxu-button--default{
                width: 60px;
                border-left: none;
                border-radius: 0 0px 2px 0;
                padding: 0;
            }
            .el-select .el-input__inner {
                border-radius: 2px 0 0 0px;
            }
            .sdxu-input .el-input__inner, .sdxu-input .el-textarea__inner {
                border-top: none;
                border-radius: 0 0 2px 2px;
            }
        }
    }
    .tag {
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
        /deep/ {
            .sdxu-input {
                display: inline-block;
                width: 131px;
            }
            .el-tag {
                background: #EDEFF2;
                border-radius: 2px;
                font-size: 14px;
                color: #13264D;
                border: none;
            }
            .el-tag .el-icon-close {
                background: #EDEFF2;
            }
            .el-tag .el-icon-close {
                color: #505F79;
            }
            .el-icon-close:hover {
                color: #1144AB;
            }
        }
    }
    .upload-image {
        /deep/ {
            .el-upload {
                display: flex;
            }
            .occupying-box {
                background: #EDEFF2;
                border-radius: 2px;
                width: 200px;
                height: 200px;
                display: flex;
                flex-direction: column;
                font-size: 12px;
                color: #6E7C94;
                padding: 72px 0;
                span {
                    height: 16px;
                }
            }
            img {
                width: 200px;
                height: 200px;
            }
            .upload-btn {
                padding-top: 120px;
                text-align: left;
                padding-left: 16px;
            }
        }
    }
}
</style>