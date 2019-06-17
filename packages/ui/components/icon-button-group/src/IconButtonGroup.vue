<template>
    <div class="sdxu-icon-button-group">
        <slot />
        <el-popover
            placement="right-start"
            width="auto"
            trigger="click"
            popper-class="sdxu-icon-button-group__popper"
            v-model="popperVisible"
        >
            <div class="sdxu-icon-button-group__ellipse">
                <div class="sdxu-icon-button-group__ellipse-focus"></div>
                <div
                    class="sdxu-icon-button-group__ellipse-item"
                    v-for="(item, index) in hiddenIcons"
                    :key="index"
                    @click="handleClick(item)"
                >
                    {{ item.title }}
                </div>
            </div>
            <SdxuIconButton
                class="sdxu-icon-button-group__popper-refer"
                slot="reference"
                icon="sdx-icon sdx-icon-more"
                v-show="ellipseVisible"
            />
        </el-popover>
    </div>
</template>

<script>
import SdxuIconButton from '@sdx/ui/components/icon-button';
import debounce from '@sdx/utils/src/helper/debounce';
const MaxShowCount = 3;
export default {
    name: 'SdxuIconButtonGroup',
    componentName: 'SdxuIconButtonGroup',
    data() {
        return {
            hiddenIcons: [],
            allIconButtons: [],
            popperVisible: false
        };
    },
    components: {
        SdxuIconButton
    },
    computed: {
        ellipseVisible() {
            return this.allIconButtons.length > MaxShowCount;
        },
        visibleCount() {
            return Math.min(MaxShowCount, this.allIconButtons.length);
        }
    },
    methods: {
        handleClick(item) {
            this.popperVisible = false;
            item.onClick();
        },
        init() {
            if (!this.$slots.default) return;
            this.allIconButtons = this.$slots.default.filter(item => !!item.componentInstance);
            if (this.ellipseVisible) {
                this.allIconButtons.forEach((item, index) => {
                    item.componentInstance.visible = index < this.visibleCount - 1;
                });
                this.hiddenIcons = this.allIconButtons.slice(MaxShowCount - 1).map(item => {
                    return {
                        title: item.componentInstance && item.componentInstance.title,
                        onClick: item.componentInstance.$listeners.click || function() {}
                    };
                });
            } else {
                this.hiddenIcons = [];
            }
        },
        listenSlotsChange() {
            const syncFn = debounce(this.init, 300);
            this.$on('sdxu.change', syncFn);
        }
    },
    mounted() {
        this.init();
    },
    beforeMount() {
        this.listenSlotsChange();
    },
    beforeDestroy() {
        this.$off('sdxu.change');
    }
};
</script>
