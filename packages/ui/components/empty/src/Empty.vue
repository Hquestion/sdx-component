<template>
    <div class="sdxu-empty">
        <div v-if="emptyType">
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
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxuEmpty',
    mixins: [locale],
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
                content = this.t('ui.empty.noData');
            } else if(emptytype === 'noSearchResult'){
                icon = '#sdx-wusousuojieguo';
                content = this.t('ui.empty.noSearchResult');
            } else if (emptytype === 'noNetwork') {
                icon = '#sdx-wuwangluo';
            } else if(emptytype === 'noFound') {
                icon = '#sdx-icon-test';
                content = this.t('ui.empty.ErrorInYourPage');
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
