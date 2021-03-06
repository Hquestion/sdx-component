<template>
    <el-dialog
        :class="['sdxu-dialog',
                 `sdxu-dialog--${size}`,
                 `is-${display}`
        ]"
        :visible.sync="dialogVisible"
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
        v-bind="$attrs"
        v-on="$listeners"
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
                    <span>{{ title }}</span>
                    <span
                        class="sdxu-dialog__subtitle"
                        v-if="subtitle"
                    >
                        {{ subtitle }}
                    </span>
                </slot>
            </div>
            <sdxu-icon-button
                v-if="scalable"
                class="sdxu-dialog__scale-handler"
                :icon="dialogFullscreen ? 'sdx-icon sdx-zuixiaohua1' : 'sdx-icon sdx-zuidahua1'"
                @click="toggleFullscreen"
            />
        </div>
        <div><slot /></div>
        <div
            class="sdxu-dialog__footer"
            slot="footer"
            v-if="!noFooter"
        >
            <slot name="footer">
                <SdxuButton
                    type="default"
                    size="large"
                    @click="cancel"
                >
                    {{ cancelLabel }}
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    size="large"
                    @click="confirm"
                >
                    {{ confirmLabel }}
                </SdxuButton>
            </slot>
        </div>
    </el-dialog>
</template>

<script>
import Dialog from 'element-ui/lib/dialog';
import Button from '@sdx/ui/components/button';
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
import locale from '@sdx/utils/src/mixins/locale';
import {t} from '@sdx/utils/src/locale';
export default {
    name: 'SdxuDialog',
    data() {
        return {
            dialogVisible: this.visible,
            dialogFullscreen: false,
            originSize: null
        };
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    mixins:[locale],
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
        subtitle: {
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
            default: '90px'
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
        confirmLabel: {
            type: String,
            default: () => t('ui.button.ok')
        },
        cancelLabel: {
            type: String,
            default: () => t('ui.button.cancel')
        },
        confirmHandler: {
            type: Function,
            default: undefined
        },
        display: {
            type: String,
            default: 'flex' // float, flex
        },
        scalable: {
            type: Boolean,
            default: false
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
        },
        toggleFullscreen() {
            if (!this.dialogFullscreen) {
                if (!this.originSize) {
                    this.originSize = this.$el.querySelector('.el-dialog').getBoundingClientRect();
                }
                this.dialogFullscreen = true;
                this.$el.querySelector('.el-dialog').style.width = window.innerWidth - 80 + 'px';
                this.$el.querySelector('.el-dialog').style.marginTop = 40 + 'px';
                this.$el.querySelector('.el-dialog__body').style.maxHeight = 'calc(100vh - 217px)';
            } else {
                this.dialogFullscreen = false;
                this.$el.querySelector('.el-dialog').style.width = this.originSize.width + 'px';
                this.$el.querySelector('.el-dialog').style.marginTop = 90 + 'px';
                this.$el.querySelector('.el-dialog__body').style.maxHeight = 'calc(100vh - 317px)';
            }
            this.$emit('resize');
        }
    },
    mounted() {

    }
};
</script>
