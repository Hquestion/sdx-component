<template>
    <div class="sky-notebook-bar">
        <SdxuButton @click="saveNotebook">
            保存
        </SdxuButton>
        <SdxuButton @click="insertCodeCell">
            +Code
        </SdxuButton>
        <SdxuButton @click="insertMarkdownCell">
            +Markdown
        </SdxuButton>
        <SdxuButton @click="insertRawCell">
            +Raw
        </SdxuButton>
        <SdxuButton @click="toggleMode('code')">
            切换为Code
        </SdxuButton>
        <SdxuButton @click="toggleMode('markdown')">
            切换为Markdown
        </SdxuButton>
        <SdxuButton @click="toggleMode('raw')">
            切换为Raw
        </SdxuButton>
        <SdxuButton @click="clearOutput">
            清除输出
        </SdxuButton>
        <SdxuButton @click="runNotebook">
            运行全部
        </SdxuButton>
        <SdxuButton @click="debugByCell">
            调试
        </SdxuButton>
        <sdxu-button
            placement="right"
            trigger="click"
            style="margin-right: 10px;"
        >
            添加代码片段
            <template slot="dropdown">
                <SdxuButton
                    type="text"
                    size="regular"
                    block
                    v-for="(item, index) in sinppets"
                    :key="index"
                    @click="addSnippet(item)"
                >
                    {{ item.name }}
                </SdxuButton>
            </template>
        </sdxu-button>
    </div>
</template>

<script>
import { saveFile, readFile } from '@sdx/utils/src/api/file';
import sinppets from '../../config/snippets';
import SkyCodeCellModel from '../../model/CodeCell';

export default {
    name: 'SkyNotebookBar',
    data() {
        return {
            sinppets
        };
    },
    inject: {
        snb: {
            default: {}
        }
    },
    methods: {
        saveNotebook() {
            this.snb.save();
        },
        insertCodeCell() {
            this.snb.insertCell('code');
        },
        addSnippet(item) {
            this.snb.insertCell('code', new SkyCodeCellModel({
                source: item.code
            }));
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
        },
        runNotebook() {
            this.snb.runNotebook();
        },
        debugByCell() {
            this.snb.debugByCell();
        }
    },
};
</script>

<style scoped>

</style>
