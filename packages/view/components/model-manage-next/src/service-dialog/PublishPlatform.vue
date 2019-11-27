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
            label-width="90px"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.name') : t('view.model.APIName')}：`"
                prop="name"
            >
                <SdxuInput />
            </el-form-item>
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.description') : t('view.model.APIDescription')}：`"
            >
                <SdxuInput
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4}"
                />
            </el-form-item>
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.type') : t('view.model.APIType')}：`"
            >
                <el-select
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in APIType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                :label="`${isModel ? t('view.model.modelColumns.label') : t('view.model.APILabel')}：`"
                class="tag"
            >
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                >
                    {{ tag }}
                </el-tag>
                <SdxuInput
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                />
                <SdxuButton
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    type="default"
                >
                    + New Tag
                </SdxuButton>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.cover')}：`"
                prop="name"
                class="image-test"
            >
                <el-upload
                    class="upload-image"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-success="handleAvatarSuccess"
                    :show-file-list="false"
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
    </sdxu-dialog>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuDialog from '@sdx/ui/components/dialog';
import {Select, Option, Upload, Tag, Form, FormItem}  from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'SdxvPublishPlatform',
    mixins: [locale],
    data() {
        return {
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            APIType: [],
            params: {
            },
            imageUrl: ''
        };
    },
    components: {
        SdxuDialog,
        [Select.name]: Select,
        [Option.name]: Option,
        [Upload.name]: Upload,
        SdxuButton,
        [Tag.name]: Tag,
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
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
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