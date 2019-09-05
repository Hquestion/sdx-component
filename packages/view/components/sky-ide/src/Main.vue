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
                    <ResizablePanel :init-width="200">
                        文件管理
                    </ResizablePanel>
                    <ResizablePanel child-direction="vertical">
                        <ResizablePanel>
                            <SkyNotebook  :file="currentFile"/>
                        </ResizablePanel>
                        <ResizablePanel
                            :fixed="true"
                            :init-height="40"
                        >
                            资源查看
                        </ResizablePanel>
                    </ResizablePanel>
                </ResizablePanel>
                <ResizablePanel :init-height="100" :collapse="!terminalVisible">
                    终端
                </ResizablePanel>
            </ResizablePanel>
        </ResizablePanel>
    </div>
</template>

<script>
import ResizablePanel from './widgets/ResizablePanel';
import Sidebar from './layout/Sidebar';
import { SIDEBAR_TERMINAL } from './config';
import SkyNotebook from './widgets/notebook/SkyNotebook';
import { initCommands } from './config/commands';

export default {
    name: 'Main',
    components: {
        SkyNotebook,
        Sidebar,
        ResizablePanel
    },
    provide() {
        return {
            app: this
        };
    },
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
            currentFile: {
                path: '/test.ipynb',
                // path: '/first.py',
                ownerId: '292a2b73-3093-4782-8719-a11e01e08398'
            }
        };
    },
    computed: {
        terminalVisible() {
            return this.sidebar.activeWindows.includes(SIDEBAR_TERMINAL);
        }
    },
    mounted() {
        window.addEventListener('keydown', event => {
            this.commands.processKeydownEvent(event);
        }, true);
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
