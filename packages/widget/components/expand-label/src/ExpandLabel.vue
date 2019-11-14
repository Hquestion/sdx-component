<template>
    <div
        class="sdxw-expand-label"
    >
        <div
            class="sdxw-expand-label__main"
            @click.capture="switchExpand"
            :class="expandable ? 'hoverable' : ''"
        >
            <span class="sdxw-expand-label__main--text">
                {{ label }}
            </span>
            <span
                class="sdxw-expand-label__main--icon"
                v-if="expandable"
            >
                <SdxuIconButton
                    :icon="expandedTemp ? 'sdx-icon sdx-icon-arrow-down' : 'sdx-icon sdx-icon-arrow-right'"
                    size="small"
                />
            </span>
        </div>
        <div class="sdxw-expand-label__right">
            <slot name="right" />
        </div>
    </div>
</template>

<script>
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxwExpandLabel',
    data() {
        return {
            expandedTemp: this.expanded
        };
    },
    props: {
        label: {
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
