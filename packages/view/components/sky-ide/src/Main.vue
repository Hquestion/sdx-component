<template>
    <div class="sdxv-sky-ide">
        <SkyIdeTitle class="title" />
        <div class="sdxv-sky-ide__frame">
            <ResizablePanel
                child-direction="horizontal"
            >
                <ResizablePanel
                    :fixed="true"
                    :init-width="40"
                    class="sdxv-skyide-sidebar"
                    tabindex="1"
                >
                    <Sidebar />
                </ResizablePanel>
                <ResizablePanel ref="editorMain">
                    <ResizablePanel
                        child-direction="horizontal"
                        :init-width="layout.editorWin.weight ? -1 : layout.editorWin.initWidth"
                        :weight="layout.editorWin.weight"
                        :min-width="layout.editorWin.minWidth"
                        ref="editorWin"
                    >
                        <ResizablePanel
                            :init-width="layout.file.weight ? -1 : layout.file.initWidth"
                            :weight="layout.file.weight"
                            :min-width="layout.file.minWidth"
                            :collapse="!leftPanelVisible"
                        >
                            <file-manager
                                v-show="fileManagerVisible"
                                @open-file="openFile"
                                ref="fileManager"
                            />
                        </ResizablePanel>
                        <ResizablePanel
                            child-direction="vertical"
                            :init-width="layout.doc.weight ? -1 : layout.doc.initWidth"
                            :weight="layout.doc.weight"
                            :min-width="layout.doc.minWidth"
                            style="margin-left: 4px"
                        >
                            <ResizablePanel>
                                <doc-manager
                                    ref="docManager"
                                    @refresh-tree="refreshTree"
                                />
                            </ResizablePanel>
                            <ResizablePanel
                                :fixed="true"
                                :init-height="40"
                            >
                                <ResourceUsage />
                            </ResizablePanel>
                        </ResizablePanel>
                    </ResizablePanel>
                    <ResizablePanel
                        :init-height="layout.terminal.weight ? -1 : layout.terminal.initHeight"
                        :weight="layout.terminal.weight"
                        :min-height="layout.terminal.minHeight"
                        :collapse="!terminalVisible"
                    >
                        <SkyTerminal ref="terminal" />
                    </ResizablePanel>
                </ResizablePanel>
            </ResizablePanel>
        </div>
        
        <script
            id="jupyter-config-data"
            type="application/json"
        >
            {
            "baseUrl": "http://localhost:8080",
            "token": "",
            "notebookPath": "Untitled.ipynb",
            "mathjaxUrl": "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js",
            "mathjaxConfig": "TeX-AMS_CHTML-full,Safe"
            }
        </script>
    </div>
</template>

<script>
import ResizablePanel from './widgets/ResizablePanel';
import Sidebar from './layout/Sidebar';
import { SIDEBAR_TERMINAL } from './config';
import SkyTerminal from './widgets/terminal/Index';
import FileManager from './widgets/file-manager/Main';
import DocManager from './widgets/doc-manager/Index';
import { initCommands } from './config/commands';
import docManagerMixin from '../src/mixins/docManagerMixin';
import fileManagerMixin from '../src/mixins/fileManagerMixin';
import ideInit from '../src/mixins/ideInit';

import setupDocCommands from './widgets/doc-manager/setupCommands';
import setupNbCommands from './widgets/notebook/setupCommands';
import setupFileCommands from './widgets/file-manager/setupCommands';

import { SIDEBAR_FILE } from './config';
import { extend } from './utils/utils';
import SkyIdeTitle from './widgets/title/SkyIdeTitle';
import ResourceUsage from './widgets/resource/ResourceUsage';
export default {
    name: 'Main',
    components: {
        Sidebar,
        ResizablePanel,
        SkyTerminal,
        FileManager,
        DocManager,
        SkyIdeTitle,
        ResourceUsage
    },
    props: {
        taskId: {
            type: String,
            default: '69f10cad-1493-432f-ae5b-7374e9eadd65'
        }
    },
    provide() {
        return {
            app: this
        };
    },
    mixins: [docManagerMixin, fileManagerMixin, ideInit],
    data() {
        return {
            commands: initCommands(),
            sidebar: {
                currentTab: SIDEBAR_FILE,
                activeWindows: []
            },
            layout: {
                editorWin: {
                    initWidth: -1,
                    weight: 1,
                    minWidth: 20
                },
                file: {
                    initWidth: 400,
                    weight: undefined,
                    minWidth: 50
                },
                doc: {
                    initWidth: -1,
                    weight: 1,
                    minWidth: 1055
                },
                terminal: {
                    initHeight: 400,
                    minHeight: 50,
                    weight: undefined
                }
            },
            doc: {
                currentFile: null,
                openFiles: []
            },
            file: {
                currentPath: ''
            }
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
                    this.layout[key].weight = restorerJSON.layout && restorerJSON.layout[key] && restorerJSON.layout[key].weight;
                });
                this.sidebar = extend(this.sidebar, restorerJSON.sidebar);
                this.doc = extend(this.doc, restorerJSON.doc);
                this.file = extend(this.file, restorerJSON.file);
                this.docManager.openFile(this.doc.currentFile);
            } else {
                // 没有的话使用默认配置
            }
        },
        calcEditorMainWeight() {
            const editorMainChildrenRatio = this.$refs.editorMain.childrenRatio;
            const editorWinChildrenRatio = this.$refs.editorWin.childrenRatio;
            let layout = {
                editorWin: {
                    weight: editorMainChildrenRatio[0].ratio
                },
                terminal: {
                    weight: editorMainChildrenRatio[1].ratio
                },
                file: {
                    weight: editorWinChildrenRatio[0].ratio
                },
                doc: {
                    weight: editorWinChildrenRatio[1].ratio
                }
            };
            return layout;
        },
        syncLayout() {
            let layout = this.calcEditorMainWeight();
            Object.keys(this.layout).forEach((key) => {
                this.layout[key].weight = layout[key].weight;
            });
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
            const restorer = {
                ...stored,
                sidebar: this.sidebar,
                doc: this.doc,
                file: this.file
            };
            localStorage.setItem('SkyIDERestorer', JSON.stringify(restorer));
        }
    },
    async mounted() {
        // 初始化IDE，获取项目及task信息
        await this.prepareEnv();
        // 恢复布局
        this.recoveryLocal();
        // 监听键盘事件
        window.addEventListener('keydown', event => {
            this.commands.processKeydownEvent(event);
        }, true);

        // 初始化命令
        setupDocCommands(this.commands, this.docManager);
        setupFileCommands(this.commands, this.fileManager);
        setupNbCommands(this.commands, this);
        this.timer = setInterval(() => {
            this.prepareRestoreData();
        }, 1000);
    },
    beforeDestroy() {
        // 销毁前,保存配置
        this.syncLayout();
        this.prepareRestoreData();
        clearInterval(this.timer);
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
        background: rgb(18,23,36);
        & /deep/ {
            :focus {
                outline: none;
            }
        }
        .sdxv-sky-ide__frame {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: calc(100% - 52px);
            margin-top: 52px;
            .sdxv-skyide-sidebar {
                background: #394C7E;
            }
        }
    }
</style>
