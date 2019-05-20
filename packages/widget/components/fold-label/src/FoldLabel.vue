<template>
    <div
        class="sdxw-fold-label"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut"
        :class="[
            fold ? 'is-fold' : '',
            ellipse ? 'is-ellipse': '',
            plain ? 'is-plain': '',
            `sdxw-fold-label--${type}`
        ]"
    >
        <i
            class="sdx-icon sdx-icon-loading sdxw-fold-label__loading-icon"
            v-if="status ==='loading'"
        />
        <i
            class="sdx-icon sdx-icon-gantanhao sdxw-fold-label__warning-icon"
            v-if="status ==='warning'"
        />
        <span class="sdxw-fold-label__main">
            <slot>
                <i
                    v-if="ellipse"
                    class="sdx-icon sdx-icon-more"
                />
                <span v-else>{{ labelShown }}</span>
            </slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'SdxwFoldLabel',
    data() {
        return {};
    },
    // inject: ['control'],
    props: {
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'primary' // primary, default, create, processing, running, finish, dying, die, exception, error
        },
        fold: {
            type: Boolean,
            default: false
        },
        ellipse: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: '' // loading, warning
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
            // this.control.expand = [this.index];
            this.$emit('expand', [this.index]);
        },
        onMouseOut() {
            if (this.ellipse) return;
            // this.control.expand = [0, 1];
            this.$emit('expand', [0, 1]);
        }
    }
};
</script>
