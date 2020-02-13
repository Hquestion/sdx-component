<template>
    <div
        class="sky-doc-manager"
        tabindex="1"
    >
        <el-tabs
            v-model="activeTab"
            type="card"
            closable
            @tab-remove="closeDoc"
            :before-leave="beforeLeave"
            ref="tabs"
        >
            <el-tab-pane
                v-for="(item) in app.doc.openFiles"
                :key="item.path"
                :name="item.path"
                lazy
            >
                <span slot="label">
                    {{ item.name }}
                    <span
                        class="editing-state"
                        v-show="fileEditingStatus[composeFileKey(item)]"
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
            <el-tab-pane
                key="add"
                name="add"
                class="add-notebook"
            >
                <span
                    slot="label"
                >
                    <i
                        class="sdx-icon sdx-icon-plus"
                    />
                </span>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            :visible.sync="dialogVisible"
            width="520px"
            :show-close="false"
            v-if="dialogVisible"
        >
            <div slot="title">
                <svg
                    class="sdxu-dialog__logo"
                    aria-hidden="true"
                >
                    <use xlink:href="#sdx-skyIDElogo" />
                </svg>
                SkyIDE
            </div>
            <div class="content">
                <svg
                    class="sdxu-dialog__warning"
                    aria-hidden="true"
                >
                    <use xlink:href="#sdx-danchuangjinggao" />
                </svg>
                <div class="content-title">
                    {{ `${t('view.file.SaveFor')}${app.doc.currentFile.name}${t('view.file.Change')}` }}
                </div>
                <div>{{ t('view.file.IfNotSave') }}</div>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    @click="cancelSave"
                    size="small"
                >
                    {{ t('view.file.NotSave') }}
                </el-button>
                <el-button
                    @click="dialogVisible = false"
                    size="small"
                >
                    {{ t('sdxCommon.Cancel') }}
                </el-button>
                <el-button
                    @click="saveAndClose"
                    size="small"
                    type="primary"
                >
                    {{ t('view.file.Save') }}
                </el-button>

            </span>
        </el-dialog>
    </div>
</template>

<script>
import SkyEditorAdaptor from '../adaptor/SkyEditorAdaptor';
import { composeFileKey } from '../../utils/utils';
import locale from '@sdx/utils/src/mixins/locale';
import undoAndRedo from '../../utils/undoAndRedo';
export default {
    data() {
        return {
            activeTab: '',
            dialogVisible: false,
            fileEditingStatus: {},
            fileEditorInstances: {}
        };
    },
    mixins: [locale],
    components: {
        SkyEditorAdaptor
    },
    inject: {
        app: {
            default: () => {}
        }
    },
    provide: {
        doc() {
            return this;
        }
    },
    watch: {
        activeTab(nVal) {
            if (!nVal) return;
            this.app.doc.currentFile = this.app.doc.openFiles.find(item => item.path === nVal);
        }
    },
    methods: {
        composeFileKey,
        beforeLeave(active) {
            if (active === 'add'){
                this.app.makeFile();
                return false;
            }
        },
        handleFileDelete(path) {
            const item = this.app.doc.openFiles.find(item => item.path === path);
            item && this.closeDoc(item.path, true);
        },
        handleRename(file, newName) {
            let item = this.app.doc.openFiles.find(tab => tab.path === file.path);
            if (!item) return;
            let [oldName, oldPath] = [item.name, item.path];
            let newPath = item.path.replace(oldName, newName);
            if (this.app.doc.currentFile.path === oldPath) {
                this.activeTab = newPath;
            }
            item.name = newName;
            item.path = newPath;
            this.$refs.tabs.$refs.nav.$forceUpdate();
        },
        saveCurrent() {
            this.saveDoc(this.app.doc.openFiles.find(item => item.path === this.activeTab));
        },
        saveAll() {
            this.app.doc.openFiles.forEach(item => {
                if (this.fileEditingStatus[composeFileKey(item)]) {
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
            this.$set(this.fileEditingStatus, this.composeFileKey(item), false);
        },
        cancelSave() {
            this.$set(this.fileEditingStatus, this.composeFileKey(this.app.doc.currentFile), false);
            this.closeDoc(this.activeTab);
            this.dialogVisible = false;
        },
        saveAndClose() {
            this.saveDoc(this.app.doc.currentFile);
            this.closeDoc(this.activeTab);
            this.dialogVisible = false;
        },
        handleModify(item) {
            if (this.fileEditingStatus[this.composeFileKey(item)]) return;
            this.$set(this.fileEditingStatus, this.composeFileKey(item), true);
            this.$refs.tabs.$refs.nav.$forceUpdate();
        },
        openFile(file) {
            if (!file) return;
            this.activeTab = file.path;
            if (!this.app.doc.openFiles.find(item => item.path === file.path)) {
                this.app.doc.openFiles.push(file);
                this.app.doc.currentFile = file;
                this.activeTab = file.path;
                this.$nextTick(() => {
                    const editor = this.$refs.editor.find(editor => editor.file.path === file.path);
                    this.fileEditorInstances[this.composeFileKey(file)] = editor && editor.$refs.renderer;
                });
            }
        },
        closeDoc(target, forceClose) {
            let tabs = this.app.doc.openFiles;
            let activeName = this.activeTab;
            let activeFile = this.app.doc.openFiles.find(item => item.path === this.activeTab);
            // 清空撤销队列
            if (activeFile && activeFile.path) {
                undoAndRedo.clearQueueByNamespace(activeFile.path);
            }
            this.app.doc.currentFile = this.app.doc.openFiles.find(item => item.path === target);
            if (this.fileEditingStatus[this.composeFileKey(this.app.doc.currentFile)] && !forceClose) {
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
                const file = this.app.doc.openFiles.find(item => item.path === target);
                delete this.fileEditorInstances[this.composeFileKey(file)];
                this.app.doc.openFiles = tabs.filter(tab => tab.path !== target);
            }
        },
        getActiveNotebook() {
            let activeFile = this.app.doc.openFiles.find(item => item.path === this.activeTab);
            const editor = this.$refs.editor.find(editor => editor.file.path === activeFile.path);
            return editor.$refs.renderer;
        }
    }
};
</script>

<style scoped lang="scss">
.sky-doc-manager {
    height: calc(100% - 40px);
    width: 100%;
    position: relative;
    & /deep/ {
        .el-tabs__item .el-icon-close {
            margin-left: 15px;
        }
        .el-tabs__content {
            position: initial;
            overflow: initial;
        }
        .el-tabs__header {
            border-bottom: none;
            background: #1C253D;
            margin: 0;
        }
        .el-tabs__nav {
            display: flex;
            border: none !important;
            .el-tabs__item {
                height: 40px;
                font-size: 14px;
                display: flex;
                align-items: center;
                border: none;
                color:  #A0A5B8;;
                &.is-active {
                    color: #DDE5FE;
                    background: #394C7E;
                }
                &.is-closable {
                    padding-left: 13px;
                    padding-right: 13px;
                }
                .el-icon-close {
                    font-size: 14px;
                    width: 14px;
                    margin-left: 30px;
                    &:hover {
                        background: none;
                    }
                }
            }
            .el-tabs__item::after {
                content: "";
                display: block;
                width: 1px;
                height: 40px;
                position: absolute;
                top: 0px;
                background: #394C7E;
                right: 0;
            }
            .el-tabs__item:last-child::after {
                display: none;
                width: 0;
            }
        }
        #tab-add {
            &.is-closable {
                padding: 0 20px;
                &:hover {
                    color: #fff;
                }
            }
            .el-icon-close {
                display: none;
            }
        }
        .el-dialog {
            background: #2A3246;
            box-shadow: 0 6px 12px 3px rgba(0,0,0,0.50);
            border-radius: 4px;
            .el-dialog__header {
                height: 40px;
                line-height: 40px;
                background: #46516C;
                font-size: 14px;
                color: #8796BD;
                padding: 0;
                padding-left: 52px;
                border-radius: 4px 4px 0 0;
            }
            .el-button--primary {
                background: #4880F8;
                color: #FFFFFF;
            }
            .el-button--primary:hover {
                background: #2554BA;
            }
            .el-button--default {
                background: #2A3246;
                border: 1px solid #C0D2FF;
                color: #C0D2FF;
            }
            .el-button--default:hover {
                color: #2A3246;
                background: #C0D2FF;
            }
            .sdxu-dialog__logo {
                width: 26px;
                height: 26px;
                top: 8px;
                left: 16px;
                position: absolute;
            }
            .content {
                position: relative;
                padding-left: 40px;
                .sdxu-dialog__warning {
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    top: 6px;
                    left:0;
                }
                div{
                    height: 26px;
                    line-height: 26px;
                    color: #C0D2FF;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                }
                .content-title {
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                }
            }

        }
    }


}
</style>
