<template>
    <div class="sdxu-button-group">
        <slot />
        <SdxuDropdownTip
            v-if="isCollapse"
            popper-class="sdxu-button-group__popper"
            v-model="visible"
            width="auto"
        >
            <i
                class="sdx-icon sdx-icon-more"
                slot="ref"
            />
            <ul class="sdxu-button-group__collapse">
                <li
                    v-for="(item, index) in collapseButtons"
                    :key="index"
                    @click="handleClick(item)"
                >
                    {{ item.text }}
                </li>
            </ul>
        </SdxuDropdownTip>
    </div>
</template>

<script>
import DropdownTip from '@sdx/ui/components/dropdown-tip';
import debounce from '@sdx/utils/src/helper/debounce';
const MaxVisibleCount = 3;
export default {
    name: 'SdxuButtonGroup',
    componentName: 'SdxuButtonGroup',
    components: {
        SdxuDropdownTip: DropdownTip
    },
    data() {
        return {
            buttons: [],
            visible: false
        };
    },
    computed: {
        isCollapse() {
            return this.buttons.length > MaxVisibleCount;
        },
        collapseButtons() {
            if (this.isCollapse) {
                return this.buttons.slice(MaxVisibleCount - 1).map(button => {
                    button.elm.style.display = 'none';
                    return {
                        icon: button.componentInstance.$options.icon,
                        text: button.elm.innerText.trim(),
                        onClick: button.componentInstance.$listeners.click || function() {}
                    };
                });
            } else {
                return [];
            }
        }
    },
    methods: {
        countChildren() {
            this.buttons = this.$slots.default.filter(button => button.componentInstance && button.componentInstance.$options.componentName === 'SdxuButton');
        },
        handleClick(item) {
            this.visible = false;
            item.onClick();
        }
    },
    created() {
        this.debounceCountChildren = debounce(this.countChildren, 100);
        this.$on('button-add', this.debounceCountChildren);
        this.$on('button-remove', this.debounceCountChildren);
    },
    beforeDestroy() {
        this.$off('button-add');
        this.$off('button-remove');
    }
};
</script>
