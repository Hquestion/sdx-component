<template>
    <div
        class="sdxv-icon"
        :class="`sdxv-icon--${iconClass}`"
    >
        <i
            class="sdx-icon"
            :class="['sdx-' + iconClass]"
        />
    </div>
</template>

<script>
export default {
    name: 'TaskIcon',
    data() {
        return {};
    },
    props: {
        iconClass: {
            type: String,
            default: ''
        }
    }
};
</script>
