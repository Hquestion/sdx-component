<template>
    <div
        class="sdxw-fold-label"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut"
        :class="[
            fold ? 'is-fold' : '',
            ellipse ? 'is-ellipse': '',
            `sdxw-fold-label--${type}`
        ]"
    >
        <i
            v-if="ellipse"
            class="sdx-icon iconicon-more"
        />
        <span v-else>{{ labelShown }}</span>
    </div>
</template>

<script>
export default {
    name: 'SdxwFoldLabel',
    data() {
        return {};
    },
    inject: ['control'],
    props: {
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'primary' // primary, default
        },
        fold: {
            type: Boolean,
            default: false
        },
        ellipse: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        }
    },
    computed: {
        labelShown() {
            if (this.fold) {
                return this.label.slice(0, 1);
            } else {
                return this.label;
            }
        }
    },
    methods: {
        onMouseOver() {
            if (this.ellipse) return;
            this.control.expand = [this.index];
        },
        onMouseOut() {
            if (this.ellipse) return;
            this.control.expand = [0, 1];
        }
    }
};
</script>
