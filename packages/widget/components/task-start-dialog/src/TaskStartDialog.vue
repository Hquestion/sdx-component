<template>
    <SdxuDialog
        :visible.sync="dialogVisible"
        @close="handleCancel"
        display="float"
    >
        <div class="sdxw-task-start-dialog">
            <div class="sdxw-task-start-dialog__tip">
                <i class="sdx-icon sdx-icon-warning" />
                <span>
                    {{ t('view.task.selectImage') }}
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
                    {{ t('view.task.TemporalImage') }}: {{ autoImage.updatedAt && dateFormatter(autoImage.updatedAt) || '' }}
                </el-radio>
                <el-radio
                    v-if="image"
                    :label="false"
                >
                    {{ t('view.task.BasicImage') }}: {{ image.name }}
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
import ElRadio from 'element-ui/lib/radio';
import ElRadioGroup from 'element-ui/lib/radio-group';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';
import { dateFormatter } from '@sdx/utils/src/helper/transform';

export default {
    name: 'SdxwTaskStartDialog',
    mixins: [locale],
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
        },
        dateFormatter(date) {
            return dateFormatter(date);
        }
    }
};
</script>

<style>

</style>
