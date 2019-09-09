<template>
    <div class="SkyTerminal">
        <SdxuButton
            type="primary"
            placement="right"
            @click="addTerminal"
            size="small"
        >
            <i
                class="sdx-icon sdx-icon-plus"
            />
        </sdxubutton>
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
        >
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
                <div
                    ref="terminal"
                    class="terminal"
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import '@jupyterlab/terminal/style/index.css';
import { Widget } from '@phosphor/widgets';
import { TerminalSession } from '@jupyterlab/services';
import { Terminal } from '@jupyterlab/terminal';
import SdxuButton from '@sdx/ui/components/button';
import {Tabs,TabPane} from 'element-ui/lib';
export default {
    name: 'SkyTerminal',
    data(){
        return {
            editableTabsValue: '1',
            editableTabs: [{
                title: 'terminal 1',
                name: '1',
                content: ''
            }],
            tabIndex: 1
        };
    },
    components: {
        SdxuButton,
        [Tabs.name]: Tabs,
        [TabPane.name]: TabPane
    },
    mounted() {
        this.initTerminal();
    },
    methods: {
        async initTerminal() {
            const s =  await TerminalSession.startNew();
            const term = new Terminal(s, { theme: 'dark' });
            // Attach the widget to the dom.
            window.console.log(this.$refs.terminal, 'init');
            Widget.attach(term, this.$refs.terminal[0]);
        },
        async addTerminal () {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: `terminal${this.tabIndex}`,
                name: newTabName,
                content: ''
            });
            this.editableTabsValue = newTabName;
            let s = await TerminalSession.startNew();
            let term = new Terminal(s, { theme: 'dark' });
            Widget.attach(term, this.$refs.terminal[this.$refs.terminal.length - 1]);
        },
        removeTab(targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
    }
};
</script>
