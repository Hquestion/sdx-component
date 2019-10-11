<script>
import {isFunction} from '@sdx/utils/src/helper/tool';

export default {
    name: 'SdxuContextMenu',
    data() {
        return {};
    },
    props: {
        menuGroups: {
            type: Array,
            default: () => []
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.visble = false;
        }
    },
    render(h) {
        let { groups = [] } = this.menuGroups;
        let visible = this.visible;
        const self = this;
        const menuItem = (menu) => {
            let icon = menu.active ? '' : menu.icon;
            let disabled = menu.disabled;

            if (typeof disabled === 'function') {
                disabled = disabled();
            }
            const event = {
                on: {
                    click() {
                        self.close();
                        self.$emit('menu-clicked', menu);
                        if (menu.callback && isFunction(menu.callback)) {
                            menu.callback(menu);
                        }
                    }
                }
            };
            return (
                <div class={{'sdxu-context-menu__item': true, 'is-disable' : disabled}} {...event}>
                    <div class="sdxu-context-menu__item-name">
                        <i class={['sdx-icon', icon]} />
                        <span>{menu.label}</span> 
                    </div>
                    <div class="sdxu-context-menu__item-shortcut">{menu.shortcut}</div>
                </div>
            );
        };
        const separator = <div class="sdxu-context-menu__separator" />;
        return (
            <div class="sdxu-context-menu" style={{display: visible ? 'block' : 'none'}} on={{contextmenu: e => {e.preventDefault();}}}>
                {
                    groups.map((group, index) => {
                        return (
                            <div class="sdxu-context-menu__group">
                                {
                                    index > 0 && (separator)
                                }
                                {
                                    group.menus.map(menu => {
                                        return menuItem(menu);
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};
</script>

<style lang="scss" scoped>

</style>
