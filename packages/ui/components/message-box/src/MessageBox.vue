<template>
    <transition name="sdxu-msgbox-fade">
        <div
            class="sdxu-message-box__wrap"
            v-show="visible"
        >
            <transition name="sdxu-msgbox-jump">
                <div class="sdxu-message-box" v-show="visible">
                    <div class="sdxu-message-box__header">
                        <i
                            class="sdx-icon"
                            :class="[statusIconMap[status]]"
                        />
                        <span class="sdxu-message-box__header__title">{{ title }}</span>
                    </div>
                    <div class="sdxu-message-box__main">
                        {{ content }}
                    </div>
                    <div class="sdxu-message-box__footer">
                        <SdxuButton
                            type="default"
                            @click="handleCancel"
                            v-if="type==='confirm'"
                        >
                            取消
                        </SdxuButton>
                        <SdxuButton
                            type="primary"
                            @click="handleConfirm"
                        >
                            确定
                        </SdxuButton>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import Button from '@sdx/ui/components/button';
let scrollTop = 0;
export default {
    name: 'SdxuMessageBox',
    data() {
        return {
            statusIconMap: {
                error: 'iconicon-error',
                success: 'iconicon-success',
                info: 'iconicon-info',
                warning: 'iconicon-warning'
            }
        };
    },
    components: {
        [Button.name]: Button
    },
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
            default: 'confirm' // alert, confirm
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
        }
    }
};
</script>
