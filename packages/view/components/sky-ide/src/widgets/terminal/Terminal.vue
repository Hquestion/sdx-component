<template>
    <div
        class="terminal"
    />
</template>
<script>
import { PageConfig, URLExt } from '@jupyterlab/coreutils';
// @ts-ignore
// __webpack_public_path__ = URLExt.join(PageConfig.getBaseUrl(), 'example/');
// import '@jupyterlab/application/style/index.css';
import '@jupyterlab/terminal/style/index.css';
// import '@jupyterlab/theme-light-extension/style/index.css';
// import '../index.css';

import { DockPanel, Widget } from '@phosphor/widgets';

import { TerminalSession } from '@jupyterlab/services';

import { Terminal } from '@jupyterlab/terminal';
export default {
    name: 'SkyTerminal',
    data(){
        return {};
    },
    mounted() {
        this.initTerminal();
    },
    methods: {
        async initTerminal() {
            let dock = new DockPanel();
            dock.id = 'main';
            // Attach the widget to the dom.
            Widget.attach(dock, this.$el);
          
            // Handle resize events.
            window.addEventListener('resize', () => {
                dock.fit();
            });
            const s1 =  await TerminalSession.startNew();
        
            const term1 = new Terminal(s1, { theme: 'light' });
            term1.title.closable = true;
            dock.addWidget(term1);
        }
    }
};
</script>
