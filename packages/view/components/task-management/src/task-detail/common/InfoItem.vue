<template>
    <div
        class="sdxv-info-container__item sdxv-info-item"
        :class="{ 'is-multi-line': multiLine,
                  'is-strip': strip,
                  'is-whole-line': wholeLine }"
    >
        <div class="sdxv-info-item__label">
            <slot name="label">
                {{ label }}：
            </slot>
        </div>
        <div class="sdxv-info-item__value">
            <slot name="value">
                {{ value || '-' }}
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
        },
        wholeLine: {
            type: Boolean,
            default: false
        }  
    }
};
</script>

<style>

</style>
