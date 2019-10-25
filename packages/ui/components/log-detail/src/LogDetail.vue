<template>
    <div
        class="sdxu-log-detail"
        :class="{'is-dark': isDark}"
        :style="{ height: height }"
        v-loading="loading"
    >
        <div
            v-loading="!loading && preLoading"
            class="sdxu-log-detail__pre-loading"
        />
        <SdxuScroll
            @handle-scroll="handleScroll"
            ref="scroll"
        >
            <div class="sdxu-log-detail__container">
                <span class="sdxu-log-detail__container--content">{{ content }}</span>
            </div>
        </SdxuScroll>
        <div
            v-loading="!loading && sufLoading"
            class="sdxu-log-detail__suf-loading"
        />
    </div>
</template>

<script>
import SdxuScroll from '@sdx/ui/components/scroll';

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
        },
        loading: {
            type: Boolean,
            default: false
        },
        isDark: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleScroll() {
            const vueScroll = this.$refs.scroll.$refs.scroll;
            let scrollPosition = vueScroll.getPosition();
            let viewDom = vueScroll.getCurrentviewDom()[0];

            const scrollInfo = {
                warpHeight: this.$el.clientHeight,
                offsetHeight: viewDom.offsetHeight,
                scrollTop: scrollPosition.scrollTop
            };
            this.$emit('scroll', { scrollInfo });
        }
    }
};
</script>

<style>

</style>
