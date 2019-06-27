<template>
    <div class="sdxu-empty">
        <div>
            <svg
                :class="`sdxu-empty--${size}`"
                aria-hidden="true"
            >
                <use :xlink:href="getIconContent('icon', emptyType, emptyContent)" />
            </svg>
        </div>
        <div class="sdxu-empty__desc">
            <slot>{{ getIconContent('content', emptyType, emptyContent) }}</slot>
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
        emptyContent: {
            type: String,
            default: '',
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
        getIconContent(type, emptytype, emptycontent) {
            let [icon, content, res] = ['', '', ''];
            if (emptytype === 'noData') {
                icon = '#sdx-wushuju';
                content = '暂无数据哦'; 
            } else if(emptytype === 'noSearchResult'){
                icon = '#sdx-wusousuojieguo';
                content = '无搜索结果哦';
            } else if (emptytype === 'noNetwork') {
                icon = '#sdx-wuwangluo';
            } else if(emptytype === 'noFound') {
                icon = '#sdx-icon-test';
                content = '哎呀！您所在的页面出现错误';
            } else {
                icon = `#${emptytype}`;
                content = emptycontent;
            }
            if (type === 'icon') {
                res  = icon;
            } else {
                res = content;
            }
            return res;
        }
    }
};
</script>
