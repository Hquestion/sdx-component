<template>
    <SdxwShareSetting
        :visible.sync="dialogVisible"
        :default-users="dataset.users"
        :default-groups="dataset.groups"
        :default-share-type="dataset.isPublic ? 'PUBLIC' : 'PRIVATE'"
        :handler="handleShare"
    />
</template>

<script>
import SdxwShareSetting from '@sdx/widget/components/share-setting';
import { updateDataset } from '@sdx/utils/src/api/dataset';

export default {
    name: 'SdxvDatasetShareDialog',
    components: {
        SdxwShareSetting,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        dataset: {
            type: Object,
            required: true
        }
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
        handleShare(users, groups, shareType) {
            return updateDataset(this.dataset.uuid, {
                users,
                groups,
                isPublic: shareType === 'PRIVATE' ? false : true
            })
                .then(() => {
                    this.$emit('refresh');
                })
                .finally(() => {
                    this.dialogVisible = false;
                });
        }
    }
};
</script>

<style>

</style>
