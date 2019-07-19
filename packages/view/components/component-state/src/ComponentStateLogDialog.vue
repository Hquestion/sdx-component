<template>
    <SdxuDialog
        :title="t('sdxCommon.Log')"
        :visible.sync="dialogVisible"
        :no-footer="true"
        @close="handleClose"
    >
        <SdxwPodLog
            v-if="dialogVisible"
            :pod-name="pod.podName"
            type="system"
        />
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxwPodLog from '@sdx/widget/components/pod-log';

import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvComponentStateLogDialog',
    mixins: [locale],
    components: {
        SdxuDialog,
        SdxwPodLog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        pod: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            opened: false
        };
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
        handleClose() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style>

</style>
