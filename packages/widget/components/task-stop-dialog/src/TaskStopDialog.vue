<template>
    <SdxuDialog
        :visible.sync="dialogVisible"
        @close="handleCancel"
    >
        <div class="sdxw-task-stop-dialog">
            <div class="sdxw-task-stop-dialog__tip">
                <i class="sdx-icon sdx-icon-warning" />
                <span>
                    此操作将终止该任务，是否继续？
                </span>
            </div>
            <el-checkbox
                v-model="isAutoSave"
                class="sdxw-task-stop-dialog__checkbox"
            >
                将当前任务转存为镜像，再次启动此任务时恢复到当前环境
            </el-checkbox>
        </div>
        <template #footer>
            <SdxuButton
                type="default"
                size="small"
                @click="handleCancel"
            >
                取消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="handleConfirm"
            >
                确认
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import ElCheckbox from 'element-ui/lib/checkbox';
import SdxuButton from '@sdx/ui/components/button';

export default {
    name: 'SdxwTaskStopDialog',
    components: {
        SdxuDialog,
        SdxuButton,
        ElCheckbox
    },
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
