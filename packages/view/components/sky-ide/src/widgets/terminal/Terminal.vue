<template>
    <div class="terminal" />
</template>

<script>
import { Widget } from '@phosphor/widgets';
import { TerminalSession } from '@jupyterlab/services';
import { Terminal } from '@jupyterlab/terminal';

export default {
    name: 'Terminal',
    data(){
        return {
        };
    },
    mounted() {
        this.createTerminal();
    },
    methods: {
        async createTerminal() {
            this.$emit('terminalReady', false);
            const terminal = await TerminalSession.startNew();
            this.$emit('terminalServe', terminal);
            const term = new Terminal(terminal, { theme: 'dark' });
            Widget.attach(term, this.$el);
            this.$emit('terminalReady', true);
        }
    }
};
</script>
<style lang="scss" scoped>
    .terminal {
        width: 100%;
        height: 100%;
    }

</style>