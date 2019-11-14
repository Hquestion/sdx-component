<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.model.Online_testing')"
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
                :label="`${t('view.model.Test_method')}：`"
                prop="name"
            >
                <el-radio-group
                    v-model="radio"
                    @change="radioChange"
                >
                    <el-radio
                        label="imageRecognition"
                    >
                        {{ t('view.model.Image_recognition') }}
                    </el-radio>
                    <el-radio
                        label="machineLearning"
                    >
                        {{ t('view.model.Machine_learning') }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Service_URL')}：`"
                prop="name"
                class="service-url"
            >
                <SdxuInput
                    :disabled="true"
                    type="textarea"
                />
                <SdxuButton type="default">
                    <i class="sdx-icon sdx-caozuofuzhi" />
                </SdxuButton>
            </el-form-item>
            <el-form-item
                label="APIKey："
                prop="name"
                class="api-key"
            >
                <SdxuInput
                    :disabled="true"
                    type="textarea"
                />
                <SdxuButton type="default">
                    <i class="sdx-icon sdx-caozuofuzhi" />
                </SdxuButton>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Input')}：`"
                prop="name"
                class="image-test"
                v-if="radio === 'imageRecognition'"
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
            <el-form-item
                :label="`${t('view.model.Input')}：`"
                prop="name"
                class="machine-test"
                v-else
            >
                <div>
                    <el-select
                        style="width: 100%"
                    >
                        <el-option
                            v-for="item in testType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    <SdxuButton type="default">
                        {{ t('view.model.test') }} 
                    </SdxuButton>
                </div>
                <div>
                    <SdxuInput
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                    />
                </div>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Prediction_results')}：`"
                prop="name"
                class="result"
            >
                <SdxuInput
                    :disabled="true"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4}"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuDialog from '@sdx/ui/components/dialog';
import {RadioGroup, Radio, Select, Option, Upload}  from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'SdxvOnlineTesting',
    mixins: [locale],
    data() {
        return {
            radio: 'imageRecognition',
            testType: [
                {
                    value: 'CRUL',
                    label: 'CRUL'
                },
                {
                    value: 'JSON',
                    label: 'JSON'
                }
            ],
            params: {

            }
        };
    },
    components: {
        SdxuDialog,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        SdxuButton,
        [Select.name]: Select,
        [Option.name]: Option,
        [Upload.name]: Upload,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
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