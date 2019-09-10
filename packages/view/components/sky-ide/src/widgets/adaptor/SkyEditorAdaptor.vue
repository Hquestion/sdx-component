<template>
    <div class="sky-editor-adaptor">
        <component
            :is="editor"
            :file="file"
            ref="renderer"
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
        top: 100px;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
