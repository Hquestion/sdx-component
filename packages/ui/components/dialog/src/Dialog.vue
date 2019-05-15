<template>
    <el-dialog
        :class="['sdxu-dialog',
                 `sdxu-dialog--${size}`]"
        :visible.sync="dialogVisible"
        :fullscreen="fullscreen"
        :top="top"
        :modal="modal"
        :modal-append-to-body="modalAppendToBody"
        :append-to-body="appendToBody"
        :lock-scroll="lockScroll"
        :custom-class="customClass"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :show-close="showClose"
        :before-close="beforeClose"
        :center="!!titleIcon"
        @close="dialogClose"
        @closed="dialogClosed"
        @open="dialogOpen"
        @opened="dialogOpened"
    >
        <div
            slot="title"
        >
            <svg
                class="sdxu-dialog__icon"
                aria-hidden="true"
                v-if="titleIcon"
            >
                <use :xlink:href="`#${titleIcon}`" />
            </svg>
            <div
                :class="titleIcon ? 'sdxu-dialog__title-with-top-margin' : ''"
            >
                <slot
                    name="title"
                >
                    {{ title }}
                </slot>
            </div>
        </div>
        <div><slot /></div>
        <div
            slot="footer"
            v-if="!noFooter"
        >
            <slot name="footer">
                <SdxuButton
                    type="default"
                    size="small"
                    @click="cancel"
                >
                    取消
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="confirm"
                >
                    确认
                </SdxuButton>
            </slot>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui';
import Button from '@sdx/ui/components/button';
export default {
    name: 'SdxuDialog',
    data() {
        return {
            dialogVisible: this.visible
        };
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'normal'
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        top: {
            type: String,
            default: '15vh'
        },
        modal: {
            type: Boolean,
            default: true
        },
        modalAppendToBody: {
            type: Boolean,
            default: true
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        lockScroll: {
            type: Boolean,
            default: true
        },
        customClass: {
            type: String,
            default: ''
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        beforeClose: {
            type: Function,
            default: (done)=>{done();}
        },
        noFooter: {
            type: Boolean,
            default: false
        },
        titleIcon: {
            type: String,
            default: ''
        },
        confirmHandler: {
            type: Function,
            default: undefined
        }
    },
    methods: {
        dialogClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        dialogClosed() {
            this.$emit('closed');
        },
        dialogOpen() {
            this.$emit('open');
        },
        dialogOpened() {
            this.$emit('opened');
        },
        confirm() {
            if (this.confirmHandler && typeof this.confirmHandler === 'function') {
                this.confirmHandler().then(() => {
                    this.dialogVisible = false;
                    this.$emit('update:visible', false);
                    this.$emit('confirm');
                });
            } else {
                this.dialogVisible = false;
                this.$emit('update:visible', false);
                this.$emit('confirm');
            }
        },
        cancel() {
            this.dialogVisible = false;
            this.$emit('update:visible', false);
            this.$emit('cancel');
        }
    },
    mounted() {
        import('@sdx/utils/src/theme-common/iconfont/iconfont.js');
    }
};
</script>
