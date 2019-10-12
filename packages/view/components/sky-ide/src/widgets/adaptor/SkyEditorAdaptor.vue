<template>
    <div
        class="sky-editor-adaptor"
        tabindex="1"
    >
        <component
            :is="editor"
            :file="file"
            ref="renderer"
            @modify="handlerModify"
        />
    </div>
</template>

<script>
import SkyNotebook from '../notebook/SkyNotebook';
import SkyEditor from './SkyEditor';
import UnsupportedFile from './UnsupportedFile';
import { isSNbSupport, isCMSupport } from '../../config/supportMimeTypes';

export default {
    name: 'SkyEditorAdaptor',
    components: {
        SkyNotebook,
        SkyEditor,
        UnsupportedFile
    },
    props: {
        file: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        save() {
            return new Promise(resolve => {
                this.$refs.renderer.save();
                resolve();
            });
        },
        handlerModify(file) {
            this.$emit('modify', file);
        }
    },
    computed: {
        editor() {
            if (isSNbSupport(this.file)) {
                return 'SkyNotebook';
            } else if (isCMSupport(this.file)) {
                return 'SkyEditor';
            } else {
                return 'UnsupportedFile';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .sky-editor-adaptor {
        position: absolute;
        top: 40px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
    }
</style>
