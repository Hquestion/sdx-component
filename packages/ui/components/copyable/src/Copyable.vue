<template>
    <div
        class="sdxu-copyable"
        @click="handleClick"
        :class="{'is-default': isDefault, 'is-inner': isInner}"
    >
        <template v-if="isDefault">
            <slot />
        </template>
        <template v-else-if="isAppender">
            <SdxuAppender>
                <slot />
                <SdxuButton
                    type="default"
                    slot="postfix"
                    @click="handleIconClick"
                >
                    <i class="sdx-icon sdx-caozuofuzhi" />
                </SdxuButton>
            </SdxuAppender>
        </template>
        <template v-else-if="isInner">
            <slot />
        </template>
        <div class="sdxu-copyable__icon" v-if="isInner">
            <SdxuIconButton
                icon="sdx-icon sdx-caozuofuzhi"
                @click="handleIconClick"
            />
        </div>
    </div>
</template>

<script>
import SdxuAppender from '@sdx/ui/components/appender';
import SdxuButton from '@sdx/ui/components/button';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import VueClipboard from 'vue-clipboard2';
import Vue from 'vue';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

export default {
    name: 'SdxuCopyable',
    components: {
        SdxuAppender,
        SdxuButton,
        SdxuIconButton
    },
    props: {
        type: {
            type: String,
            default: 'default' // default, appender, inner
        },
        content: {
            type: String,
            default: ''
        }
    },
    computed: {
        isDefault() {
            return this.type === 'default';
        },
        isAppender() {
            return this.type === 'appender';
        },
        isInner() {
            return this.type === 'inner';
        }
    },
    methods: {
        handleClick() {
            if (this.isDefault) {
                this.$copyText(this.content);
            } else {
                this.$emit('click');
            }
        },
        handleIconClick() {
            this.$copyText(this.content);
        }
    }
};
</script>

<style scoped>

</style>
