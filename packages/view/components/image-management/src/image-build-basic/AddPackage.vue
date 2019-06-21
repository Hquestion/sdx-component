<template>
    <div class="sdxv-add-package">
        <el-form
            size="small"
            :rules="rules"
            :model="packageInfo"
            label-width="80px"
            ref="addPackageForm"
            @submit.native.prevent
        >
            <el-form-item
                label="包名称:"
                prop="name"
            >
                <div class="sdxv-add-package__form--item">
                    <sdxu-input
                        v-model="packageInfo.name"
                        placeholder="请输入包名称"
                        @input="handleAddPackageNameChange"
                    />
                </div>
            </el-form-item>
            <el-form-item
                label="源类型:"
                prop="sourceType"
            >
                <div class="sdxv-add-package__form--item">
                    <el-select
                        v-model="packageInfo.sourceType"
                        @change="handleSourceTypeChange"
                    >
                        <el-option
                            v-for="item in SOURCE_TYPE"
                            :key="item"
                            :value="item"
                            :label="item"
                        />
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item
                label="源URL:"
                prop="sourceUrlType"
                required
            >
                <el-radio-group
                    v-model="packageInfo.sourceUrlType"
                    @change="handleURLTypeChange"
                >
                    <el-radio :label="SOURCE_URL_TYPE.DEFAULT">
                        默认
                    </el-radio>
                    <el-radio :label="SOURCE_URL_TYPE.SELECTED">
                        预置URL
                    </el-radio>
                    <el-radio :label="SOURCE_URL_TYPE.USER_DEFINED">
                        自定义URL
                    </el-radio>
                </el-radio-group>
                <el-select
                    v-if="packageInfo.sourceUrlType === SOURCE_URL_TYPE.SELECTED"
                    v-model="packageInfo.sourceUrl"
                >
                    <el-option
                        v-for="option in urlOptions"
                        :key="option.sourceName"
                        :label="option.sourceName"
                        :value="option.sourceUrl"
                    />
                </el-select>
                <sdxu-input
                    v-else-if="packageInfo.sourceUrlType === SOURCE_URL_TYPE.USER_DEFINED"
                    v-model="packageInfo.sourceUrl"
                    placeholder="请填写源URL"
                />
            </el-form-item>
            <el-form-item
                label="版本:"
                prop="versionType"
                required
            >
                <el-radio-group
                    v-model="packageInfo.versionType"
                    @change="handleVersionTypeChange"
                >
                    <el-radio :label="VERSION_TYPE.LATEST">
                        最新版本
                    </el-radio>
                    <el-radio :label="VERSION_TYPE.USER_DEFINED">
                        自定义版本
                    </el-radio>
                </el-radio-group>
                <div
                    class="sdxv-add-package__form--item"
                    v-if="packageInfo.versionType === VERSION_TYPE.USER_DEFINED"
                >
                    <sdxu-input
                        v-model="packageInfo.version"
                        placeholder="请填写版本号"
                    />
                </div>
            </el-form-item>
            <el-form-item>
                <div class="sdxv-add-package__button--confirm">
                    <sdxu-button
                        type="primary"
                        size="small"
                        @click="handleCommitUpdate"
                    >
                        确认添加
                    </sdxu-button>
                </div>
            </el-form-item>
        </el-form>
        <el-alert
            class="sdxv-add-package__warning-tips"
            title="发现已经存在类似的包,请优先选择升级已有包!"
            type="warning"
            :closable="false"
            v-show="packageInfo.name && queryCount"
        />
    </div>
</template>

<script>
import { Form, FormItem, Radio, Select, Option } from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';

import { SOURCE_TYPE, VERSION_TYPE, SOURCE_URL_TYPE } from '@sdx/utils/src/const/image';
import { getSourceRepos } from '@sdx/utils/src/api/image';

export default {
    name: 'SdxvAddPackage',
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Radio.name]: Radio,
        [Select.name]: Select,
        [Option.name]: Option,
        SdxuInput,
        SdxuButton
    },
    props: {
        queryCount: {
            type: Number,
            default: 0
        }
    },
    data() {
        this.SOURCE_TYPE = SOURCE_TYPE;
        this.VERSION_TYPE = VERSION_TYPE;
        this.SOURCE_URL_TYPE = SOURCE_URL_TYPE;
        return {
            packageInfo: {
                name: '',
                version: '',
                sourceType: 'PIP',
                sourceUrl: '',
                sourceUrlType: SOURCE_URL_TYPE.DEFAULT,
                versionType: VERSION_TYPE.LATEST
            },
            sourceRepos: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请填写包名称',
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                sourceType: [
                    { required: true, message: '请选择源类型', trigger: 'change' }
                ],
                versionType: [
                    { validator: this.versionTypeValidate, trigger: 'blur' }
                ],
                sourceUrlType: [{
                    validator: this.sourceUrlTypeValidate, trigger: 'change'
                }]
            }
        };
    },
    computed: {
        urlOptions() {
            return this.sourceRepos.filter(el => el.sourceType === this.packageInfo.sourceType);
        }
    },
    methods: {
        fetchSourceUrlOption() {
            getSourceRepos().then(data => {
                this.sourceRepos = data;
            });
        },
        handleCommitUpdate() {
            this.$refs.addPackageForm.validate(valid => {
                if (valid) {
                    this.$emit('addPackage', this.packageInfo);
                    this.$refs.addPackageForm.resetFields();
                    this.resetPackageInfo();
                }
            });
        },
        resetPackageInfo() {
            this.packageInfo = {
                name: '',
                version: '',
                sourceType: 'PIP',
                sourceUrl: '',
                sourceUrlType: SOURCE_URL_TYPE.DEFAULT,
                versionType: VERSION_TYPE.LATEST
            };
        },
        handleAddPackageNameChange() {
            this.$emit('packageNameChange', this.packageInfo.name);
        },
        handleSourceTypeChange() {
            this.packageInfo.sourceUrl = '';
            this.$nextTick(() => {
                this.$refs.addPackageForm.clearValidate(['sourceUrl']);
            });
        }, 
        handleURLTypeChange() {
            this.packageInfo.sourceUrl = '';
            this.$nextTick(() => {
                this.$refs.addPackageForm.clearValidate(['sourceUrlType']);
            });
        },
        handleVersionTypeChange() {
            this.packageInfo.version = '';
            this.$nextTick(() => {
                this.$refs.addPackageForm.clearValidate(['versionType']);
            });
        },
        versionTypeValidate (rule, value, callback) {
            if (value === VERSION_TYPE.LATEST) {
                callback();
            } else {
                if (this.packageInfo.version.trim()) {
                    callback();
                } else {
                    callback(new Error('请填写版本信息'));
                }
            }
        },
        sourceUrlTypeValidate (rule, value, callback) {
            if (value === SOURCE_URL_TYPE.DEFAULT) {
                callback();
            } else {
                if (this.packageInfo.sourceUrl.trim()) {
                    callback();
                } else {
                    callback(new Error('请填写或选择源URL'));
                }
            }
        }
    },
    created() {
        this.fetchSourceUrlOption();
    }
};
</script>

<style>

</style>
