<template>
    <div class="sdxw-api-test">
        <el-form
            ref="form"
            :model="model"
            label-width="90px"
            label-position="right"
            :rules="rules"
            size="medium"
        >
            <el-form-item
                :label="`${t('view.model.Test_method')}：`"
                prop="method"
            >
                <el-radio-group
                    v-model="model.method"
                >
                    <el-radio
                        :label="imageRecognition"
                    >
                        {{ t('view.model.Image_recognition') }}
                    </el-radio>
                    <el-radio
                        :label="machineLearning"
                    >
                        {{ t('view.model.Machine_learning') }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Service_URL')}：`"
                prop="apiUrl"
            >
                <SdxuAutosizeCopyable
                    v-model="model.apiUrl"
                />
            </el-form-item>
            <el-form-item
                label="APIKey："
                prop="apiKey"
            >
                <SdxuAutosizeCopyable
                    v-model="model.apiKey"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Input')}：`"
                prop="imageUrl"
                class="image-test"
                v-if="!isMachineLearning"
            >
                <div class="sdxw-api-test__uploader">
                    <div class="sdxw-api-test__img">
                        <img
                            v-if="model.imageUrl"
                            :src="model.imageUrl"
                        >
                        <div
                            v-else
                            class="sdxw-api-test__placeholder"
                        >
                            <span>
                                {{ t('view.model.Click_the_select_Picture_button') }}
                            </span>
                            <span>
                                {{ t('view.model.Upload_pictures') }}
                            </span>
                        </div>
                    </div>
                    <div class="sdxw-api-test__upload-trigger">
                        <SdxuUpload
                            class="upload-image"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-success="handleUploadSuccess"
                            :show-file-list="false"
                            accept="image/x-png,image/jpeg"
                        >
                            <SdxuButton type="default" size="small">
                                {{ t('view.model.Select_pictures') }}
                            </SdxuButton>
                            <div
                                slot="tip"
                                class="el-upload__tip"
                            >
                                {{ t('view.model.Support_uploading_JPG_PNG_files') }}
                            </div>
                        </SdxuUpload>
                    </div>
                    <SdxuButton type="link" @click="handleTest">
                        {{ t('view.model.test') }}
                    </SdxuButton>
                </div>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Input')}：`"
                prop="testCode"
                v-else
            >
                <div class="sdxw-api-test__input-wrapper">
                    <div class="sdxw-api-test__input-header">
                        <el-select
                            v-model="model.inputType"
                        >
                            <el-option
                                v-for="item in testType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                        <SdxuButton type="link">
                            {{ t('view.model.test') }}
                        </SdxuButton>
                    </div>
                    <SdxuCodepan
                        class="sdxw-api-test__input-code"
                        v-model="model.testCode"
                        light
                        type="javascript"
                    />
                </div>
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Prediction_results')}：`"
            >
                <SdxuCodepan
                    class="sdxw-api-test__result"
                    v-model="testResult"
                    light
                    type="javascript"
                    readonly
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import SdxuCopyable from '@sdx/ui/components/copyable';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuUpload from '@sdx/ui/components/upload';
import SdxuCodepan from '@sdx/ui/components/codepan';
import SdxuAutosizeCopyable from '@sdx/ui/components/autosize-copyable';
import locale from '@sdx/utils/src/mixins/locale';
import { getApiDetail } from '@sdx/utils/src/api/model';

const imageRecognition = '1';
const machineLearning = '2';
export default {
    name: 'SdxwApiTest',
    mixins: [locale],
    data() {
        return {
            imageRecognition,
            machineLearning,
            model: {
                method: imageRecognition,
                apiUrl: 'hjkhjkshckjdshcjkdshcjkdshcjkdhsjkchdsjkchdskjhjkvdfhkjvdfkjvhdfjkvhdfjkhvkjdfhvjkdfhkjv',
                apiKey: '',
                testCode: '',
                imageUrl: '',
                inputType: 'CURL'
            },
            rules: {

            },
            testType: [
                {
                    value: 'CURL',
                    label: 'CURL'
                },
                {
                    value: 'JSON',
                    label: 'JSON'
                }
            ],
            testResult: ''
        };
    },
    props: {
        serviceId: {
            type: String,
            default: ''
        },
        meta: {
            type: Object,
            default: undefined
        }
    },
    components: {
        SdxuCopyable,
        SdxuInput,
        SdxuButton,
        SdxuUpload,
        SdxuCodepan,
        SdxuAutosizeCopyable
    },
    computed: {
        isMachineLearning() {
            return this.model.method === machineLearning;
        }
    },
    methods: {
        handleUploadSuccess() {

        },
        initMetadata(serviceId) {
            if (serviceId) {
                getApiDetail(this.serviceId).then(res => {
                    this.model.apiUrl = res.apiUrl;
                    this.model.apiKey = res.apiKey;
                });
            } else if (this.meta) {
                this.model.apiUrl = this.meta.apiUrl;
                this.model.apiKey = this.meta.apiKey;
            }
        },
        handleTest() {
            // todo 调用测试接口并输出响应
        }
    },
    watch: {
        serviceId: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.initMetadata(val);
                }
            }
        }
    },
    mounted() {
        this.initMetadata();
    }
};
</script>

<style scoped>

</style>
