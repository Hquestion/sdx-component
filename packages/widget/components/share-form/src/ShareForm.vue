<template>
    <div class="sdxw-share-form">
        <el-form
            :label-width="labelWidth"
            label-position="left"
            :model="shareForm"
            ref="shareSettingForm"
        >
            <el-form-item
                :label="t('widget.shareForm.ShareToGlobal')"
                v-auth.button="authMap[sourceKind]"
            >
                <el-radio-group v-model="shareForm.shareType">
                    <el-radio
                        label="PUBLIC"
                    >
                        {{ t('widget.shareForm.Yes') }}
                    </el-radio>
                    <el-radio
                        label="PRIVATE"
                    >
                        {{ t('widget.shareForm.No') }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                :label="t('widget.shareForm.UserOrGroup')"
                v-show="shareForm.shareType !== 'PUBLIC'"
            >
                <sdxw-select-group-user
                    :users.sync="shareForm.selectedUsers"
                    :groups.sync="shareForm.selectedGroups"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import SdxwSelectGroupUser from '@sdx/widget/components/select-group-user';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import ElRadio from 'element-ui/lib/radio';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxwShareForm',
    mixins: [locale],
    data() {
        return {
            authMap: {
                image: 'APPLICATION:GLOBAL_IMAGE_BUTTON:ACCESS:',
                skyflow: 'APPLICATION:GLOBAL_SKYFLOW_BUTTON:ACCESS:',
                model: 'APPLICATION:GLOBAL_MODEL_BUTTON:ACCESS:',
                dataset: 'APPLICATION:GLOBAL_DATASET_BUTTON:ACCESS:',
                file: 'APPLICATION:GLOBAL_FILE_BUTTON:ACCESS:',
            },
            shareForm: {
                selectedUsers: [...this.defaultUsers],
                selectedGroups: [...this.defaultGroups],
                shareType: this.defaultShareType
            }
        };
    },
    components: {
        SdxwSelectGroupUser,
        ElForm,
        ElFormItem,
        ElRadio
    },
    directives: {
        auth
    },
    props: {
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
        },
        sync: {
            type: Boolean,
            default: true
        },
        labelWidth: {
            type: String,
            default: '110px'
        }
    },
    methods: {
        getShareConfig() {
            return this.shareForm;
        },
        reset() {
            this.shareForm = {
                selectedUsers: [],
                selectedGroups: [],
                shareType: 'PRIVATE'
            };
        },
        updateShareType(val) {
            this.shareForm = Object.assign({}, this.shareForm, {shareType: val});
        }
    },
    watch: {
        defaultUsers: {
            immediate: true,
            handler(val) {
                this.shareForm = Object.assign({}, this.shareForm, {selectedUsers: val});
            }
        },
        defaultGroups: {
            immediate: true,
            handler(val) {
                this.shareForm = Object.assign({}, this.shareForm, {selectedGroups: val});
            }
        },
        defaultShareType: {
            immediate: true,
            handler(val) {
                this.shareForm = Object.assign({}, this.shareForm, {shareType: val});
            }
        },
        shareForm: {
            deep: true,
            handler(val) {
                if (this.sync) {
                    this.$emit('update:defaultUsers', val.selectedUsers);
                    this.$emit('update:defaultGroups', val.selectedGroups);
                    this.$emit('update:defaultShareType', val.shareType);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
