<template>
    <div class="">
        <codemirror
            ref="codemirror"
            v-model="mirrorCode"
            :options="editorOptions"
            @change="handleCodeChange"
        />
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/addon/hint/javascript-hint.js');

export default {
    name: 'CodeEditor',
    data() {
        return {
            mirrorCode: '',
            editorOptions: {
                indentUnit: 4,
                tabSize: 4,
                lineNumbers: true,
                lineWrapping: true,
                spellcheck: true,
                autocorrect: true,
                autofocus: true,
                mode: this.mode
            }
        };
    },
    components: {
        codemirror
    },
    props: {
        saveHandler: {
            type: Function,
            default: undefined
        },
        docItem: {
            type: Object,
            default: null
        },
        code: {
            type: [String, Function],
            default: ''
        },
        mode: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleSave() {
            if (this.saveHandler) {
                return this.saveHandler().then(() => {
                    this.$emit('confirm', this.mirrorCode);
                });
            } else {
                this.$emit('confirm', this.mirrorCode);
                return Promise.resolve();
            }
        },
        handleCodeChange(code) {
            this.$emit('update:code', code);
            if (this.docItem.isEditing) return;
            this.$emit('handleEditing', this.docItem);
        }
    },
    watch: {
        code: {
            immediate: true,
            handler(val) {
                this.mirrorCode = val || '';
            }
        },
        mode: {
            immediate: true,
            handler(val) {
                this.$set(this.editorOptions, 'mode', val);
            }
        }
    }
};
</script>

<style scoped lang="scss">
</style>
