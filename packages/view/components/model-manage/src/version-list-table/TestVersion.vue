<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-test-version"
        :title="t('view.model.testVersion')"
        no-footer
    >
        <el-form
            label-width="110px"
            label-position="right"
            :model="testForm"
            ref="testForm"
        >
            <el-form-item
                :label="t('view.model.apiUrl')"
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
                    {{ t('view.model.versionDetail.getKey') }}
                </SdxuButton>
                <div
                    v-else
                    style="overflow-wrap: break-word;"
                >
                    {{ token }}
                </div>
            </el-form-item>
            <el-form-item
                :label="t('view.model.input')"
            >
                <SdxuButton
                    size="small"
                    @click="getInputFormat"
                    plain
                    class="sdxv-test-version__get-token-button"
                >
                    <span>{{ t('view.model.getParamFormat') }}</span>
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
                    :placeholder="t('view.model.enterParam')"
                    :rows="6"
                    class="sdxv-test-version__input"
                />
                <SdxuButton
                    size="small"
                    @click="test"
                    :disabled="!token"
                >
                    {{ t('view.model.test') }}
                </SdxuButton>
            </el-form-item>
            <el-form-item
                :label="t('view.model.result')"
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
import locale from '@sdx/utils/src/mixins/locale';
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
    mixins: [locale],
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
                this.inputFormat = res.inputs;
            });
        },
        getToken() {
            this.loading = true;
            getVersionToken(this.$route.params.modelId, this.version.uuid).then(res => {
                this.token = res.token;
                this.loading = false;
            });
        },
        dialogClose() {
            this.testForm = {};
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        test() {
            httpService.post(this.version.restApi, {inputs: this.processJson(this.testForm.inputs)}, {
                headers: {
                    token: this.token
                }
            }).then(res => {
                this.outputs = JSON.stringify(res);
            });
        },
        processJson(str) {
            let ret = '';
            try {
                ret = JSON.parse(str);
            } catch (e) {
                ret = str;
            }
            return ret;
        }
    }
};
</script>
