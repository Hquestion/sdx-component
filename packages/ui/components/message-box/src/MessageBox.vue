<template>
    <transition name="sdxu-msgbox-fade">
        <div
            class="sdxu-message-box__wrap"
            v-show="visible"
        >
            <transition name="sdxu-msgbox-jump">
                <div
                    class="sdxu-message-box"
                    :class="[
                        `sdxu-message-box--${status}`,
                        `is-${type}`
                    ]"
                    v-show="visible"
                >
                    <div
                        class="sdxu-message-box__icon-close"
                        @click="close"
                    >
                        <i class="el-icon el-icon-close" />
                    </div>
                    <div class="sdxu-message-box__header">
                        <i
                            class="sdx-icon"
                            :class="[statusIconMap[status]]"
                        />
                        <span>{{ title }}</span>
                    </div>
                    <div class="sdxu-message-box__main">
                        <slot name="content">
                            {{ content }}
                        </slot>
                    </div>
                    <div class="sdxu-message-box__footer" v-if="type !== 'custom'">
                        <SdxuButton
                            type="default"
                            @click="handleCancel"
                            v-if="type==='confirm'"
                        >
                            {{ t('sdxCommon.Cancel') }}
                        </SdxuButton>
                        <SdxuButton
                            type="primary"
                            @click="handleConfirm"
                        >
                            {{ t('sdxCommon.Confirm') }}
                        </SdxuButton>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import Button from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxuMessageBox',
    data() {
        return {
            statusIconMap: {
                error: 'sdx-icon-error',
                success: 'sdx-icon-success',
                info: 'sdx-icon-info',
                warning: 'sdx-icon-warning'
            }
        };
    },
    components: {
        [Button.name]: Button
    },
    mixins: [locale],
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'confirm' // alert, confirm, custom
        },
        status: {
            type: String,
            default: 'error' // error, success, warning, info
        },
        visible: {
            type: Boolean,
            default: false
        },
        lock: {
            type: [Boolean, String, Object],
            default: true
        },
        hideOnRouting: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
        },
        handleConfirm() {
            this.$emit('confirm');
        },
        close() {
            this.$emit('close');
        }
    }
};
</script>
