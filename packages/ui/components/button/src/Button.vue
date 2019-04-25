<template>
    <div
        class="sdxu-button"
        @click="handleClick"
    >
        <slot />
    </div>
</template>

<script>
import localeMixin from '@sdx/utils/lib/mixins/locale';
export default {
    name: 'SdxuiButton',
    mixins: [localeMixin],
    data() {
        return {};
    },
    props: {
        size: {
            type: String,
            default: 'medium'
        }
    },
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
};
</script>
