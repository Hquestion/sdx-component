<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxw-change-password"
    >
        <div
            slot="title"
            class="sdxw-change-password__title"
        >
            <svg
                class="icon"
                aria-hidden="true"
            >
                <use xlink:href="#iconicon-password" />
            </svg>
            <span>修改密码</span>
        </div>
        <el-form
            label-width="110px"
            label-position="left"
            :model="changePwdForm"
            ref="changePwdForm"
            :rules="changePwdFormRule"
        >
            <el-form-item
                label="旧密码："
                prop="oldPasswd"
            >
                <sdxu-input
                    v-model="changePwdForm.oldPasswd"
                    type="password"
                    password-visibleness
                />
            </el-form-item>
            <el-form-item
                label="新密码："
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
                label="确认新密码："
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
                取消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                确认
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
import { Form, FormItem, Message } from 'element-ui';
import { userApi } from '@sdx/utils/src/api';
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
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 20,
                        message: '密码长度在 6 到 20 个字符',
                        trigger: 'blur'
                    },
                    { validator: this.validatePwd, trigger: 'blur' }
                ],
                newPasswd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 20,
                        message: '密码长度在 6 到 20 个字符',
                        trigger: 'blur'
                    },
                    { validator: this.validatePwd, trigger: 'blur' }
                ],
                repeatNewPasswd: [
                    { required: true, message: '请确认新密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 20,
                        message: '密码长度在 6 到 20 个字符',
                        trigger: 'blur'
                    },
                    { validator: this.validatePwd, trigger: 'blur' }
                ]
            },
        };
    },
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
        }
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
        validatePwd(rule, value, callback) {
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)[a-zA-Z0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,20}$/;
            if (value && reg.test(value)) {
                callback();
            } else {
                callback(new Error('密码由字母、数字及特殊符号（除空格）组成且至少包含2种'));
            }
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.changePwdForm.validate(valid => {
                if (!valid) {
                    Message.error('请输入必填信息');
                } else {
                    if (
                        this.changePwdForm.newPasswd !== this.changePwdForm.repeatNewPasswd
                    ) {
                        Message.error('请确保两次输入的密码一致。');
                        return;
                    }
                    const params = {
                        oldPasswd: this.changePwdForm.oldPasswd,
                        newPasswd: this.changePwdForm.newPasswd
                    };
                    if (this.handler) {
                        this.handler(params);
                    } else {
                        userApi.changePassword(params).then(() => {
                            Message({
                                message: '密码修改成功！',
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
