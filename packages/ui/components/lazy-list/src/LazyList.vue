<template>
    <div class="sdxu-lazy-list">
        <SdxuScroll
            @handle-scroll="handleScroll"
            ref="scrollbar"
        >
            <div
                class="sdxu-lazy-list__container"
                :style="{height: total*itemHeight + 'px'}"
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
                    <div
                        class="sdxu-lazy-list__loading"
                        v-show="loading"
                    >
                        <i class="sdx-icon sdx-icon-loading" />加载中...
                    </div>
                </div>
            </div>
        </SdxuScroll>
    </div>
</template>

<script>
import Dexie from 'dexie';
import SdxuScroll from '@sdx/ui/components/scroll';
import throttle from '@sdx/utils/src/helper/throttle';
export default {
    name: 'SdxuLazyList',
    data() {
        return {
            total: 0,
            topCount: 0,
            renderCount: 0,
            renderData: [],
            pageIndex: 1,
            loadedCount: 0,
            loading: false
        };
    },
    components: {
        SdxuScroll
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
        },
        storeKeys: {
            type: String,
            default: ''
        },
        storeName: {
            type: String,
            default: ''
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
            this.initDB();
            this.initList();
        },
        reset() {
            this.pageIndex = 1;
            this.db[this.storeName].clear();
            this.initList();
        },
        initDB() {
            const db = new Dexie('SdxulazyList' + +new Date());
            db.version(1).stores({
                [this.storeName]: '++,' + this.storeKeys
            });
            // db[this.storeName].clear();
            this.db = db;
        },
        initList(pageIndex = this.pageIndex) {
            this.pageIndex = pageIndex;
            this.loading = true;
            return this.load(pageIndex).then(({data, total}) => {
                this.db[this.storeName].bulkAdd(data).then(() => {
                    this.calcCount();
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    // eslint-disable-next-line
                    console.error(err);
                });
                this.total = total;
                this.loadedCount += data.length;
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
            const bottomCount = Math.floor((listHeight - scrollTop - viewportHeight) / this.itemHeight);
            let renderCount = this.total - topCount - bottomCount;
            this.topCount = topCount;
            if (renderCount + topCount > this.loadedCount) {
                renderCount = this.loadedCount - topCount > 0 ? this.loadedCount - topCount : 0;
            }
            this.renderCount = renderCount;
        },
        async generateRenderData() {
            this.renderData = Object.freeze(await this.db[this.storeName].offset(this.topCount).limit(this.renderCount).toArray());
        },
        handleScroll() {
            throttle(() => {
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
            }, 500)();
        }
    },
    watch: {
        topCount() {
            this.generateRenderData();
        },
        renderCount() {
            this.generateRenderData();
        }
    },
    mounted() {
        this.init();
    }
};
</script>
