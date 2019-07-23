<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxw-change-password"
        title-icon="sdx-icon-password"
    >
        <div
            slot="title"
        >
            <span>{{ t('widget.changePassword.title') }}</span>
        </div>
        <el-form
            label-width="110px"
            label-position="left"
            :model="changePwdForm"
            ref="changePwdForm"
            :rules="changePwdFormRule"
        >
            <el-form-item
                :label="t('widget.changePassword.oldPwd')"
                prop="oldPasswd"
            >
                <sdxu-input
                    v-model="changePwdForm.oldPasswd"
                    type="password"
                    password-visibleness
                />
            </el-form-item>
            <el-form-item
                :label="t('widget.changePassword.newPwd')"
                prop="newPasswd"
            >
                <sdxu-input
                    v-model="changePwdForm.newPasswd"
                    type="password"
                    password-visibleness
                    password-strength
                />
            </el-form-item>
            <el-form-item
                :label="t('widget.changePassword.confirmNewPwd')"
                prop="repeatNewPasswd"
            >
                <sdxu-input
                    v-model="changePwdForm.repeatNewPasswd"
                    type="password"
                    password-visibleness
                />
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
                {{ t('ui.button.cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                {{ t('ui.button.ok') }}
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import { Form, FormItem, Message } from 'element-ui';
import { userApi } from '@sdx/utils/src/api';
import locale from '@sdx/utils/src/mixins/locale';
import {passwordValidator} from '@sdx/utils/src/helper/validate';
export default {
    name: 'SdxwChangePassword',
    data() {
        return {
            dialogVisible: this.visible,
            changePwdForm: {
                oldPasswd: '',
                newPasswd: '',
                repeatNewPasswd: ''
            },
            changePwdFormRule: {
                oldPasswd: [
                    { required: true, message: this.t('widget.changePassword.needOldPwd'), trigger: 'blur' },
                    { validator: passwordValidator, trigger: 'blur' }
                ],
                newPasswd: [
                    { required: true, message: this.t('widget.changePassword.needNewPwd'), trigger: 'blur' },
                    { validator: passwordValidator, trigger: 'blur' }
                ],
                repeatNewPasswd: [
                    { required: true, message: this.t('widget.changePassword.needConfirmPwd'), trigger: 'blur' },
                    { validator: passwordValidator, trigger: 'blur' }
                ]
            },
        };
    },
    mixins:[locale],
    components: {
        [Dialog.name]: Dialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Input.name]: Input,
        [Button.name]: Button
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        handler: {
            type: Function,
            default: undefined
        },
        userInfoData:{
            type: Object,
            default: () => {
                return {
                };
            }
        },
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    methods: {
        dialogClose() {
            this.$refs.changePwdForm.clearValidate();
            this.changePwdForm = {
                oldPasswd: '',
                newPasswd: '',
                repeatNewPasswd: ''
            };
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.changePwdForm.validate(valid => {
                if (!valid) {
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    if (
                        this.changePwdForm.newPasswd !== this.changePwdForm.repeatNewPasswd
                    ) {
                        Message.error(this.t('widget.changePassword.needSamePwd'));
                        return;
                    }
                    const params = {
                        oldPassword: this.changePwdForm.oldPasswd,
                        password: this.changePwdForm.newPasswd
                    };
                    if (this.handler) {
                        this.handler(params);
                    } else {
                        userApi.changePassword(this.userInfoData.userId, params).then(() => {
                            Message({
                                message: this.t('widget.changePassword.changeSuccess'),
                                type: 'success'
                            });
                            this.$emit('on-success');
                            this.dialogVisible = false;
                        }).catch(() => {
                            this.$emit('on-error');
                        });
                    }
                }
            });
        }
    }
};
</script>
