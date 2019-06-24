<template>
    <div class="sdxu-empty">
        <div>
            <i
                class="sdx-icon sdx-icon-warning sdxu-empty__icon"
                v-if="emptyType === 'warning'"
            />
            <svg
                class="icon"
                aria-hidden="true"
            >
                <use xlink:href="#iconwushuju" />
            </svg>
        </div>
        <div class="sdxu-empty__desc">
            <slot>暂无内容</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuEmpty',
    props: {
        emptyType: {
            type: String,
            default: 'noData',
        },
        size: {
            type: String,
            default: 'normal'
        },
    },
    data() {
        return {};
    },
    methods: {
        getIconContent(type) {
            let [icon, content] = ['', ''];
            if (this.emptyType === 'noData') {
                icon = '#sdx-wushuju';
                content = '暂无数据哦';
            } else if(this.emptyType === 'noSearchResult'){
                icon = '#sdx-wusousuojieguo';
                content = '无搜索结果哦';
            } else if (this.emptyType === 'noNetwork') {
                icon = '#sdx-wuwangluo';
            } else if(this.emptyType === 'noFind') {
                icon = '#sdx-icon-test';
                content = '哎呀！您所在的页面出现错误';
            } else {
                icon = 'sdx-icon-warning';
                content = '哎呀！您所在的页面出现错误';
            }
        }
    }
};
</script>
