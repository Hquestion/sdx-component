<template>
    <SdxuDialog
        class="sdxw-code-editor"
        :confirm-handler="handleSave"
        size="normal"
        :visible.sync="_visible"
        :title="title"
        :confirm-label="t('widget.codeEditor.SaveAndRelease')"
        @open="syncCode"
    >
        <codemirror
            ref="codemirror"
            v-model="mirrorCode"
            :options="editorOptions"
        />
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import { codemirror } from 'vue-codemirror';
import { isFunction } from '@sdx/utils/src/helper/tool';
import { t } from '@sdx/utils/src/locale';
import locale from '@sdx/utils/src/mixins/locale';

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/r/r.js');
require('codemirror/mode/python/python.js');

export default {
    name: 'SdxwCodeEditor',
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
                mode: 'python'
            }
        };
    },
    mixins: [locale],
    components: {
        SdxuDialog,
        codemirror
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: () => t('widget.codeEditor.CodeEditor')
        },
        saveHandler: {
            type: Function,
            default: undefined
        },
        code: {
            type: [String, Function],
            default: ''
        }
    },
    model: {
        prop: 'code',
        event: 'confirm'
    },
    computed: {
        _visible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            }
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
        syncCode() {
            this.mirrorCode = this.code;
        }
    },
    watch: {
        code: {
            immediate: true,
            handler(val) {
                if (isFunction(val)) {
                    const result = val();
                    if (result && result.then) {
                        result.then(res => {
                            this.mirrorCode = res || '';
                        });
                    } else {
                        this.mirrorCode = result || '';
                    }
                } else {
                    this.mirrorCode = val || '';
                }
            }
        }
    }
};
</script>
