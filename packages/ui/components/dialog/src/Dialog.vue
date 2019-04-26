<template>
    <el-dialog
        class="sdxui-dialog"
        :class="size"
        :visible.sync="dialogVisible"
        :fullscreen="fullscreen"
        :top="top"
        :modal="modal"
        :modal-append-to-body="modalAppendToBody"
        :append-to-body="appendToBody"
        :lock-scroll="locakScroll"
        :custom-class="customClass"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :show-close="showClose"
        :before-close="beforeClose"
        center
        @close="dialogClose"
        @closed="dialogClosed"
        @open="dialogOpen"
        @opened="dialogOpened"
    >
        <div
            slot="title"
        >
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <div><slot /></div>
        <div slot="footer">
            <slot name="footer" />
        </div>
    </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui';
export default {
    name: 'SdxuDialog',
    data() {
        return {
            dialogVisible: this.visible
        };
    },
    created() {
    },
    mounted() {

    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [Dialog.name]: Dialog
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
            default: false
        },
        locakScroll: {
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
        }
    }
};
</script>
