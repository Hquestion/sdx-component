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
            <!-- <i class="sdx-icon iconicon-password icon" /> -->
            <svg
                class="icon"
                aria-hidden="true"
            >
                <use xlink:href="#iconicon-password" />
            </svg>
            <span>修改密码</span>
        </div>
        <el-form
            label-width="100px"
            :model="changePwdForm"
            ref="changePwdForm"
            :rules="changePwdFormRule"
        >
            <el-form-item
                label="旧密码"
                prop="oldPasswd"
            >
                <el-input
                    v-model="changePwdForm.oldPasswd"
                    type="password"
                />
            </el-form-item>
            <el-form-item
                label="新密码"
                prop="newPasswd"
            >
                <el-input
                    v-model="changePwdForm.newPasswd"
                    type="password"
                />
            </el-form-item>
            <el-form-item
                label="重复新密码"
                prop="repeatNewPasswd"
            >
                <el-input
                    v-model="changePwdForm.repeatNewPasswd"
                    type="password"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
import { Form, FormItem } from 'element-ui';
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
        [FormItem.name]: FormItem
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    methods: {
        dialogClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        validatePwd(rule, value, callback) {
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)[a-zA-Z0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,20}$/;
            if (value && reg.test(value)) {
                callback();
            } else {
                callback(new Error('密码需要同时包含数字和字母'));
            }
        }
    }
};
</script>
