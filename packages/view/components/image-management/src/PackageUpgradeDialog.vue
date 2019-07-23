<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('sdxCommon.Upgrade')"
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
                :label="t('view.image.UpgradeTo') + ':'"
                prop="versionType"
            >
                <div>
                    <el-radio
                        v-model="currentPackage.versionType"
                        :label="VERSION_TYPE.LATEST"
                    >
                        {{ t('view.image.LastestVersion') }}
                    </el-radio>
                </div>
                <div class="sdxv-package-upgrade-dialog__form--item">
                    <el-radio
                        v-model="currentPackage.versionType"
                        :label="VERSION_TYPE.USER_DEFINED"
                    >
                        {{ t('view.image.CustomVersion') }}
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
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvPackageUpgradeDialog',
    mixins: [locale],
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
