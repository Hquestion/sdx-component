<template>
    <SdxuDialog
        :visible.sync="dialogVisible"
        @close="handleCancel"
    >
        <div class="sdxw-task-stop-dialog">
            <div class="sdxw-task-stop-dialog__tip">
                <i class="sdx-icon sdx-icon-warning" />
                <span>
                    {{ t('view.task.killTask') }}
                </span>
            </div>
            <el-checkbox
                v-model="isAutoSave"
                class="sdxw-task-stop-dialog__checkbox"
            >
                {{ t('view.task.saveIntoImage') }}
            </el-checkbox>
        </div>
        <template #footer>
            <SdxuButton
                type="default"
                size="small"
                @click="handleCancel"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="handleConfirm"
            >
                {{ t('sdxCommon.Confirm') }}
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import ElCheckbox from 'element-ui/lib/checkbox';
import SdxuButton from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxwTaskStopDialog',
    components: {
        SdxuDialog,
        SdxuButton,
        ElCheckbox
    },
    mixins: [locale],
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isAutoSave: false
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
        handleConfirm() {
            this.$emit('confirm');
        },
        handleCancel() {
            this.$emit('cancel');
        }
    }
};
</script>

<style>

</style>
