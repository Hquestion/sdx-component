<template>
    <div
        class="sdxw-log-detail"
        :style="{ height: height }"
    >
        <SdxuScroll
            @mousewheel.native="handleMouseWheel"
            ref="scroll"
        >
            <div class="sdxw-log-detail__content">
                {{ content }}
            </div>
        </SdxuScroll>
    </div>
</template>

<script>
import SdxuScroll from '@sdx/ui/components/scroll';

export default {
    name: 'SdxwLogDetail',
    components: {
        SdxuScroll
    },
    props: {
        content: {
            type: String,
            default: ''
        }, 
        height: {
            type: String,
            default: '60vh'
        }
    },
    methods: {
        handleMouseWheel(event) {
            const vueScroll = this.$refs.scroll.$refs.scroll;
            let scrollPosition = vueScroll.getPosition();
            let viewDom = vueScroll.getCurrentviewDom()[0];

            const scrollInfo = {
                warpHeight: this.$el.clientHeight,
                offsetHeight: viewDom.offsetHeight,
                scrollTop: scrollPosition.scrollTop
            };

            this.$emit('scroll', { scrollInfo, event });
        }
    }
};
</script>

<style>

</style>
