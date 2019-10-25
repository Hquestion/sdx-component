<template>
    <div class="sdxu-lazy-list">
        <SdxuScroll
            @handle-scroll="handleScroll"
            ref="scrollbar"
        >
            <div
                class="sdxu-lazy-list__container"
                :style="{height: loadedCount*itemHeight + 'px'}"
                v-loading="loading"
            >
                <div
                    class="sdxu-lazy-list__top-holder"
                    :style="{height: topHeight}"
                />
                <div
                    class="sdxu-lazy-list__item"
                    :class="[itemClass]"
                    v-for="(item, index) in renderData"
                    :key="itemKey && item[itemKey] || index"
                    :style="{height: itemHeight + 'px'}"
                >
                    <slot
                        :data="item"
                        :index="index"
                    />
                </div>
                <div
                    class="sdxu-lazy-list__bottom-holder"
                    :style="{height: bottomHeight}"
                >
                    <!--                    <div-->
                    <!--                        class="sdxu-lazy-list__loading"-->
                    <!--                        v-show="loading"-->
                    <!--                    >-->
                    <!--                        <i class="sdx-icon sdx-icon-loading" />加载中...-->
                    <!--                    </div>-->
                </div>
                <SdxuEmpty v-show="!loading && list.length === 0" />
            </div>
        </SdxuScroll>
    </div>
</template>

<script>
import SdxuScroll from '@sdx/ui/components/scroll';
import SdxuEmpty from '@sdx/ui/components/empty';
import throttle from '@sdx/utils/src/helper/throttle';
export default {
    name: 'SdxuLazyList',
    data() {
        return {
            total: 0,
            topCount: 0,
            renderCount: 0,
            renderData: [],
            list: [],
            pageIndex: 1,
            loadedCount: 0,
            loading: false
        };
    },
    components: {
        SdxuScroll,
        SdxuEmpty
    },
    props: {
        load: {
            type: Function,
            default: undefined,
            required: true
        },
        itemKey: {
            type: String,
            default: ''
        },
        itemClass: {
            type: String,
            default: ''
        },
        itemHeight: {
            type: Number,
            default: 0,
            required: true
        }
    },
    computed: {
        topHeight() {
            return this.topCount * this.itemHeight + 'px';
        },
        bottomHeight() {
            return (this.total - this.topCount - this.renderCount) * this.itemHeight + 'px';
        }
    },
    methods: {
        init() {
            this.initList();
        },
        reset() {
            this.pageIndex = 1;
            this.list = [];
            this.loadedCount = 0;
            this.initList();
        },
        initList(pageIndex = this.pageIndex) {
            this.pageIndex = pageIndex;
            this.loading = true;
            return this.load(pageIndex).then(({data, total}) => {
                window.console.log(arguments);
                this.list = this.list.concat(data);
                this.total = total;
                this.loadedCount += data.length;
                this.calcCount();
                this.loading = false;
            }, () => {
                this.loading = false;
            });
        },
        calcCount() {
            const target = this.$el;
            const listHeight = this.itemHeight * this.total;
            const viewportHeight = target.offsetHeight;
            const scrollTop = this.$refs.scrollbar.getPosition().scrollTop;
            const topCount = Math.floor(scrollTop / this.itemHeight);
            let bottomCount = Math.floor((listHeight - scrollTop - viewportHeight) / this.itemHeight);
            bottomCount = bottomCount < 0 ? 0 : bottomCount;
            let renderCount = this.total - topCount - bottomCount;
            this.topCount = topCount;
            if (renderCount + topCount > this.loadedCount) {
                renderCount = this.loadedCount - topCount > 0 ? this.loadedCount - topCount : 0;
            }
            this.renderCount = renderCount;
        },
        generateRenderData() {
            this.renderData = Object.freeze(this.list.slice(this.topCount, this.topCount + this.renderCount));
        },
        handleScroll: throttle(() => {
            if (this.loadedCount < this.total) {
                if (this.topCount + this.renderCount > this.loadedCount - 3) {
                    if (this.loading) return;
                    this.initList(this.pageIndex + 1).then(() => {
                        this.calcCount();
                    });
                } else {
                    this.calcCount();
                }
            } else {
                this.calcCount();
            }
        }, 500)
    },
    watch: {
        topCount() {
            this.generateRenderData();
        },
        renderCount() {
            this.generateRenderData();
        },
        list() {
            this.calcCount();
            this.generateRenderData();
        }
    },
    mounted() {
        this.init();
        this.$nextTick(() => {
            this.calcCount();
        });
    }
};
</script>
