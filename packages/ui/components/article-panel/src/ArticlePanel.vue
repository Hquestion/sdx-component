<template>
    <div class="sdxu-article-panel">
        <SdxuArticleTitle
            class="sdxu-article-panel__title"
            :title="title"
        >
            <slot name="title" />
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
    props: {
        title: {
            type: String,
            default: ''
        },

    }
};
</script>
