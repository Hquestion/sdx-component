<template>
    <SdxuDialog
        :visible.sync="dialogVisible"
        @close="handleCancel"
    >
        <div class="sdxw-task-start-dialog">
            <div class="sdxw-task-start-dialog__tip">
                <i class="sdx-icon sdx-icon-warning" />
                <span>
                    请选择启动的镜像
                </span>
            </div>
            <el-radio-group
                v-model="selectImage"
                class="sdxw-task-start-dialog__radio"
            >
                <el-radio
                    v-if="autoImage"
                    :label="true"
                >
                    中间镜像: {{ autoImage.image_update_time }}
                </el-radio>
                <el-radio
                    v-if="image"
                    :label="false"
                >
                    基础镜像: {{ image.image_name }}
                </el-radio>
            </el-radio-group>
        </div>
        <template
            #footer
        >
            <SdxuButton
                type="default"
                @click="handleCancel"
                size="small"
            >
                取 消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="handleConfirm"
            >
                确 认
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import ElRadio from 'element-ui/lib/radio';
import ElRadioGroup from 'element-ui/lib/radio-group';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';

export default {
    name: 'SdxwTaskStartDialog',
    components: {
        ElRadio,
        ElRadioGroup,
        SdxuDialog,
        SdxuButton
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        autoImage: {
            type: Object,
            default: null
        },
        image: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            selectImage: false
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
