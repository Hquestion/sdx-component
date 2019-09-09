<template>
    <div class="sky-editor">
        <codemirror
            ref="codemirror"
            v-model="code"
            :options="editorOptions"
            @change="handleCodeChange"
        />
    </div>
</template>

<script>
require('codemirror/mode/python/python.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/r/r.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/javascript/javascript.js');

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import { readFile, saveFile } from '@sdx/utils/src/api/file';
import { findFileMode, findModeByName } from '../../config/supportMimeTypes';

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');

let _resolve;

export default {
    name: 'SkyEditor',
    components: {
        codemirror
    },
    data() {
        return {
            code: '',
            editorOptions: {
                indentUnit: 4,
                tabSize: 4,
                lineNumbers: true,
                lineWrapping: false,
                spellcheck: true,
                autocorrect: true,
                autofocus: true
            },
            ready: new Promise(resolve => _resolve = resolve)
        };
    },
    props: {
        file: {
            type: Object,
            default: null
        },
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'python'
        }
    },
    methods: {
        async readFile(file) {
            await this.ready;
            this.code = await readFile(file.path, file.ownerId);
            this.$forceUpdate();
        },
        async setMode(file) {
            await this.ready;
            if (file) {
                let mode = findFileMode(file);
                this.$set(this.editorOptions, 'mode', mode.mime);
                // this.$refs.codemirror.editor.setOption('mode', mode.mime);
                // FIXME 当前不能支持动态加载mode的js文件，需对应的解决方案
                // CodeMirror.autoLoadMode(this.$refs.codemirror.editor, mode);
                require(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
            } else {
                let mode = findModeByName(this.type);
                this.editorOptions.mode = mode.mime;
                // FIXME 当前不能支持动态加载mode的js文件，需对应的解决方案
                require(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
            }
        },
        async save() {
            if (this.file) {
                return await saveFile(this.code, this.file.path, this.file.ownerId);
            } else {
                this.$emit('input', this.code);
                return await this.code;
            }
        },
        handleCodeChange() {
            this.$emit('modify', this);
        }
    },
    watch: {
        file: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val && val.path) {
                    this.readFile(val);
                    this.setMode(val);
                }
            }
        },
        value: {
            immediate: true,
            handler(val) {
                if (!this.file) {
                    this.code = val;
                    this.setMode();
                }
            }
        },
        type() {
            this.setMode();
        }
    },
    mounted() {
        _resolve();
    },
    beforeDestroy() {
        _resolve = null;
    }
};
</script>

<style lang="scss" scoped>
    .sky-editor {
        position: relative;
        height: 100%;
        & /deep/ .vue-codemirror {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
        }
    }
</style>
