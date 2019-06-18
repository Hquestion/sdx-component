<template>
    <sdxu-dialog
        title="共享设置"
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :confirm-handler="confirmEdit"
    >
        <el-form
            label-width="110px"
            label-position="left"
            :model="shareForm"
            ref="shareSettingForm"
        >
            <el-form-item
                label="共享至全局："
                v-auth.button="auth"
            >
                <el-switch
                    v-model="shareForm.shareType"
                    active-value="PUBLIC"
                    inactive-value="PRIVATE"
                />
            </el-form-item>
            <el-form-item
                label="用户/用户组："
                v-show="shareForm.shareType !== 'PUBLIC'"
            >
                <sdxw-select-group-user
                    :users.sync="shareForm.selectedUsers"
                    :groups.sync="shareForm.selectedGroups"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import SelectGroupUser from '@sdx/widget/components/select-group-user';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import ElSwitch from 'element-ui/lib/switch';
import auth from '@sdx/widget/components/auth';
export default {
    name: 'SdxwShareSetting',
    data() {
        return {
            dialogVisible: this.visible,
            shareForm: {
                selectedUsers: [...this.defaultUsers],
                selectedGroups: [...this.defaultGroups],
                shareType: this.defaultShareType
            },
            auth: ''
        };
    },
    directives: {
        auth
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    created() {
        if (this.sourceKind) {
            switch (this.sourceKind) {
            case 'image':
                this.auth = 'GLOBAL_IMAGE_BUTTON:ACCESS';
                break;
            case 'skyflow':
                this.auth = 'GLOBAL_SKYFLOW_BUTTON:ACCESS';
                break;
            case 'model':
                this.auth = 'GLOBAL_MODEL_BUTTON:ACCESS';
                break;
            case 'dataset':
                this.auth = 'GLOBAL_DATASET_BUTTON:ACCESS';
                break;
            case 'file':
                this.auth = 'GLOBAL_FILE_BUTTON:ACCESS';
                break;
            default:
                break;
            }
        }
    },
    components: {
        [SelectGroupUser.name]: SelectGroupUser,
        [Dialog.name]: Dialog,
        ElForm,
        ElFormItem,
        ElSwitch
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
        defaultUsers: {
            type: Array,
            default: () => []
        },
        defaultGroups: {
            type: Array,
            default: () => []
        },
        defaultShareType: {
            type: String,
            default: 'PRIVATE'
        },
        sourceKind: {
            type: String,
            default: ''
        }
    },
    methods: {
        dialogClose() {
            this.shareForm = {
                selectedUsers: [],
                selectedGroups: [],
                shareType: 'PRIVATE'
            };
            this.$emit('update:visible', false);
        },
        confirmEdit() {
            if (this.handler) {
                return this.handler(this.shareForm.selectedUsers, this.shareForm.selectedGroups, this.shareForm.shareType);
            } else {
                this.$emit('confirm-edit', this.shareForm.selectedUsers, this.shareForm.selectedGroups, this.shareForm.shareType);
                return Promise.resolve();
            }
        }
    }
};
</script>
