<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        title="升级"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        class="sdxv-package-upgrade-dialog"
    >
        <el-form
            v-if="currentPackage"
            :inline="true"
            :rules="rules"
            :model="currentPackage"
            ref="form"
            class="sdxv-package-upgrade-dialog__form"
        >
            <el-form-item
                label="升级至:"
                prop="versionType"
            >
                <div>
                    <el-radio
                        v-model="currentPackage.versionType"
                        :label="VERSION_TYPE.LATEST"
                    >
                        最新版本
                    </el-radio>
                </div>
                <div class="sdxv-package-upgrade-dialog__form--item">
                    <el-radio
                        v-model="currentPackage.versionType"
                        :label="VERSION_TYPE.USER_DEFINED"
                    >
                        自定义版本
                    </el-radio>
                    <sdxu-input
                        v-model="currentPackage.version"
                        :disabled="currentPackage.versionType !== VERSION_TYPE.USER_DEFINED"
                        size="small"
                    />
                </div>
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuInput from '@sdx/ui/components/input';
import { Form, FormItem } from 'element-ui';

import { VERSION_TYPE } from '@sdx/utils/src/const/image';

export default {
    name: 'SdxvPackageUpgradeDialog',
    components: {
        SdxuDialog,
        SdxuInput,
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        currentPackage: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        this.VERSION_TYPE = VERSION_TYPE;
        return {
            rules: {
                versionType: [
                    {
                        validator: this.visionKindValidate,
                        trigger: 'change'
                    }
                ]
            }
        };
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
        handleConfirm() {
            this.$refs.form.validate(() => {
                this.$emit('confirm', this.currentPackage);
                this.dialogVisible = false;
            });
        },
        handleCancel() {
            this.dialogVisible = false;
        },
        visionKindValidate(rule, value, callback) {
            if (this.currentPackage.versionType === VERSION_TYPE.LATEST) {
                callback();
            } else {
                if (!this.currentPackage.version) {
                    callback(new Error('请填写版本信息'));
                } else {
                    callback();
                }
            }
        }
    }
};
</script>

<style>

</style>
