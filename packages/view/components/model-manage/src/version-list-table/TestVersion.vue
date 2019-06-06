<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-test-version"
        title="测试模型版本"
        no-footer
    >
        <el-form
            label-width="110px"
            label-position="right"
            :model="testForm"
            ref="testForm"
        >
            <el-form-item
                label="API地址："
            >
                <div>
                    {{ version.restApi }}
                </div>
            </el-form-item>
            <el-form-item
                label="Key："
            >
                <SdxuButton
                    v-if="!token"
                    type="primary"
                    size="small"
                    @click="getToken"
                    :loading="loading"
                >
                    获取Key
                </SdxuButton>
                <div v-else>
                    {{ token }}
                </div>
            </el-form-item>
            <el-form-item
                label="输入："
            >
                <SdxuButton
                    size="small"
                    @click="getInputFormat"
                    plain
                    class="sdxv-test-version__get-token-button"
                >
                    <span>获取入参格式</span>
                    <i
                        class="sdx-icon sdx-icon-caret-top"
                        v-if="!inputFormat"
                    />
                    <i
                        class="sdx-icon sdx-icon-caret-bottom"
                        v-else
                    />
                </SdxuButton>
                <sdxu-input
                    v-model="inputFormat"
                    v-if="inputFormat"
                    disabled
                    type="textarea"
                    :rows="6"
                />
                <sdxu-input
                    v-model="testForm.inputs"
                    type="textarea"
                    placeholder="请输入"
                    :rows="6"
                    class="sdxv-test-version__input"
                />
                <SdxuButton
                    size="small"
                    @click="test"
                    :disabled="!token"
                >
                    测试
                </SdxuButton>
            </el-form-item>
            <el-form-item
                label="返回结果："
            >
                <sdxu-input
                    v-model="outputs"
                    type="textarea"
                    :rows="6"
                    disabled
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import { getVersionToken, getVersionInputFormat } from '@sdx/utils/src/api/model';
import httpService from '@sdx/utils/src/http-service';
export default {
    name: 'TestVersion',
    data() {
        return {
            dialogVisible: this.visible,
            loading: false,
            token: '',
            testForm: {
                inputs: ''
            },
            inputFormat: '',
            outputs: ''
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        version: {
            type: Object,
            default: null
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Input.name]: Input,
        ElForm,
        ElFormItem
    },
    created() {
    },
    methods: {
        getInputFormat() {
            getVersionInputFormat(this.$route.params.modelId, this.version.uuid).then(res => {
                this.inputFormat = res.input;
            });
        },
        getToken() {
            this.loading = true;
            getVersionToken(this.$route.params.modelId, this.version.uuid).then(res => {
                this.token = res.data;
                this.loading = false;
            });
        },
        dialogClose() {
            this.testForm = {};
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        test() {
            httpService.post(this.version.restApi, this.testForm, {
                headers: {
                    token: this.token
                }
            }).then(res => {
                this.outputs = res.outputs;
            });
        }
    }
};
</script>
