<template>
    <div class="sdxu-article-panel">
        <SdxuArticleTitle
            class="sdxu-article-panel__title"
            :title="title"
            :size="size"
            :expandable="expandable"
            :expanded.sync="expandedTemp"
            :show-bar="showBar"
        >
            <slot name="title" />
            <div slot="right">
                <slot name="right" />
            </div>
        </SdxuArticleTitle>
        <div class="sdxu-article-panel__content">
            <slot />
        </div>
    </div>
</template>

<script>
import SdxuArticleTitle from '../../article-title/src/ArticleTitle';
export default {
    name: 'SdxuArticlePanel',
    components: {SdxuArticleTitle},
    data() {
        return {
            expandedTemp: this.expanded
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'middle',
            validator: value => {
                return ['small', 'middle'].includes(value);
            }
        },
        expandable: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean,
            default: false
        },
        showBar: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        expandedTemp(nVal) {
            this.$emit('update:expanded', nVal);
        },
        expanded(nVal) {
            this.expandedTemp = nVal;
        }
    }
};
</script>
