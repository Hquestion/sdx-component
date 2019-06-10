<template>
    <div class="sdxw-file-select-pop">
        <el-popover
            ref="filePopover"
            placement="right"
            width="340"
            trigger="click"
            :visible-arrow="false"
            popper-class="sdxw-file-select-pop__overlay"
            @hide="handleHide"
        >
            <SdxwFileSelectMain
                :user-id="userId"
                :root-path="rootPath"
                :accept="accept"
                :limit="limit"
                :tree-options="treeOptions"
                :checkable="checkable"
                :check-type="checkType"
                v-model="checked"
                @cancel="handleCancel"
                @confirm="handleConfirm"
            />
            <div
                slot="reference"
                class="sdxw-file-select-pop__ref"
                v-if="!noRef"
            >
                <slot>
                    <SdxuButton size="small">
                        选择文件
                    </SdxuButton>
                </slot>
            </div>
        </el-popover>
    </div>
</template>

<script>
import SdxwFileSelectMain from './FileSelectMain';
import SdxuButton from '@sdx/ui/components/button';
import emitter from '@sdx/utils/src/mixins/emitter';
import { Popover } from 'element-ui';
export default {
    name: 'SdxwFileSelectPop',
    mixins: [emitter],
    components: {
        SdxuButton,
        SdxwFileSelectMain,
        [Popover.name]: Popover
    },
    data() {
        return {
            checked: []
        };
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        noRef: {
            type: Boolean,
            default: false
        },
        preventHideEvent: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            default: ''
        },
        rootPath: {
            type: String,
            default: '/'
        },
        accept: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 1 // -1表示不限制
        },
        treeOptions: {
            type: Object,
            default: null
        },
        checkable: {
            type: Boolean,
            default: true
        },
        checkType: {
            type: String,
            default: 'all' // 'file', 'folder'
        }
    },
    methods: {
        handleCancel() {
            this.close();
            this.$emit('cancel');
        },
        handleConfirm() {
            this.$emit('input', this.checked);
            this.close();
            this.$emit('confirm');
        },
        open() {
            this.$refs.filePopover.doShow();
        },
        close() {
            this.$refs.filePopover.doClose();
        },
        handleHide() {
            if (this.preventHideEvent) return;
            this.dispatch('ElFormItem', 'el.form.blur');
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(val) {
                this.checked = val;
            }
        }
    },
    mounted() {

    }
};
</script>

<style lang="scss" scoped>

</style>
