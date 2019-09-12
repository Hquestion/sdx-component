<template>
    <div class="sdxv-sky-ide">
        <ResizablePanel
            class="sdxv-sky-ide__frame"
            child-direction="horizontal"
        >
            <ResizablePanel
                :fixed="true"
                :init-width="20"
                class="sdxv-skyide-sidebar"
                tabindex="1"
            >
                <Sidebar />
            </ResizablePanel>
            <ResizablePanel>
                <ResizablePanel child-direction="horizontal">
                    <ResizablePanel :init-width="400">
                        <SkyCommands v-show="false" />
                        <file-manager
                            v-show="true"
                            @open-file="openFile"
                            ref="fileManager"
                        />
                    </ResizablePanel>
                    <ResizablePanel child-direction="vertical">
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
                            资源查看
                        </ResizablePanel>
                    </ResizablePanel>
                </ResizablePanel>
                <ResizablePanel
                    :init-height="400"
                    :collapse="!terminalVisible"
                >
                    <SkyTerminal ref="terminal"/>
                </ResizablePanel>
            </ResizablePanel>
        </ResizablePanel>
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
import SkyCommands from './widgets/notebook/SkyCommands';
import SkyTerminal from './widgets/terminal/Index';
import FileManager from './widgets/file-manager/Main';
import DocManager from './widgets/doc-manager/Index';
import { initCommands } from './config/commands';
import docManagerMixin from '../src/mixins/docManagerMixin';
import fileManagerMixin from '../src/mixins/fileManagerMixin';

import setupDocCommands from './widgets/doc-manager/setupCommands';

export default {
    name: 'Main',
    components: {
        Sidebar,
        ResizablePanel,
        SkyCommands,
        SkyTerminal,
        FileManager,
        DocManager
    },
    provide() {
        return {
            app: this
        };
    },
    mixins: [docManagerMixin, fileManagerMixin],
    data() {
        return {
            commands: initCommands(),
            sidebar: {
                currentTab: '',
                activeWindows: []
            },
            layout: {
                sidebar: {
                    currentTab: '',
                    activeWindows: []
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

        },
        terminalVisible() {
            return this.sidebar.activeWindows.includes(SIDEBAR_TERMINAL);
        }
    },
    mounted() {
        window.addEventListener('keydown', event => {
            this.commands.processKeydownEvent(event);
        }, true);
        this.commands.addCommand('run:test', {
            execute: () => console.log(111)
        });

        this.commands.addKeyBinding({
            selector: '.sdxv-skyide-sidebar',
            keys: ['Enter'],
            command: 'run:test'
        });
        window.nbCommands = this.commands;
        console.log(this.commands.listCommands());

        // 初始化命令
        setupDocCommands(this.commands, this.docManager);
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
        & /deep/ {
            :focus {
                outline: none;
            }
        }
        .sdxv-sky-ide__frame {
            border: 1px solid #dedede;
        }
    }
</style>
