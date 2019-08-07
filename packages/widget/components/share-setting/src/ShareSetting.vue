<template>
    <sdxu-dialog
        :title="t('widget.shareSetting.title')"
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :confirm-handler="confirmEdit"
    >
        <sdxw-share-form
            :default-users="shareForm.selectedUsers"
            :default-groups="shareForm.selectedGroups"
            :default-share-type="shareForm.shareType"
            :source-kind="sourceKind"
            sync
        />
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import ShareFrom from '@sdx/widget/components/share-form';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxwShareSetting',
    data() {
        return {
            dialogVisible: this.visible,
            shareForm: {
                selectedUsers: [...this.defaultUsers],
                selectedGroups: [...this.defaultGroups],
                shareType: this.defaultShareType
            }
        };
    },
    mixins: [locale],
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [Dialog.name]: Dialog,
        [ShareFrom.name]: ShareFrom
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
                this.handler(this.shareForm.selectedUsers, this.shareForm.selectedGroups, this.shareForm.shareType);
                return Promise.resolve();
            } else {
                this.$emit('confirm-edit', this.shareForm.selectedUsers, this.shareForm.selectedGroups, this.shareForm.shareType);
                return Promise.resolve();
            }
        }
    }
};
</script>
