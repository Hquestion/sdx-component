<template>
    <div class="SkyTerminal">
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-remove="removeTab"
            :before-leave="beforeLeave"
        >
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.title"
                :label="item.title"
                :name="item.name"
                closable
            >
                <TerminalComp
                    ref="terminal"
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
        </el-tabs>
    </div>
</template>

<script>
import '@jupyterlab/terminal/style/index.css';
import {Tabs,TabPane} from 'element-ui/lib';
import TerminalComp from './Terminal';
export default {
    name: 'SkyTerminal',
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
        initTerminal() {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: `Terminal${this.tabIndex}`,
                name: newTabName,
                content: ''
            });
            this.editableTabsValue = newTabName;
        },
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
            // 如果tab关完了，activeWindows也关闭
            if(this.editableTabs.length === 1) {
                this.app.sidebar.activeWindows = [];
            }
            // 通过关闭tab 关闭 terminal 服务
            let removeIndex = this.tabTerminal.findIndex(item => Object.keys(item)[0] == targetName);
            let terminalServe  = this.tabTerminal[removeIndex][Number(targetName)];
            terminalServe.shutdown().then(()=> {
                requestAnimationFrame(() => {
                    this.editableTabs.splice(index, 1);
                });
            });
            
            this.tabTerminal.splice(removeIndex, 1);
        },
        terminalReady(ready) {
            this.ready = ready;
        },
        // 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
        beforeLeave(currentName) {
            //如果name是add，阻止切换添加tab
            if(currentName=='add'){
                this.initTerminal();
                return false;
            }
        },
        terminalServe(serve) {
            // tabName 与 服务对应
            this.tabTerminal.push({
                [this.tabIndex]: serve
            });
        }
    },
    watch: {
        'app.terminalVisible': {
            immediate: true,
            deep: true,
            handler(val) {
                if(val && this.editableTabs.length === 0) {
                    this.editableTabsValue= '1',
                    this.editableTabs= [],
                    this.tabIndex= 0,
                    this.ready= true,
                    this.tabTerminal= [];
                    this.initTerminal();
                }
            }
        }
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
            .el-tabs, .el-tabs__content, .el-tab-pane, .p-Widget, .jp-Terminal-body{
                height: 100%;
            }
            .el-tabs__header {
                margin: 0;
            }
        }
    }

</style>