<template>
    <div
        class="sdxu-codepan"
        :class="{'is-light': light}"
    >
        <codemirror
            ref="codemirror"
            v-model="code"
            :options="editorOptions"
            @input="handleCodeChange"
        />
    </div>
</template>

<script>
require('codemirror/mode/python/python.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/r/r.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/shell/shell');

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import { readFile, saveFile } from '@sdx/utils/src/api/file';
import { findFileMode, findModeByName } from '@sdx/utils/src/helper/codemirrorMode';

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');

let _resolve;

export default {
    name: 'SdxuCodepan',
    components: {
        codemirror
    },
    data() {
        return {
            code: '',
            ready: new Promise(resolve => _resolve = resolve),
            initiated: false
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
            type: [String, Object],
            default: 'python'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'seti'
        },
        light: {
            type: Boolean,
            default: false
        },
        lineNumbers: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        editorOptions() {
            return {
                indentUnit: 4,
                tabSize: 4,
                lineNumbers: this.lineNumbers,
                lineWrapping: false,
                spellcheck: true,
                autocorrect: true,
                autofocus: true,
                theme: this.light ? 'default' : this.theme,
                readOnly: this.readonly ? 'nocursor' : false,
            };
        },
    },
    methods: {
        async readFile(file) {
            if (this.initiated) return;
            let code = await readFile(file.path, file.ownerId);
            await this.ready;
            this.code = code + '';
            this.$forceUpdate();
            this.$nextTick(() => {
                this.initiated = true;
                this.$refs.codemirror.refresh();
            });
        },
        async setMode(file) {
            await this.ready;
            if (file) {
                let mode = findFileMode(file);
                this.$set(this.editorOptions, 'mode', mode.mime);
                // this.$refs.codemirror.editor.setOption('mode', mode.mime);
                // FIXME 当前不能支持动态加载mode的js文件，需对应的解决方案
                // CodeMirror.autoLoadMode(this.$refs.codemirror.editor, mode);
                if (file.fileExtension !== '.txt' && mode.mode !== 'null') {
                    require(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
                }
            } else {
                let mode = findModeByName(this.type);
                this.editorOptions.mode = mode.mime;
                // FIXME 当前不能支持动态加载mode的js文件，需对应的解决方案
                if (mode.mode !== 'null') {
                    import(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
                }
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
            if (!this.initiated) return;
            if (this.file) {
                this.$emit('modify', this.file);
            } else {
                this.save();
            }
        },
        refresh() {
            this.$refs.codemirror.refresh();
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
                    this.initiated = true;
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

<style scoped>

</style>
