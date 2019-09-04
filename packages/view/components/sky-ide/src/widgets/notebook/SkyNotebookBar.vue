<template>
    <div class="sky-notebook-bar">
        <SdxuButton @click="saveNotebook">保存</SdxuButton>
        <SdxuButton @click="insertCodeCell">+Code</SdxuButton>
        <SdxuButton @click="insertMarkdownCell">+Markdown</SdxuButton>
        <SdxuButton @click="insertRawCell">+Raw</SdxuButton>
        <SdxuButton @click="toggleMode('code')">切换为Code</SdxuButton>
        <SdxuButton @click="toggleMode('markdown')">切换为Markdown</SdxuButton>
        <SdxuButton @click="toggleMode('raw')">切换为Raw</SdxuButton>
        <SdxuButton @click="clearOutput">清除输出</SdxuButton>
    </div>
</template>

<script>
import { saveFile, readFile } from '@sdx/utils/src/api/file';

export default {
    name: 'SkyNotebookBar',
    inject: {
        snb: {
            default: {}
        }
    },
    methods: {
        saveNotebook() {
            saveFile(JSON.stringify(this.snb.notebook), this.snb.file.path, this.snb.file.ownerId).then(res => {
                alert('保存成功');
            });
        },
        insertCodeCell() {
            this.snb.insertCell('code');
        },
        insertMarkdownCell() {
            this.snb.insertCell('markdown');
        },
        insertRawCell() {
            this.snb.insertCell('raw');
        },
        toggleMode(type) {
            this.snb.changeCellType(type);
        },
        clearOutput() {
            if (this.snb.activeCell) {
                this.snb.activateCell.outputs = [];
                this.snb.cellMap[this.snb.activeCellOrder].model.outputs.clear();
            }
        }
    },
};
</script>

<style scoped>

</style>
