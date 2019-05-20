<template>
    <div
        class="sdxw-fold-label-group"
        :class="[
            `sdxw-fold-label-group--${mode}`
        ]"
    >
        <slot>
            <sdxw-fold-label
                v-for="(item, index) in visibleList"
                :key="index"
                :label="item"
                :index="index"
                :type="type"
                :fold="isFold(index)"
                :ellipse="isEllipse(index)"
                @expand="handleExpand"
            />
        </slot>
    </div>
</template>

<script>
import SdxwFoldLabel from './FoldLabel';
import { getParentNode } from '@sdx/utils/src/helper/dom';

export default {
    name: 'SdxwFoldLabelGroup',
    data() {
        return {
            control: {
                expand: [0, 1]
            }
        };
    },
    components: {
        SdxwFoldLabel
    },
    // provide(){
    //     return {
    //         control: this.control
    //     };
    // },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        mode: {
            type: String,
            default: 'list' // inline: 会在一行内展示，宽度依赖外部容器，宽度不足时...展示；list: 会作为列表展示，宽度不足时换行展示
        },
        type: {
            type: String,
            default: 'primary' // primary, default
        },
        inlineMaxShow: {
            type: Number,
            default: 3
        }
    },
    computed: {
        visibleList() {
            if (this.mode === 'inline') {
                return this.list.slice(0, this.inlineMaxShow);
            } else {
                return this.list.slice();
            }
        }
    },
    methods: {
        isEllipse(index) {
            if (this.mode === 'inline') {
                if (this.list.length > this.inlineMaxShow) {
                    return index === this.visibleList.length - 1;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        isFold(index) {
            return this.mode === 'inline' && !this.control.expand.includes(index);
        },
        handleExpand(index) {
            this.control.expand = index;
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.mode === 'list') return;
            const width = this.$el.offsetWidth;
            const pWidth = getParentNode(this.$el).offsetWidth;
            this.$el.style.width = `${Math.min(width, pWidth)}px`;
        });
    }
};
</script>
