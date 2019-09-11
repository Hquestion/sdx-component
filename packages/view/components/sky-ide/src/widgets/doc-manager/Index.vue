<template>
    <div class="doc-manager">
        <div style="margin-bottom: 20px;">
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
            v-model="activeTab"
            type="card"
            closable
            @tab-remove="closeDoc"
            ref="tabs"
        >
            <el-tab-pane
                v-for="(item) in app.doc.openFiles"
                :key="item.path"
                :name="item.path"
            >
                <span slot="label">
                    {{ item.name }}
                    <span
                        class="editing-state"
                        v-show="item.isEditing"
                    >
                        *
                    </span>
                </span>
                <div>
                    <sky-editor-adaptor
                        :file="item"
                        @modify="handleModify"
                        ref="editor"
                    />
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            :title="`是否要保存对 ${app.doc.currentFile.name} 的更改?`"
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
import SkyEditorAdaptor from '../adaptor/SkyEditorAdaptor';
export default {
    data() {
        return {
            activeTab: '',
            dialogVisible: false
        };
    },
    components: {
        SkyEditorAdaptor
    },
    inject: {
        app: {
            default: () => {}
        }
    },
    methods: {
        saveCurrent() {
            this.saveDoc(this.app.doc.openFiles.find(item => item.path === this.activeTab));
        },
        saveAll() {
            this.app.doc.openFiles.forEach(item => {
                if (item.isEditing) {
                    this.saveDoc(item);
                }
            });
        },
        saveDoc(item) {
            const editor = this.$refs.editor.find(editor => editor.file.path === item.path);
            editor.save && editor.save().then(() => {
                this.$refs.tabs.$refs.nav.$forceUpdate();
                this.$emit('refresh-tree');
            });
            this.$set(item, 'isEditing', false);
        },
        cancelSave() {
            this.app.doc.currentFile.isEditing = false;
            this.closeDoc(this.activeTab);
            this.dialogVisible = false;
        },
        saveAndClose() {
            this.saveDoc(this.app.doc.currentFile);
            this.closeDoc(this.activeTab);
            this.dialogVisible = false;
        },
        handleModify(item) {
            this.$set(item, 'isEditing', true);
            this.$refs.tabs.$refs.nav.$forceUpdate();
        },
        openFile(file) {
            if (!file) return;
            this.activeTab = file.path;
            if (!this.app.doc.openFiles.find(item => item.path === file.path)) {
                this.app.doc.openFiles.push(file);
                this.app.doc.currentFile = file;
                this.activeTab = file.path;
            }
        },
        closeDoc(target) {
            let tabs = this.app.doc.openFiles;
            let activeName = this.activeTab;
            this.app.doc.currentFile = this.app.doc.openFiles.find(item => item.path === target);
            if (this.app.doc.currentFile.isEditing) {
                this.activeTab = target;
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
                this.activeTab = activeName;
                this.app.doc.openFiles = tabs.filter(tab => tab.path !== target);
            }
        }
    }
};
</script>

<style scoped lang="scss">
.doc-manager {
    height: 100%;
    width: 100%;
    position: relative;
}
</style>

<style lang="scss">
.doc-manager {
    .el-tabs__item .el-icon-close {
        margin-left: 15px;
    }
    .el-tabs__content {
        position: initial;
        overflow: initial;
    }
}
</style>
