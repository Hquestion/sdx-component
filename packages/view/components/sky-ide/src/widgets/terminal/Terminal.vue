<template>
    <div
        class="terminal"
    />
</template>

<script>
import { Widget } from '@phosphor/widgets';
import { TerminalSession } from '@skyide/services';
import { Terminal } from '@jupyterlab/terminal';

export default {
    name: 'Terminal',
    data(){
        return {
            term: null
        };
    },
    inject: ['app'],
    mounted() {
        this.createTerminal();
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        async createTerminal() {
            this.$emit('terminalReady', false);
            await this.app.taskManager.run();
            const terminal = await TerminalSession.startNew({
                serverSettings: {
                    baseUrl: this.app.taskManager.task.externalUrl,
                    wsUrl: this.app.taskManager.task.externalUrl.replace('http://', 'ws://'),
                    ideUuid: this.app.taskManager.ideUuid,
                    WebSocket: WebSocket
                }
            });
            this.$emit('terminalServe', terminal);
            this.term = new Terminal(terminal, { theme: 'dark' });
            Widget.attach(this.term, this.$el);
            this.$emit('terminalReady', true);
        },
        handleResize() { 
            setTimeout(()=> {
                this.term.onFitRequest();
            },400);
        }
    }
};
</script>
<style lang="scss" scoped>
    .terminal {
        width: 100%;
        height: 100%;
        /deep/ {
            .xterm-screen {
                width: 100% !important;
                height: 100% !important;
            }
        }
    }

</style>
