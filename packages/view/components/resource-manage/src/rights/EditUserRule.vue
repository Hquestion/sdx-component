<template>
    <div class="edit-user-rule">
        <SdxuDialog
            :visible.sync="dialogVisible"
            size="large"
            :title="title"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        >
            <div class="edit-user-rule__inner">
                <el-form
                    :model="params"
                    label-width="108px"
                    label-position="right"
                >
                    <el-form-item
                        label="用户"
                        props="user.userName"
                        required
                    >
                        <SdxuInput
                            v-model="params.user.userName"
                            v-if="!meta"
                        />
                        <SdxuUserAvatar
                            :name="params.user.userName"
                            v-else
                        />
                    </el-form-item>
                    <el-form-item
                        label="用户规则设置"
                        required
                    >
                        <div>
                            <RuleForm
                                :readonly="readonly"
                                mode="v"
                                :user-id="params.user.userId"
                            />
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </SdxuDialog>
    </div>
</template>

<script>
import SdxuDialog from "@sdx/ui/components/dialog/src/Dialog";
import SdxuInput from "@sdx/ui/components/input/src/Input";
import SdxuUserAvatar from '@sdx/ui/components/user-avatar';
import RuleForm from "../rule/RuleForm";
export default {
    name: 'EditUserRule',
    components: {
        RuleForm,
        SdxuInput,
        SdxuDialog,
        SdxuUserAvatar
    },
    data() {
        return {
            params: {
                user: {},
                rule: {}
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
            return this.meta ? '编辑用户特权' : '新增用户特权';
        }
    },
    methods: {
        handleConfirm() {},
        handleCancel() {}
    }
};
</script>

<style lang="scss" scoped>

</style>
