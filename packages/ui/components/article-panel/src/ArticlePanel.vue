<template>
    <div class="sdxu-article-panel">
        <SdxuArticleTitle
            class="sdxu-article-panel__title"
            :title="title"
            :expandable="expandable"
            :expanded.sync="expandedTemp"
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
        expandable: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        expandedTemp(nVal) {
            this.$emit('update:expanded', nVal);
        }
    }
};
</script>
