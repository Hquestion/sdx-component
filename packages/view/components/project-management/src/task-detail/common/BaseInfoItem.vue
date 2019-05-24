<template>
    <div
        class="sdxv-info-container__item"
        :class="{ 'is-multi-line': multiLine,
                  'is-strip': strip }"
    >
        <div class="sdxv-info-container__item--label">
            <slot name="label">
                {{ label }}：
            </slot>
        </div>
        <div class="sdxv-info-container__item--value">
            <slot name="value">
                {{ value }}
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        },
        multiLine: {
            type: Boolean,
            default: false
        },
        strip: {
            type: Boolean,
            default: false
        }
            
    }
};
</script>

<style>

</style>
