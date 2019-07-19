<template>
    <sdxu-dialog
        :title="t('widget.shareSetting.title')"
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
                :label="t('widget.shareSetting.shareGlobal')"
                v-auth.button="authMap[sourceKind]"
            >
                <el-radio
                    v-model="shareForm.shareType"
                    label="PUBLIC"
                >
                    {{ t('sdxCommon.Yes') }}
                </el-radio>
                <el-radio
                    v-model="shareForm.shareType"
                    label="PRIVATE"
                >
                    {{ t('sdxCommon.No') }}
                </el-radio>
            </el-form-item>
            <el-form-item
                :label="t('widget.shareSetting.userGroup')"
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
import ElRadio from 'element-ui/lib/radio';
import locale from '@sdx/utils/src/mixins/locale';
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
            authMap: {
                image: 'APPLICATION:GLOBAL_IMAGE_BUTTON:ACCESS',
                skyflow: 'APPLICATION:GLOBAL_SKYFLOW_BUTTON:ACCESS',
                model: 'APPLICATION:GLOBAL_MODEL_BUTTON:ACCESS',
                dataset: 'APPLICATION:GLOBAL_DATASET_BUTTON:ACCESS',
                file: 'APPLICATION:GLOBAL_FILE_BUTTON:ACCESS',
            }
        };
    },
    directives: {
        auth
    },
    mixins: [locale],
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [SelectGroupUser.name]: SelectGroupUser,
        [Dialog.name]: Dialog,
        ElForm,
        ElFormItem,
        ElRadio
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
