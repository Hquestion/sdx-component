<template>
    <div class="sdxu-article-title">
        <span class="sdxu-article-title__main">
            <slot>{{ title }}</slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'SdxuArticleTitle',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>
