<template>
    <div class="sdxu-icon-button-group">
        <slot />
        <el-popover
            placement="right"
            width="400"
            trigger="click"
            popper-class="sdxu-icon-button-group__popper"
        >
            <div class="sdxu-icon-button-group__ellipse">
                <div
                    class="sdxu-icon-button-group__ellipse-item"
                    v-for="(item, index) in hiddenIcons"
                    :key="index"
                >
                    {{ item }}
                </div>
            </div>
            <SdxuIconButton
                slot="reference"
                icon="sdx-icon sdx-icon-more"
                v-if="$slots.default.length > 3"
            />
        </el-popover>
    </div>
</template>

<script>
import SdxuIconButton from '@sdx/ui/components/icon-button';
const MaxShowCount = 3;
export default {
    name: 'SdxuIconButtonGroup',
    data() {
        return {};
    },
    components: {
        SdxuIconButton
    },
    computed: {
        allIconButtons() {
            return this.$slots.default;
        },
        ellipseVisible() {
            return this.allIconButtons.length > MaxShowCount;
        },
        visibleCount() {
            return Math.min(MaxShowCount, this.allIconButtons.length);
        },
        hiddenIcons() {
            if (this.allIconButtons.length > MaxShowCount) {
                return this.allIconButtons.slice(MaxShowCount - 1).map(item => {
                    console.log(item);
                    return item.componentInstance && item.componentInstance.$props.title
                });
            } else {
                return [];
            }
        }
    },
    mounted() {
        console.log(this.allIconButtons);
        if (this.ellipseVisible) {
            this.allIconButtons.forEach((item, index) => {
                item.visible = index < this.visibleCount;
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
