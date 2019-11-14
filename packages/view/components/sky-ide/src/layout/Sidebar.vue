<template>
    <SidebarTrack
        class="skyide-sidebar"
        :width="width"
        :height="height"
    >
        <template slot="top">
            <SidebarItem
                v-for="(item, index) in SIDEBAR_TABS"
                :name="item.name"
                :icon="item.icon"
                :label="item.label"
                :key="index"
                :active="app.sidebar.currentTab"
                @toggle="handleTabToggle"
            />
        </template>
        <template slot="bottom">
            <SidebarItem
                v-for="(item, index) in SIDEBAR_WINDOWS"
                :name="item.name"
                :icon="item.icon"
                :label="item.label"
                :key="index"
                :active="app.sidebar.activeWindows"
                @toggle="handleWinToggle"
            />
        </template>
    </SidebarTrack>
</template>

<script>
import SidebarTrack from '../widgets/sidebar/SidebarTrack';
import SidebarItem from '../widgets/sidebar/SidebarItem';
import { SIDEBAR_TABS, SIDEBAR_WINDOWS, SIDEBAR_TERMINAL } from '../config';

export default {
    name: 'Sidebar',
    components: {
        SidebarTrack,
        SidebarItem
    },
    inject: {
        app: {
            default: {}
        }
    },
    data() {
        return {
            SIDEBAR_TABS,
            SIDEBAR_WINDOWS,
            width: 0,
            height: 0
        };
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        active: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleTabToggle(name) {
            // 点击选中的即是移除选中状态，否则则是选中
            if (this.app.sidebar.currentTab === name) {
                this.app.sidebar.currentTab = '';
            } else {
                this.app.sidebar.currentTab = name;
            }
        },
        handleWinToggle(name) {
            let index = this.app.sidebar.activeWindows.findIndex(item => item === name);
            if (index > -1) {
                this.app.sidebar.activeWindows.splice(index, 1);
            } else {
                this.app.sidebar.activeWindows.push(name);
                if (name === SIDEBAR_TERMINAL) {
                    this.$nextTick(() => {
                        this.app.terminal.openTerminal(null, true);
                    });
                }
            }
        },
        calcRect() {
            let { height, width } = this.$el.parentNode.getBoundingClientRect();
            this.width = height;
            this.height = width;
        }
    },
    mounted() {
        this.calcRect();
        window.addEventListener('resize', this.calcRect);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.calcRect);
    }
};
</script>

<style scoped>

</style>
