<template>
    <div class="sky-editor-adaptor">
        <component
            :is="editor"
            :file="file"
        />
    </div>
</template>

<script>
import SkyNotebook from '../notebook/SkyNotebook';
import SkyEditor from './SkyEditor';
import { isSNbSupport, isCMSupport } from '../../config/supportMimeTypes';

export default {
    name: 'SkyEditorAdaptor',
    components: {
        SkyNotebook,
        SkyEditor
    },
    props: {
        file: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        editor() {
            if (isSNbSupport(this.file)) {
                return 'SkyNotebook';
            } else {
                return 'SkyEditor';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .sky-editor-adaptor {
        height: 100%;
        overflow: auto;
    }
</style>
