<template>
    <div class="sdxv-sky-ide">
        <SkyIdeTitle class="title" />
        <div class="sdxv-sky-ide__frame">
            <div
                class="sdxv-skyide-sidebar"
                style="width: 40px"
            >
                <Sidebar />
            </div>
            <Splitpanes
                class="sdxv-skyide-main"
                ref="editorMain"
                horizontal
                @resize="handleEditorMainResize"
            >
                <Pane :size="layout.editorWin.size">
                    <Splitpanes @resize="handleDocResize">
                        <Pane
                            :size="layout.file.size"
                            :min-size="layout.file.minSize"
                            :max-size="layout.file.maxSize"
                            :visible="fileManagerVisible"
                        >
                            <file-manager
                                @open-file="openFile"
                                :root-path="rootPath"
                                :current-path="file.currentPath"
                                ref="fileManager"
                            />
                        </Pane>
                        <Pane :size="layout.doc.size">
                            <doc-manager
                                ref="docManager"
                                @refresh-tree="refreshTree"
                            />
                            <div class="resource">
                                <ResourceUsage />
                            </div>
                        </Pane>
                    </Splitpanes>
                </Pane>
                <Pane
                    :visible="terminalVisible"
                    :size="layout.terminal.size"
                    :min-size="layout.terminal.minSize"
                    :max-size="layout.terminal.maxSize"
                >
                    <SkyTerminal ref="terminal" />
                </Pane>
            </Splitpanes>
        </div>
    </div>
</template>

<script>
import emitter from '@sdx/utils/src/mixins/emitter';
import Sidebar from './layout/Sidebar';
import { getTaskDetailBackEnd } from '@sdx/utils/src/api/task';
import {SIDEBAR_TERMINAL} from './config';
import SkyTerminal from './widgets/terminal/Index';
import FileManager from './widgets/file-manager/Main';
import DocManager from './widgets/doc-manager/Index';
import {initCommands} from './config/commands';
import docManagerMixin from '../src/mixins/docManagerMixin';
import fileManagerMixin from '../src/mixins/fileManagerMixin';
import ideInit from '../src/mixins/ideInit';

import setupDocCommands from './widgets/doc-manager/setupCommands';
import setupNbCommands from './widgets/notebook/setupCommands';
import setupFileCommands from './widgets/file-manager/setupCommands';

import {SIDEBAR_FILE} from './config';
import {extend} from './utils/utils';
import SkyIdeTitle from './widgets/title/SkyIdeTitle';
import ResourceUsage from './widgets/resource/ResourceUsage';
import {Splitpanes, Pane} from './layout/splitpanes/index';

export default {
    name: 'Main',
    components: {
        Sidebar,
        SkyTerminal,
        FileManager,
        DocManager,
        SkyIdeTitle,
        ResourceUsage,
        Splitpanes,
        Pane
    },
    props: {
        taskId: {
            type: String,
            default: ''
        }
    },
    provide() {
        return {
            app: this
        };
    },
    mixins: [docManagerMixin, fileManagerMixin, ideInit, emitter],
    data() {
        return {
            commands: initCommands(),
            sidebar: {
                currentTab: SIDEBAR_FILE,
                activeWindows: []
            },
            layout: {
                editorWin: {
                    size: 60
                },
                file: {
                    size: 30,
                    minSize: 10,
                    maxSize: 60
                },
                doc: {
                    size: 70
                },
                terminal: {
                    size: 40,
                    maxSize: 80,
                    minSize: 10
                }
            },
            doc: {
                currentFile: null,
                openFiles: [],
                taskOpenFileMap: []
            },
            file: {
                currentPath: '',
                taskPathMap: []
            },
            taskUuid: this.$route.params.taskId,
            rootPath: ''
        };
    },
    computed: {
        docManager() {
            return this.$refs.docManager;
        },
        fileManager() {
            return this.$refs.fileManager;
        },
        terminal() {
            return this.$refs.terminal;
        },
        terminalVisible() {
            return this.sidebar.activeWindows.includes(SIDEBAR_TERMINAL);
        },
        leftPanelVisible() {
            return this.sidebar.currentTab !== '';
        },
        fileManagerVisible() {
            return this.sidebar.currentTab === SIDEBAR_FILE;
        }
    },
    methods: {
        recoveryLocal() {
            const restorer = localStorage.getItem('SkyIDERestorer');
            if (restorer) {
                const restorerJSON = JSON.parse(restorer);
                // this.layout = extend(this.layout, restorerJSON.layout);
                Object.keys(this.layout).forEach((key) => {
                    this.layout[key].size = restorerJSON.layout && restorerJSON.layout[key] && restorerJSON.layout[key].size;
                });
                this.sidebar = extend(this.sidebar, restorerJSON.sidebar);
                this.doc = extend(this.doc, restorerJSON.doc);
                this.file = extend(this.file, restorerJSON.file);
                this.docManager.openFile(this.doc.currentFile);
            } else {
                // 没有的话使用默认配置
            }
            this.recoverFileManager();
            this.recoverDocManager();
        },
        recoverFileManager() {
            const params = {
                type: 'SKYIDE'
            };
            getTaskDetailBackEnd(this.taskUuid, params).then(res => {
                const item = this.file.taskPathMap && this.file.taskPathMap.find(item => item.task === this.taskUuid);
                // this.file.currentPath = item ? item.path : res.displayPath.split(':').pop();
                this.rootPath = res.displayPath.split(':').pop();
                let path = item && item.path ? (item.rootPath === this.rootPath ? item.path : this.rootPath) : this.rootpath;
                this.$set(this.file, 'currentPath', path);
            });
        },
        recoverDocManager() {
            const item = this.doc.taskOpenFileMap && this.doc.taskOpenFileMap.find(item => item.task === this.taskUuid);
            this.$set(this.doc, 'openFiles', item ? item.openFiles : []);
        },
        calcEditorMainWeight() {
            let layout = {
                editorWin: {
                    weight: this.layout.editorWin.size
                },
                terminal: {
                    weight: this.layout.terminal.size
                },
                file: {
                    weight: this.layout.file.size
                },
                doc: {
                    weight: this.layout.doc.size
                }
            };
            return layout;
        },
        syncLayout() {
            let layout = this.calcEditorMainWeight();
            let restorer = localStorage.getItem('SkyIDERestorer');
            if (restorer) {
                restorer = JSON.parse(restorer);
            } else {
                restorer = {};
            }
            restorer = extend(restorer, {layout});
            localStorage.setItem('SkyIDERestorer', JSON.stringify(restorer));
        },
        prepareRestoreData() {
            let stored = localStorage.getItem('SkyIDERestorer');
            if (stored) {
                stored = JSON.parse(stored);
            } else {
                stored = {};
            }
            // 处理file-manager任务和路径映射
            let item = this.file.taskPathMap && this.file.taskPathMap.find(item => item.task === this.taskUuid);
            if (item) {
                item.path = this.file.currentPath;
                item.rootPath = this.rootPath;
            } else {
                if (!this.file.taskPathMap) this.file.taskPathMap = [];
                this.file.taskPathMap.push({
                    task: this.taskUuid,
                    path: this.file.currentPath,
                    rootPath: this.rootPath
                });
            }
            item = this.doc.taskOpenFileMap && this.doc.taskOpenFileMap.find(item => item.task === this.taskId);
            if (item) {
                item.openFiles = this.doc.openFiles;
            } else {
                if (!this.doc.taskOpenFileMap) this.doc.taskOpenFileMap = [];
                this.doc.taskOpenFileMap.push({
                    task: this.taskUuid,
                    openFiles: this.doc.openFiles
                });
            }
            const restorer = {
                ...stored,
                sidebar: this.sidebar,
                doc: this.doc,
                file: this.file
            };
            localStorage.setItem('SkyIDERestorer', JSON.stringify(restorer));
        },
        handleEditorMainResize(e) {
            this.layout.editorWin.size = e[0].size;
            this.layout.terminal.size = e[1].size;
            // 刷新terminal
            this.$refs.terminal.handleResize();
        },
        handleDocResize(e) {
            this.layout.file.size = e[0].size;
            this.layout.doc.size = e[1].size;
        }
    },
    beforeCreate() {
        window.onbeforeunload = function() {
            return true;
        };
    },
    async mounted() {

        // 初始化IDE，获取项目及task信息
        await this.prepareEnv();
        // 恢复布局
        this.recoveryLocal();
        await this.sessionSpecs(this.taskManager && this.taskManager.ideUuid);
        // 监听键盘事件
        window.addEventListener('keydown', event => {
            this.commands.processKeydownEvent(event);
        }, true);

        // 初始化命令
        setupDocCommands(this.commands, this.docManager);
        setupFileCommands(this.commands, this.fileManager);
        setupNbCommands(this.commands, this);
        this.timer = setInterval(() => {
            this.syncLayout();
            this.prepareRestoreData();
        }, 1000);
    },
    beforeDestroy() {
        // 销毁前,保存配置
        this.syncLayout();
        this.prepareRestoreData();
        clearInterval(this.timer);
        window.removeEventListener('beforeunload', null);
    }
};
</script>

<style lang="scss" scoped>
    .sdxv-sky-ide {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgb(18, 23, 36);

        & /deep/ {
            :focus {
                outline: none;
            }

            .splitpanes__pane {
                position: relative;
            }

            .splitpanes--horizontal > .splitpanes__splitter {
                min-height: 4px;
            }

            .splitpanes--vertical > .splitpanes__splitter {
                min-width: 4px;
            }
        }

        .sdxv-sky-ide__frame {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: calc(100% - 52px);
            margin-top: 52px;
            display: flex;

            .sdxv-skyide-sidebar {
                background: #394C7E;
                width: 40px;
                height: 100%;
            }

            .sdxv-skyide-main {
                width: 100%;
            }
        }
    }
</style>
