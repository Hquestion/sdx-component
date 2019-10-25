<template>
    <vuescroll
        ref="scroll"
        :ops="ops"
        @handle-scroll="onScroll"
        @handle-resize="onResize"
        @handle-scroll-complete="onScrollEnd"
    >
        <slot />
    </vuescroll>
</template>

<script>
import vuescroll from 'vuescroll/dist/vuescroll-native';

export default {
    name: 'SdxuScroll',
    components: {
        vuescroll
    },
    data() {
        return {
            ops: {
                vuescroll: {
                    mode: 'native'
                },
                scrollPanel: {},
                rail: {
                    background: '#E4E7ED',
                    opacity: 0.2,
                    size: '6px',
                    specifyBorderRadius: '6px',
                    gutterOfEnds: null,
                    gutterOfSide: '0px',
                    keepShow: false
                },
                bar: {
                    showDelay: 500,
                    onlyShowBarOnScroll: false,
                    keepShow: true,
                    background: '#E4E7ED',
                    opacity: 1,
                    hoverStyle: {
                        background: '#dedede'
                    },
                    specifyBorderRadius: '6px',
                    minSize: false,
                    size: '6px',
                    disable: false,
                }
            }
        };
    },
    methods: {
        onScroll(...rest) {
            this.$emit('handle-scroll', ...rest);
        },
        onResize(...rest) {
            this.$emit('handle-resize', ...rest);
        },
        onScrollEnd(...rest) {
            this.$emit('handle-scroll-complete', ...rest);
        },
        getPosition() {
            return this.$refs.scroll.getPosition();
        }
    },
    mounted() {

    }
};
</script>

<style lang="scss" scoped>

</style>
