<template>
    <div class="sdxu-article-title">
        <div
            class="sdxu-article-title__main"
            @click.capture="switchExpand"
            :class="expandable ? 'hoverable' : ''"
        >
            <slot>{{ title }}</slot>
            <span
                class="sdxu-article-title__main--icon"
                v-if="expandable"
            >
                <SdxuIconButton
                    :icon="expandedTemp ? 'sdx-icon sdx-icon-arrow-down' : 'sdx-icon sdx-icon-arrow-right'"
                    size="small"
                />
            </span>
        </div>
        <div class="sdxu-article-title__right">
            <slot name="right" />
        </div>
    </div>
</template>

<script>
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxuArticleTitle',
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
    components: {
        [IconButton.name]: IconButton
    },
    methods: {
        switchExpand() {
            this.expandedTemp = !this.expandedTemp;
            this.$emit('update:expanded', this.expandedTemp);
        }
    }
};
</script>
