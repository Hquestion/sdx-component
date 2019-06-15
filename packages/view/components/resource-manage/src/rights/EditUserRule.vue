<template>
    <div class="edit-user-rule">
        <SdxuDialog
            :visible.sync="dialogVisible"
            size="large"
            :title="title"
            :confirm-handler="handleConfirm"
            @close="$refs.ruleForm.clearValidate()"
            @open="handleOpen"
        >
            <div class="edit-user-rule__inner">
                <el-form
                    ref="ruleForm"
                    :model="params"
                    label-width="108px"
                    label-position="right"
                    :rules="rule"
                >
                    <el-form-item
                        label="用户"
                        prop="user"
                    >
                        <SdxwUserPicker
                            v-model="params.user"
                            v-if="!meta"
                            type="user"
                        />
                        <SdxuUserAvatar
                            :name="params.user && params.user.name"
                            v-else
                        />
                    </el-form-item>
                    <el-form-item
                        label="用户规则设置"
                        prop="rule"
                    >
                        <div>
                            <RuleForm
                                ref="userRule"
                                :readonly="readonly"
                                mode="v"
                                :user-id="params.user && params.user.uuid"
                            />
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </SdxuDialog>
    </div>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuUserAvatar from '@sdx/ui/components/user-avatar';
import SdxwUserPicker from '@sdx/widget/components/user-picker';
import RuleForm from '../rule/RuleForm';
import { Form, FormItem } from 'element-ui';
import { createUserResourceConfig, saveResourceConfig } from '@sdx/utils/src/api/resource';

export default {
    name: 'EditUserRule',
    components: {
        RuleForm,
        SdxuDialog,
        SdxuUserAvatar,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        SdxwUserPicker
    },
    data() {
        return {
            params: {
                user: {
                    name: '',
                    uuid: ''
                },
                rule: {}
            },
            rule: {
                user: [
                    { required: true, message: '请选择用户', trigger: 'blur' },
                    { validator: this.userValidator, trigger: 'change' },
                    { validator: this.userValidator, trigger: 'blur' }
                ],
                rule: [
                    { required: true, message: '配置不合法', trigger: 'blur' },
                    {validator: this.configValidator}
                ]
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        meta: {
            type: Object,
            default: undefined
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            }
        },
        title() {
            return this.meta ? (this.readonly ? '查看用户特权' : '编辑用户特权') : '新增用户特权';
        }
    },
    methods: {
        handleConfirm() {
            if(this.readonly) return Promise.resolve();
            return this.$refs.ruleForm.validate().then(() => {
                const config = this.$refs.userRule.getConfig();
                if (this.meta) {
                    // 更新
                    saveResourceConfig(config.resourceUuid, config).then(() => {
                        this.$emit('refresh');
                    });
                } else {
                    // 创建
                    return createUserResourceConfig(this.params.user.uuid, config).then(() => {
                        this.$emit('refresh');
                    });
                }
            });
        },
        handleOpen() {
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        },
        configValidator(rule, value, cb) {
            const config = this.$refs.userRule.getConfig();
            const intKeys = ['maxConcurrentTasks', 'maxConcurrentHeavyTasks', 'maxGpuTime', 'maxCpuTime', 'maxGpus'];
            for (let i = 0; i < intKeys.length; i++) {
                let value = config[intKeys[i]];
                if (!value || +value <= 0 || +value !== +value) {
                    cb('配置不合法');
                    return;
                }
            }
            cb();
        },
        userValidator(rule, value, cb) {
            if (this.params.user && this.params.user.uuid) {
                cb();
            } else {
                cb('请选择用户');
            }
        }
    },
    watch: {
        meta: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val) {
                    this.params.user = {
                        uuid: val.user.uuid,
                        name: val.user.fullName
                    };
                } else {
                    this.params.user = {
                        name: '',
                        uuid: ''
                    };
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
