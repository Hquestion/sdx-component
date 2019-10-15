<template>
    <transition name="sdxu-bubble-fade">
        <div class="sdxu-bubble-tip" v-show="visible">
            <div class="sdxu-bubble-tip__main">
                <i :class="['sdx-icon', icon]"></i>
                <div class="sdxu-bubble-tip__content">
                    {{ content }}
                </div>
            </div>
            <div class="sdxu-bubble-tip__footer">
                <span>{{ timeToClose }}秒后关闭</span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'SdxuBubbleTip',
    data() {
        return {
            timeToClose: 0
        };
    },
    props: {
        type: {
            type: String,
            default: 'warning'
        },
        content: {
            type: String,
            default: ''
        },
        delay: {
            type: Number,
            default: 5
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        icon() {
            const map = {
                warning: 'sdx-icon-warning',
                error: 'sdx-icon-error',
                info: 'sdx-icon-info',
                help: 'sdx-icon-question'
            };
            return map[this.type];
        }
    }
};
</script>
