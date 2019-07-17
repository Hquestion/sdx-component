<template>
    <div
        class="sdxu-log-detail"
        :style="{ height: height }"
    >
        <SdxuScroll
            @mousewheel.native="handleMouseWheel"
            ref="scroll"
        >
            <div class="sdxu-log-detail__container">
                <div
                    v-loading="preLoading"
                    v-if="preLoading"
                    class="sdxu-log-detail__container--pre-loading"
                />
                <span class="sdxu-log-detail__container--content">{{ content }}</span>
                <div
                    v-loading="sufLoading"
                    v-if="sufLoading"
                    class="sdxu-log-detail__container--suf-loading"
                />
            </div>
        </SdxuScroll>
    </div>
</template>

<script>
import SdxuScroll from '@sdx/ui/components/scroll';
import throttle from '@sdx/utils/src/helper/throttle';

export default {
    name: 'SdxuLogDetail',
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
        },
        preLoading: {
            type: Boolean,
            default: false
        },
        sufLoading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleMouseWheel: throttle(function(event) {
            const vueScroll = this.$refs.scroll.$refs.scroll;
            let scrollPosition = vueScroll.getPosition();
            let viewDom = vueScroll.getCurrentviewDom()[0];

            const scrollInfo = {
                warpHeight: this.$el.clientHeight,
                offsetHeight: viewDom.offsetHeight,
                scrollTop: scrollPosition.scrollTop
            };

            this.$emit('scroll', { scrollInfo, event });
        }, 1000, {
            trailing: false
        })
    }
};
</script>

<style>

</style>
