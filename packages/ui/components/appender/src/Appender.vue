<template>
    <div class="sdxu-appender" :class="{'is-block': block}">
        <div
            class="sdxu-appender__prefix"
            v-if="$slots.prefix || prefix"
            @click="handlePrefixClick"
        >
            <slot name="prefix">
                <i :class="['sdx-icon', 'sdxu-appender__icon', prefix]" />
            </slot>
        </div>
        <div class="sdxu-appender__main">
            <slot />
        </div>
        <div
            class="sdxu-appender__postfix"
            v-if="$slots.postfix || postfix"
            @click="handlePostfixClick"
        >
            <slot name="postfix">
                <i :class="['sdx-icon', 'sdxu-appender__icon', postfix]" />
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuAppender',
    data() {
        return {

        };
    },
    props: {
        prefix: {
            type: String,
            default: ''
        },
        postfix: {
            type: String,
            default: ''
        },
        block: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handlePrefixClick() {
            this.$emit('click.pre');
        },
        handlePostfixClick() {
            this.$emit('click.post');
        }
    }
};
</script>

<style scoped>

</style>
