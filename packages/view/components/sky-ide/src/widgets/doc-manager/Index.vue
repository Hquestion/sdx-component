<template>
    <div class="doc-manager">
        <div style="margin-bottom: 20px;">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handlePreview"
                style="display: inline-block; margin-right: 10px;"
                :file-list="fileList"
                :show-file-list="false"
                :auto-upload="false"
            >
                <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                >
                    打开文件
                </el-button>
            </el-upload>
            <el-button
                size="small"
                @click="saveCurrent"
            >
                保存当前
            </el-button>
            <el-button
                size="small"
                @click="saveAll"
            >
                保存全部
            </el-button>
        </div>
        <el-tabs
            v-model="activeDoc"
            type="card"
            closable
            @tab-remove="closeDoc"
            ref="tabs"
        >
            <el-tab-pane
                v-for="(item) in openDocs"
                :key="item.path"
                :name="item.path"
            >
                <span slot="label">
                    {{ item.title }}
                    <span
                        class="editing-state"
                        v-show="item.isEditing"
                    >
                        *
                    </span>
                </span>
                <div>
                    <code-editor
                        :doc-item="item"
                        @handleEditing="handleEditing"
                        :code.sync="item.content"
                        :mode="item.mode"
                        v-if="item.mode && item.mode !== 'txt' && item.mode !== 'sky-notebook'"
                    />
                    <unsupported-file v-if="!item.mode" />
                    <txt-render
                        v-if="item.mode === 'txt'"
                        :doc-item="item"
                        @handleEditing="handleEditing"
                        :code.sync="item.content"
                    />
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            :title="`是否要保存对 ${activeDocItem.title} 的更改?`"
            :visible.sync="dialogVisible"
            width="20%"
            :show-close="false"
            v-if="dialogVisible"
        >
            <span>如果不保存, 更改将丢失。</span>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="saveAndClose"
                >
                    保存
                </el-button>
                <el-button
                    type="primary"
                    @click="cancelSave"
                >
                    不保存
                </el-button>
                <el-button @click="dialogVisible = false">
                    取消
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import CodeEditor from './CodeEditor';
import UnsupportedFile from './UnsupportedFile';
import TxtRender from './TxtRender';
export default {
    data() {
        return {
            activeDoc: '',
            openDocs: [],
            activeDocItem: null,
            dialogVisible: false,
            fileList: []
        };
    },
    components: {
        CodeEditor,
        UnsupportedFile,
        TxtRender
    },
    methods: {
        handlePreview(file) {
            this.addDocFromFile(file);
        },
        switchRender(file) {
            if (!file) return;
            const fileName = file.name;
            if (fileName.includes('.js')) {
                file.mode = 'text/javascript';
            } else if (fileName.includes('.java')) {
                file.mode = 'text/x-java';
            } else if (fileName.includes('.md')) {
                file.mode = 'text/x-markdown';
            } else if (fileName.includes('.txt')) {
                file.mode = 'txt';
            } else if (fileName.includes('.py') || fileName.includes('.ipynb')) {
                file.mode = 'sky-notebook';
            }
        },
        addDocFromFile(file) {
            let reader = new FileReader();
            reader.onload = e => {
                file.content = e.target.result;
                file.title = file.name;
                file.path = file.name;
                this.addDocFromPath(file.path, file);
            };
            reader.readAsText(file.raw);
        },
        saveCurrent() {
            this.saveDoc(this.openDocs.find(item => item.path === this.activeDoc));
        },
        saveAll() {
            this.openDocs.forEach(item => {
                if (item.isEditing) {
                    this.saveDoc(item);
                }
            });
        },
        saveDoc(item) {
            item.isEditing = false;
            this.$refs.tabs.$refs.nav.$forceUpdate();
        },
        cancelSave() {
            this.activeDocItem.isEditing = false;
            this.closeDoc(this.activeDoc);
            this.dialogVisible = false;
        },
        saveAndClose() {
            this.saveDoc(this.activeDocItem);
            this.closeDoc(this.activeDoc);
            this.dialogVisible = false;
        },
        handleEditing(item) {
            item.isEditing = true;
            this.$refs.tabs.$refs.nav.$forceUpdate();
        },
        async addDocFromPath(path, file) {
            if (!path) return;
            // make sure the doc has not been open already
            this.activeDoc = path;
            if (!this.openDocs.find(item => item.path === path)) {
                this.switchRender(file);
                let doc = file ? file : await this.fetchDoc(path);
                this.openDocs.push({
                    ...doc,
                    isEditing: false
                });
                this.activeDoc = doc.path;
            }
        },
        fetchDoc(path) {
            const random = Math.random().toString(3).substring(0, 6);
            return Promise.resolve({
                path: path + random,
                title: 'docTitle' + random,
                content: ''
            });
        },
        closeDoc(target) {
            let tabs = this.openDocs;
            let activeName = this.activeDoc;
            this.activeDocItem = this.openDocs.find(item => item.path === target);
            if (this.activeDocItem.isEditing) {
                this.activeDoc = target;
                this.dialogVisible = true;
            } else {
                if (activeName === target) {
                    tabs.forEach((tab, index) => {
                        if (tab.path === target) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.path;
                            }
                        }
                    });
                }
                this.activeDoc = activeName;
                this.openDocs = tabs.filter(tab => tab.path !== target);
            }
        }
    }
};
</script>

<style scoped lang="scss">
.doc-manager {
    height: 100%;
    width: 100%;
    border: 1px solid red;
}
</style>

<style lang="scss">
.doc-manager {
    .el-tabs__item .el-icon-close {
        margin-left: 15px;
    }
}
</style>
