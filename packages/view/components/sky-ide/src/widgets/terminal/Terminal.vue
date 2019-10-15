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
    props: {
        data: {
            type: Object,
            default: undefined
        },
        index: {
            type: Number,
            default: 1
        }
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
            let terminal;
            if (this.data.session) {
                terminal = await TerminalSession.connectTo(this.data.session.name, {
                    serverSettings: this.app.makeSettings()
                });
            } else {
                terminal = await TerminalSession.startNew({
                    serverSettings: this.app.makeSettings()
                });
            }
            this.$emit('terminalServe', terminal, this.index + 1);
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
