<template>
    <div
        class="skyide-sidebar-track"
        :style="style"
    >
        <div class="skyide-sidebar-track__top">
            <slot name="top" />
        </div>
        <div class="skyide-sidebar-track__bottom">
            <slot name="bottom" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarTrack',
    components: {},
    props: {
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 0
        }
    },
    computed: {
        style() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
                transform: `rotate(90deg) translateX(-${this.height}px)`,
                'transform-origin': `0 ${this.height}px`
            };
        }
    }
};
</script>

<style lang="scss" scoped>
    .skyide-sidebar-track {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .skyide-sidebar-track__top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
        }
        .skyide-sidebar-track__bottom {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
        }
    }
</style>
