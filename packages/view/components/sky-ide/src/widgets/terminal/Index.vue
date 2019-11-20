<template>
    <div class="SkyTerminal">
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-remove="removeTab"
            :before-leave="beforeLeave"
        >
            <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.title"
                :label="item.title"
                :name="item.name"
                closable
                lazy
            >
                <span slot="label">
                    <svg
                        class="tab-icon"
                        aria-hidden="true"
                    >
                        <use xlink:href="#sdx-terminalsbiaoqian" />
                    </svg>
                    <span class="title">{{ item.title }}</span>
                </span>
                <TerminalComp
                    ref="terminal"
                    :data="item"
                    :index="index"
                    @terminalReady="terminalReady"
                    @terminalServe="terminalServe"
                />
            </el-tab-pane>
            <el-tab-pane
                key="add"
                name="add"
                :disabled="!ready"
            >
                <span
                    slot="label"
                >
                    <i
                        class="sdx-icon sdx-icon-plus"
                    />
                </span>
            </el-tab-pane>
            <el-tab-pane
                key="close"
                name="close"
            >
                <span
                    slot="label"
                >
                    {{ t('view.skyide.close') }}
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import '@jupyterlab/terminal/style/index.css';
import {Tabs,TabPane} from 'element-ui/lib';
import TerminalComp from './Terminal';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SkyTerminal',
    componentName: 'SkyTerminalPanel',
    mixins: [locale],
    data(){
        return {
            editableTabsValue: '1',
            editableTabs: [],
            tabIndex: 0,
            ready: true,
            tabTerminal: []
        };
    },
    inject: ['app'],
    components: {
        [Tabs.name]: Tabs,
        [TabPane.name]: TabPane,
        TerminalComp
    },
    props: {
        terminal: {
            type: Object,
            default() {
                return {};
            }
        },
    },
    methods: {
        removeTab(targetName) {
            // 判断删除后选中的tab
            let activeName = this.editableTabsValue;
            let index = this.editableTabs.findIndex(item => item.name === targetName);
            // 判断是否删的选中的terminal
            if(activeName === targetName) {
                let nextTab = this.editableTabs[index + 1] || this.editableTabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
            }
            this.editableTabsValue = activeName;
            // 通过关闭tab 关闭 terminal 服务
            let removeIndex = this.tabTerminal.findIndex(item => Object.keys(item)[0] === targetName);
            let terminalServe  = this.tabTerminal[removeIndex][Number(targetName)];
            terminalServe.shutdown({
                name: terminalServe.name,
                settings: this.app.makeSettings()
            }).then(()=> {
                requestAnimationFrame(() => {
                    this.editableTabs.splice(index, 1);
                    this.tabTerminal.splice(removeIndex, 1);
                    // 如果tab关完了，activeWindows也关闭
                    if(this.editableTabs.length === 0) {
                        this.app.sidebar.activeWindows = [];
                        if (Object.keys(this.app.nbSessionMap).length === 0) {
                            return this.app.taskManager.stop();
                        }
                    }
                });
            });
        },
        terminalReady(ready) {
            this.ready = ready;
        },
        // 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
        beforeLeave(currentName) {
            //如果name是add，阻止切换添加tab
            if(currentName === 'add'){
                this.openTerminal();
                return false;
            } else if(currentName === 'close') {
                this.app.sidebar.activeWindows = [];
                return false;
            }
        },
        terminalServe(serve, index) {
            // tabName 与 服务对应
            this.tabTerminal.push({
                [index]: serve
            });
        },
        openTerminal(session, isToggleVisible) {
            if (this.editableTabs.length === 0) {
                this.editableTabsValue= '1';
                this.editableTabs= [];
                this.tabIndex= 0;
                this.ready= true;
                this.tabTerminal= [];
            }
            if (isToggleVisible && this.editableTabs.length > 0) {
                return;
            }
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: `Terminal${this.tabIndex}`,
                name: newTabName,
                content: '',
                session: session || null
            });
            this.editableTabsValue = newTabName;
        },
        handleResize() {
            if (this.$refs.terminal) {
                this.$refs.terminal.forEach(item => {
                    item.handleResize();
                });
            }
        }
    },
    mounted() {
        this.$on('terminalSessionReady', (...rest) => {
            rest.forEach(t => {
                this.openTerminal(t);
            });
        });

    }
};
</script>

<style lang="scss" scoped>
    .SkyTerminal {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        /deep/  {
            .el-tabs, .el-tab-pane, .p-Widget, .jp-Terminal-body{
                height: 100%;
            }
            .el-tabs__nav-wrap {
                background:#2A303E;
            }
            .el-tabs__content {
                height: calc(100% - 42px);
            }
            .el-tabs__header {
                letter-spacing: 0.08px;
                margin: 0;
                border-bottom: 0;
                .el-tabs__nav {
                    width: 100%;
                    position: relative;
                    border: 0;
                    div {
                        height: 40px;
                        line-height: 40px;
                        border: 0;
                        vertical-align: middle;
                        position: relative;
                        .title {
                            color: #DDE5FE;
                        }
                    }
                    .el-tabs__item {
                        font-size: 14px;
                    }
                    .el-tabs__item::after {
                        content: "";
                        display: block;
                        width: 1px;
                        height: 40px;
                        position: absolute;
                        top: 0px;
                        background: #2C395A;
                        right: 0;
                    }
                    .el-tabs__item:last-child {
                        position: absolute;
                        right: 0px;
                        color: #DDE5FE;
                    }
                    .el-icon-close {
                        color: #A0A5B8;
                    }
                    .el-icon-close:before {
                        font-size: 16px;
                    }
                    .el-tabs__item:nth-last-child(2) {
                        color:rgb(160,165,183);
                    }
                    .el-tabs__item.is-active {
                        background: #404859;
                    }
                    .el-tabs__item:last-child::after,.el-tabs__item.is-active::after,.el-tabs__item:nth-last-child(2)::after {
                        width: 0;
                    }
                    .tab-icon {
                        margin-right: 8px;
                        width: 16px;
                        height: 16px;
                        vertical-align: middle;
                    }
                    .el-tabs__item.is-active::before {
                        content: "";
                        display: block;
                        width: 1px;
                        height: 40px;
                        position: absolute;
                        top: 0px;
                        background:#2A303E;
                        left: -1px;
                    }
                }
            }

        }
    }

</style>
