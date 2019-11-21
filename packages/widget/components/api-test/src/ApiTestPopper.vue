<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.model.Online_testing')"
        class="sdxv-online-testing"
        width="720px"
    >
        <SdxwApiTest
            :service-id="serviceId"
            :meta="meta"
        />
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxwApiTest from './ApiTest';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'ApiTestPopper',
    mixins: [locale],
    components: {
        SdxwApiTest,
        SdxuDialog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        serviceId: {
            type: String,
            default: ''
        },
        meta: {
            type: Object,
            default: () => {}
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
};
</script>
